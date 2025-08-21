
export default function DocsPage(){
  return (
    <div className="container-prose space-y-6">
      <h1 className="text-3xl font-bold">Documentation</h1>
      <p>Welcome! This is a minimal docs placeholder. Replace with your real MDX or a docs engine later.</p>
      <h2 className="text-xl font-semibold">API Overview</h2>
      <pre className="bg-black/50 p-4 rounded-xl overflow-auto text-sm">{`POST /v1/chat/completions
POST /v1/images/generate
POST /v1/videos/generate`}</pre>
      <h2 className="text-xl font-semibold">Authentication</h2>
      <p>Use a bearer API key created in the Console. Example:</p>
      <pre className="bg-black/50 p-4 rounded-xl overflow-auto text-sm">{`curl https://your-host/v1/chat/completions \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{ "model":"gpt-4o-mini", "messages":[{"role":"user","content":"Hello"}] }'`}</pre>
    </div>
  )
}
