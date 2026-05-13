import { readFileSync } from 'node:fs';

const sharedConfig = JSON.parse(
  readFileSync(new URL('../../conf/setting.json', import.meta.url), 'utf-8'),
);

/**
 * @type {import('@mi-gpt/next').MiGPTConfig}
 */
export default {
  debug: true,
  speaker: {
    did: sharedConfig.mi_did,
    heartbeat: 1000,
    userId: sharedConfig.account,
    password: sharedConfig.password,
    passToken: sharedConfig.passToken || '',
  },
  openai: {
    baseURL: sharedConfig.openai_baseURL,
    apiKey: sharedConfig.openai_apiKey,
    model: sharedConfig.openai_model,
  },
  prompt: {
    system:
      sharedConfig.migpt_system_prompt ||
      '你是一个智能助手。请直接回答用户问题，使用纯文本，不要 Markdown，不要分点，控制在 120 字以内。',
  },
  context: {
    historyMaxLength: sharedConfig.migpt_historyMaxLength ?? 10,
  },
  callAIKeywords: sharedConfig.migpt_callAIKeywords || ['请'],
  aiOpening: sharedConfig.migpt_aiOpening || '小爱思考中',
  async onMessage(engine, msg) {
    const text = msg.text.trimStart();
    const normalizedText = text.replace(/[，。！？、,.!?\s]+$/g, '');

    const localPlayKeywords = ['播放本地歌曲', '本地播放歌曲'];
    if (localPlayKeywords.some((k) => normalizedText.startsWith(k))) {
      if (engine.config.debug) {
        console.log(
          `🐛 命令触发(playlocal)：msgId=${msg.id} text=${msg.text} normalized=${normalizedText}`,
        );
      }
      await engine.speaker.abortXiaoAI();
      return;
    }

    if (engine.config.callAIKeywords.some((e) => e && normalizedText.startsWith(e))) {
      if (engine.config.debug) {
        console.log(`🐛 自定义 AI 触发：msgId=${msg.id} text=${msg.text}`);
      }

      await engine.speaker.abortXiaoAI();
      const opening = (engine.config.aiOpening ?? '').trim() || '小爱思考中';
      await engine.MiOT.doAction(5, 1, opening);
      await engine.MiOT.doAction(5, 1, opening);
      const reply = await engine.askAI(msg);
      const answer = (reply.text || (await reply.stream?.result()) || '').trim().slice(0, 120);

      if (engine.config.debug) {
        console.log(`🐛 自定义 AI 返回：msgId=${msg.id} answerLength=${answer.length}`);
      }

      if (answer) {
        await engine.MiOT.doAction(5, 1, answer);
        return { handled: true };
      }

      await engine.MiOT.doAction(5, 1, '我刚刚没组织好语言，请再问我一次。');
      return { handled: true };
    }
  },
};
