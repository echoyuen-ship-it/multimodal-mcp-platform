
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: Request){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return Response.json({ ok:false }, { status:401 });
  const { id, install } = await req.json();
  if(!id) return Response.json({ ok:false }, { status:400 });
  if(install){
    await supabase.from("mcp_installs").upsert({ user_id:user.id, server_id:id });
  }else{
    await supabase.from("mcp_installs").delete().eq("user_id", user.id).eq("server_id", id);
  }
  return Response.json({ ok:true });
}
