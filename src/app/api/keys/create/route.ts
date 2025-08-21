
import { supabaseServer } from "@/lib/supabase";
import { randomBytes } from "crypto";

export async function POST(){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return Response.json({ ok:false }, { status:401 });
  const secret = "sk_live_" + randomBytes(24).toString("hex");
  const prefix = secret.slice(0, 12);
  const { error } = await supabase.from("api_keys").insert({ user_id: user.id, label: "default", secret_hash: secret, secret_prefix: prefix });
  if(error) return Response.json({ ok:false, error: error.message }, { status: 500 });
  return Response.json({ ok:true });
}
