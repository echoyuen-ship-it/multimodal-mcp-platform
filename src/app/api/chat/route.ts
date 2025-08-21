
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
  const body = await req.json();
  const { model, messages } = body || {};
  const openaiKey = process.env.OPENAI_API_KEY;
  if(!openaiKey){
    return Response.json({ output: "[stub] Provide OPENAI_API_KEY to enable real chat. Your prompt: " + (messages?.[0]?.content ?? "") });
  }
  // Simple passthrough to OpenAI responses (compatible payload)
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{ "Authorization":"Bearer "+openaiKey, "Content-Type":"application/json" },
    body: JSON.stringify({ model: model||"gpt-4o-mini", messages })
  });
  const data = await r.json();
  const text = data?.choices?.[0]?.message?.content ?? JSON.stringify(data);
  return Response.json({ output: text });
}
