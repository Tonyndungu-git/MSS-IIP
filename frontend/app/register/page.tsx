'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { api } from '@/lib/api';
import {
  Zap,
  Building2,
  Globe,
  Mail,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function RegisterPage() {

  const router = useRouter();

  const [orgName, setOrgName] = useState('');
  const [industry, setIndustry] = useState(
    'EV Infrastructure & Mobility'
  );
  const [country, setCountry] = useState('Kenya');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string|null>(null);


  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);
    setError(null);


    try {

      if(!supabase){

        throw new Error(
          "Supabase is not configured"
        );

      }


      /*
        1. Create Supabase Auth user
      */

      const {
        data,
        error:authError

      } = await supabase.auth.signUp({

        email,

        password,

        options:{

          data:{

            full_name:
              email.split("@")[0]

          }

        }

      });



      if(authError){

        throw authError;

      }



      if(!data.user){

        throw new Error(
          "User creation failed"
        );

      }



      /*
        2. Create MSS Tenant
      */

      const tenant = await api.registerTenant({

          user_id:data.user.id,

          email,

          full_name:
              email.split("@")[0],

          organization_name:
              orgName,

          industry,

          country

      });


    console.log(
        "Tenant created:",
        tenant
    );



      /*
        3. Redirect login
      */

      router.push(
        "/login"
      );



    }catch(err:any){

      setError(
        err.message ||
        "Registration failed"
      );


    }finally{

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-[#020617] industrial-grid flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-[#070e1e]/95 border border-slate-800 rounded-xl shadow-2xl p-8 backdrop-blur-xl">


        <div className="text-center mb-6">

          <div className="inline-flex w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 items-center justify-center shadow-lg shadow-cyan-950/60 border border-cyan-400/40 mb-3">

            <Zap className="w-6 h-6 text-slate-950"/>

          </div>


          <h1 className="text-xl font-bold font-mono text-white">

            Register Infrastructure Tenant

          </h1>


          <p className="text-xs font-mono text-cyan-400 mt-1 uppercase">

            Multi-Tenant Industrial Onboarding

          </p>


        </div>



        {
          error && (

          <div className="mb-4 p-3 rounded bg-rose-950/50 border border-rose-800 text-xs text-rose-300">

            {error}

          </div>

          )
        }




<form
onSubmit={handleRegister}
className="space-y-4 font-mono text-xs"
>



<div>

<label className="text-slate-400 block mb-1 uppercase">

Organization / Company Name

</label>


<div className="relative">

<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>


<input

required

value={orgName}

onChange={
e=>setOrgName(e.target.value)
}

placeholder="Voltaic Grid Systems Ltd"

className="w-full pl-9 pr-3 py-2.5 bg-slate-900 text-white rounded border border-slate-800"

/>


</div>

</div>





<div className="grid grid-cols-2 gap-3">


<div>

<label className="text-slate-400 block mb-1 uppercase">

Industry

</label>


<select

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

className="w-full px-3 py-2.5 bg-slate-900 text-white rounded border border-slate-800"

>

<option>
EV Infrastructure & Mobility
</option>

<option>
Renewable Solar & Storage
</option>

<option>
Smart Grid & Utilities
</option>

<option>
Heavy Manufacturing
</option>

<option>
Mining & Metallurgy
</option>


</select>


</div>



<div>

<label className="text-slate-400 block mb-1 uppercase">

Country

</label>


<div className="relative">

<Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>


<input

required

value={country}

onChange={
e=>setCountry(e.target.value)
}

className="w-full pl-9 pr-3 py-2.5 bg-slate-900 text-white rounded border border-slate-800"

/>


</div>

</div>


</div>





<div>

<label className="text-slate-400 block mb-1 uppercase">

Admin Work Email

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

className="w-full pl-9 pr-3 py-2.5 bg-slate-900 text-white rounded border border-slate-800"

/>


</div>

</div>





<div>

<label className="text-slate-400 block mb-1 uppercase">

Password

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

className="w-full pl-9 pr-3 py-2.5 bg-slate-900 text-white rounded border border-slate-800"

/>


</div>


</div>





<button

disabled={loading}

className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded flex items-center justify-center gap-2"

>


{
loading
?
"Creating Tenant..."
:
"Initialize Tenant"
}


<ArrowRight className="w-4 h-4"/>


</button>



</form>




<div className="mt-6 text-center text-xs text-slate-500">

Already registered?


<Link
href="/login"
className="text-cyan-400 ml-1"
>

Sign In

</Link>


</div>


</div>

</div>


  );

}