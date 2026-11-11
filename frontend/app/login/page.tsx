'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import {
  supabase,
  isSupabaseConfigured,
  setStoredUser,
  MSSUser
} from '@/lib/supabase';

import { api } from '@/lib/api';

import {
  Zap,
  Lock,
  Mail,
  ShieldAlert,
  ArrowRight,
  Terminal
} from 'lucide-react';



export default function LoginPage() {

  const router = useRouter();


  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string|null>(null);



  const handleLogin = async(
    e:React.FormEvent
  )=>{

    e.preventDefault();

    setLoading(true);
    setError(null);


    try {


      if(
        !isSupabaseConfigured ||
        !supabase
      ){

        throw new Error(
          "Supabase authentication is not configured."
        );

      }



      /*
        1. Authenticate with Supabase
      */

      const {
        data,
        error:supaError

      } =
      await supabase.auth.signInWithPassword({

        email,
        password

      });



      if(supaError){

        throw supaError;

      }



      if(!data.user || !data.session){

        throw new Error(
          "Authentication session failed"
        );

      }




      /*
        2. Get MSS organization + role
      */


      let context;

      try {

        context =
          await api.getUserContext(
            data.user.id
          );

      }
      catch(err){

        throw new Error(
          "User is authenticated but has no MSS organization assigned."
        );

      }





      /*
        3. Store MSS user
      */


      const mssUser:MSSUser = {


        id:
          data.user.id,


        email:
          data.user.email || email,


        name:
          data.user.user_metadata?.full_name ||
          email.split("@")[0],



        role:
          context.role,



        organization:
          context.organization_name,


        organization_id:
          context.organization_id

      };



      setStoredUser(
        mssUser
      );



      router.replace(
        "/dashboard"
      );


    }
    catch(err:any){

      console.error(
        err
      );


      setError(
        err.message ||
        "Login failed"
      );

    }
    finally{

      setLoading(false);

    }


  };



return (

<div className="min-h-screen bg-[#020617] industrial-grid flex items-center justify-center p-4">


<div className="w-full max-w-md bg-[#070e1e]/95 border border-slate-800 rounded-xl shadow-2xl p-8 backdrop-blur-xl">



<div className="text-center mb-8">


<div className="inline-flex w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 items-center justify-center mb-3">

<Zap className="w-6 h-6 text-slate-950"/>

</div>



<h1 className="text-xl font-bold font-mono text-white">

M SYNAPSES SYSTEMS

</h1>


<p className="text-xs font-mono text-cyan-400 mt-1 uppercase">

Intelligent Infrastructure Platform

</p>


<div className="flex justify-center gap-2 mt-2 text-[11px] text-slate-500">

<Terminal className="w-3 h-3 text-emerald-400"/>

FastAPI Cluster: mss-api.onrender.com

</div>


</div>




{
error &&
<div className="mb-4 p-3 rounded bg-rose-950/50 border border-rose-800 text-xs text-rose-300 flex gap-2">

<ShieldAlert className="w-4 h-4"/>

{error}

</div>
}





<form
onSubmit={handleLogin}
className="space-y-4 font-mono text-xs"
>


<div>

<label className="text-slate-400 block mb-1 uppercase">

Engineer Email / Work ID

</label>


<div className="relative">

<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>


<input

type="email"

required

value={email}

onChange={
e=>setEmail(e.target.value)
}

className="w-full pl-9 py-2.5 bg-slate-900 text-white rounded border border-slate-800"

/>


</div>

</div>




<div>


<label className="text-slate-400 block mb-1 uppercase">

Access Key / Password

</label>


<div className="relative">

<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>


<input

type="password"

required

value={password}

onChange={
e=>setPassword(e.target.value)
}

className="w-full pl-9 py-2.5 bg-slate-900 text-white rounded border border-slate-800"

/>


</div>


</div>




<button

type="submit"

disabled={loading}

className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded flex justify-center items-center gap-2"

>


{
loading
?
"AUTHENTICATING MSS TENANT..."
:
"SIGN IN TO INFRASTRUCTURE"
}


<ArrowRight className="w-4 h-4"/>


</button>


</form>




<div className="mt-6 text-center text-xs text-slate-500">

Don't have an industrial ID?

<Link
href="/register"
className="text-cyan-400 ml-1"
>

Register Tenant

</Link>


</div>



</div>


</div>


);


}