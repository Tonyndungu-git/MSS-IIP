"use client";


import Link from "next/link";

import {useState} from "react";

import {useRouter} from "next/navigation";

import {registerUser} from "@/services/auth/auth";



export default function RegisterForm(){


const router = useRouter();


const [name,setName]=useState("");

const [organization,setOrganization]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);





async function handleSubmit(e:React.FormEvent){

e.preventDefault();


setError("");

setLoading(true);



try{


await registerUser(

email,

password,

{

full_name:name,

organization

}

);



router.push("/dashboard");



}

catch(err:any){

setError(
err.message
||
"Registration failed"
);

}


finally{

setLoading(false);

}


}






return(

<form

onSubmit={handleSubmit}

className="
mt-8
space-y-5
"

>



<input

placeholder="Full Name"

value={name}

onChange={
e=>setName(e.target.value)
}

className="
w-full
bg-slate-950
border
border-slate-700
rounded-xl
px-4
py-3
"

/>





<input

placeholder="Organization"

value={organization}

onChange={
e=>setOrganization(e.target.value)
}

className="
w-full
bg-slate-950
border
border-slate-700
rounded-xl
px-4
py-3
"

/>





<input

type="email"

placeholder="Business Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

className="
w-full
bg-slate-950
border
border-slate-700
rounded-xl
px-4
py-3
"

/>





<input

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

className="
w-full
bg-slate-950
border
border-slate-700
rounded-xl
px-4
py-3
"

/>




{
error &&

<p
className="
text-red-400
text-sm
"
>

{error}

</p>

}




<button

disabled={loading}

className="
w-full
bg-cyan-500
text-black
rounded-xl
py-3
font-semibold
"

>

{

loading

?

"Creating..."

:

"Create Account"

}


</button>




<p

className="
text-center
text-slate-400
"

>

Already registered?{" "}



<Link

href="/login"

className="text-cyan-400"

>

Login

</Link>


</p>



</form>

);


}