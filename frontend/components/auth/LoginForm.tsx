"use client";

import Link from "next/link";
import { useState } from "react";

import { loginUser } from "@/services/auth/auth";


export default function LoginForm(){


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);



    async function handleSubmit(
        e:React.FormEvent
    ){

        e.preventDefault();


        setError("");

        setLoading(true);



        try{


            const data = await loginUser(
                email,
                password
            );



            if(!data.session){

                throw new Error(
                    "Login successful but session was not created"
                );

            }



            window.location.href="/dashboard";


        }


        catch(err:any){


            setError(
                err.message ||
                "Login failed"
            );


        }


        finally{


            setLoading(false);


        }


    }



    return (

        <form

            onSubmit={handleSubmit}

            className="
            mt-8
            space-y-5
            "

        >


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

                required

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


                required


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
                hover:bg-cyan-400
                text-black
                rounded-xl
                py-3
                font-semibold
                disabled:opacity-50
                "


            >


                {

                    loading

                    ?

                    "Signing in..."

                    :

                    "Sign In"

                }


            </button>





            <p

                className="
                text-center
                text-slate-400
                "

            >

                Don't have an account?{" "}



                <Link

                    href="/register"

                    className="text-cyan-400"

                >

                    Register

                </Link>


            </p>



        </form>

    );


}