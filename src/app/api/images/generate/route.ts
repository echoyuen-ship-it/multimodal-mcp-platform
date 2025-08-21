
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
  const body = await req.json();
  const { model, prompt, size } = body || {};
  const openai = process.env.OPENAI_API_KEY;
  const stb = process.env.STABILITY_API_KEY;

  if(model?.startsWith("dall-e")){
    if(!openai) return Response.json({ error: "Set OPENAI_API_KEY" }, { status: 400 });
    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method:"POST",
      headers:{ "Authorization":"Bearer "+openai, "Content-Type":"application/json" },
      body: JSON.stringify({ model: "dall-e-3", prompt, size: size||"1024x1024", response_format:"b64_json" })
    });
    const j = await r.json();
    const b64 = j?.data?.[0]?.b64_json;
    return Response.json({ image_base64: b64 });
  }

  // stability (sdxl)
  if(stb){
    const r = await fetch("https://api.stability.ai/v2beta/stable-image/generate/sd3", {
      method:"POST",
      headers:{ "Authorization":"Bearer "+stb, "Accept":"application/json", "Content-Type":"application/json" },
      body: JSON.stringify({ prompt, output_format:"png", aspect_ratio:"1:1" })
    });
    const j = await r.json();
    const b64 = j?.image || j?.images?.[0];
    if(b64) return Response.json({ image_base64: b64 });
  }

  // stub fallback
  return Response.json({ image_base64: null, note: "[stub] Provide provider keys to enable real image generation." });
}
