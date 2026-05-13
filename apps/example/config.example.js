/**
 * @type {import('@mi-gpt/next').MiGPTConfig}
 */
export default {
  debug: true,
  speaker: {
    did: 'YOUR_DEVICE_DID',
    heartbeat: 1000,
    userId: 'YOUR_XIAOMI_ID',
    password: 'YOUR_XIAOMI_PASSWORD',
    passToken: '',
  },
  openai: {
    baseURL: 'https://api.openai.com/v1',
    apiKey: 'YOUR_API_KEY',
    model: 'gpt-4o-mini',
  },
  prompt: {
    system:
      '你是一个智能助手。请直接回答用户问题，使用纯文本，不要 Markdown，不要分点，控制在 120 字以内。',
  },
  context: {
    historyMaxLength: 10,
  },
  callAIKeywords: ['请'],
  aiOpening: '小爱思考中',
};
