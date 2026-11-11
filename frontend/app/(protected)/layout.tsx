"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    let mounted = true;


    async function checkAuth() {

      if (!supabase) {
        router.replace("/login");
        return;
      }


      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();



      if (!session) {

        router.replace("/login");

        return;

      }


      if (mounted) {
        setLoading(false);
      }

    }



    checkAuth();



    const {
      data: {
        subscription
      }
    } = supabase!.auth.onAuthStateChange(
      (_event, session) => {


        if (!session) {

          router.replace("/login");

        }


      }
    );



    return () => {

      mounted = false;

      subscription.unsubscribe();

    };


  }, [router]);




  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

        <div className="font-mono text-cyan-400">
          AUTHENTICATING MSS SESSION...
        </div>

      </div>

    );

  }



  return children;

}