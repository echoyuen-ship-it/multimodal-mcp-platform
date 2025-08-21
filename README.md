# Multimodal MCP Platform

这是一个开源的多模态大模型接口平台，类似 openrouter.ai，带有：
- 用户注册 / 登录（基于 Supabase）
- 控制台（API Key 管理、用量统计）
- Playground（文本、图片、视频生成）
- MCP 市场（插件目录）

## 🚀 一键部署到 Vercel

点击下方按钮，一键部署本项目到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fmultimodal-mcp-platform&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,OPENAI_API_KEY,STABILITY_API_KEY,RUNWAY_API_KEY,LUMA_API_KEY&envDescription=填入Supabase和模型API的KEY&envLink=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fmultimodal-mcp-platform%2Fblob%2Fmain%2F.env.example)

请将上面链接中的 `YOUR_USERNAME` 替换为你的 GitHub 用户名。

## 开发运行

```bash
npm install
npm run dev
```

本地运行会读取 `.env.local` 中的配置。
