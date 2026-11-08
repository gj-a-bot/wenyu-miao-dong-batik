# Studio AI 配置（Ollama / OpenAI）

数字共创实验室 2.0 右侧 **「AI 纹样设计师」** 通过 `/api/studio/design` 在服务端生成三套方案（密钥不进浏览器）。

- 配置了 `OPENAI_API_KEY` 时优先使用 OpenAI（可选 `OPENAI_MODEL`，默认 `gpt-4o-mini`）。
- 否则尝试本机/远程 **Ollama**。
- 两者均不可用时进入 **演示模式**（界面会明确标注，基于纹样档案匹配，非伪装 AI）。

## OpenAI（推荐线上）

在 `.env.local` 或 Vercel 环境变量中：

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

可用 `/api/studio/llm-status` 检查当前模式。

---

# 链接本机 Ollama

旧版 **「Ollama 纹样建议」**（`/api/ollama/chat`）仍可用；新版设计方案以 `/api/studio/design` 为主。

## 1. 启动 Ollama 并拉取模型

```bash
ollama serve
ollama pull qwen2.5:7b
```

也可换成你已安装的模型名。

## 2. 配置环境变量

在项目根目录创建 `.env.local`：

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5:7b
```

若 Ollama 在局域网另一台机器，把 URL 改成该机 IP，例如 `http://192.168.1.10:11434`。

## 3. 本地开发

```bash
npm run dev
```

打开 `/studio`，点击 **Ollama 纹样建议**。首次可访问 `/api/ollama/health` 检查连通性。

## 4. Vercel 线上说明

生产环境 **无法** 默认访问你电脑上的 `127.0.0.1`。若要线上使用，需：

- 将 `OLLAMA_BASE_URL` 设为公网可访问的 Ollama 地址（注意安全风险），或  
- 仅在本机 `npm run dev` / 自建服务器上使用 AI 功能。
