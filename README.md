# migpt-next-A 部署教程

这个仓库用于本地运行 **MiGPT + xiaomusic**，并支持一键启动。

## 1. 环境要求

- Node.js 18+
- pnpm
- Python 3.10+
- 已安装 xiaomusic CLI（命令 `xiaomusic` 可用）

## 2. 初始化配置

### 2.1 复制并填写本地私有配置

- 复制 `apps/example/config.example.js` 为 `apps/example/config.local.js`
- 填写以下字段：
  - `speaker.did`
  - `speaker.userId`
  - `speaker.password`（或 `passToken`）
  - `openai.baseURL`
  - `openai.apiKey`
  - `openai.model`

### 2.2 复制并填写 xiaomusic 配置

- 复制 `xiaomusic.example.json` 为 `xiaomusic.json`
- 复制 `conf/setting.example.json` 为 `conf/setting.json`
- 至少确认以下字段：
  - `account`
  - `password`
  - `mi_did`
  - `hostname`
  - `port`
  - `music_path`

> 注意：`config.local.js`、`xiaomusic.json`、`conf/setting.json` 都是私密文件，已加入 `.gitignore`，不要提交。

## 3. 一键安装并启动

### Windows

```bat
start-all.bat
```

### Linux / macOS / Git Bash

```bash
bash start-all.sh
```

脚本会按顺序执行：
1. 安装 Node 依赖（`pnpm install`）
2. 后台启动 xiaomusic（读取 `conf/setting.json`）
3. 前台启动 MiGPT（`pnpm --filter @mi-gpt/example start`）

## 4. 使用方式

- 触发本地播放命令：
  - `本地播放歌曲`
  - `播放本地歌曲`
- 触发 AI 回答（默认前缀）：
  - `请讲个笑话`
  - `请解释一下量子纠缠`

## 5. 常见问题

### 5.1 说“本地播放歌曲”有反馈但不播放

优先检查：
- `music_path` 目录是否有可播放音频
- `conf/setting.json` 的 `ffmpeg_location` 是否正确
- `xiaomusic.log.txt` 是否报错

### 5.2 AI 不触发

默认只响应 `callAIKeywords`，当前示例是 `['请']`，请用“请xxx”开头。

### 5.3 小爱原生应答先说话

当前实现已做命令优先和连续打断；若仍偶发，可提高 xiaomusic 的强制打断策略并检查轮询延迟配置。

## 6. 上传 GitHub 前自检

```bash
git status
git grep -nE "password|passToken|apiKey|serviceToken|sk-"
```

确认没有真实密钥再提交。

## 7. 致谢 / 来源

- https://github.com/hanxi/xiaomusic
- https://github.com/idootop/migpt-next
