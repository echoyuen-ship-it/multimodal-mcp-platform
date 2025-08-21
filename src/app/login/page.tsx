
'use client';
import { supabase } from "@/lib/supabaseBrowser";
import { useState } from "react";

export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string|undefined>();

  const sendMagic = async (e:any)=>{
    e.preventDefault();
    setErr(undefined);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: (typeof window!=='undefined'? window.location.origin: '') + '/dashboard' } });
    if(error) setErr(error.message);
    else setSent(true);
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-sm text-gray-400 mb-4">Enter your email to receive a magic link.</p>
      <form onSubmit={sendMagic} className="space-y-3">
        <input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
        <button className="btn btn-primary w-full">Send Magic Link</button>
      </form>
      {sent && <p className="text-green-400 mt-3 text-sm">Check your inbox for the link.</p>}
      {err && <p className="text-red-400 mt-3 text-sm">{err}</p>}
    </div>
  );
}
