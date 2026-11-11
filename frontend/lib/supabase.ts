import { createClient, SupabaseClient } from '@supabase/supabase-js';


const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "";


const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";



export const isSupabaseConfigured =
  Boolean(
    supabaseUrl.trim() &&
    supabaseKey.trim()
  );



export const supabase: SupabaseClient | null =
  isSupabaseConfigured
    ? createClient(
        supabaseUrl,
        supabaseKey
      )
    : null;



export interface MSSUser {

  id: string;

  email: string;

  name: string;

  role: string;

  organization: string;

  organization_id: string;

}



const LOCAL_STORAGE_USER_KEY =
  "mss_auth_user";



export function getStoredUser():
MSSUser | null {


  if (
    typeof window === "undefined"
  ) {
    return null;
  }


  try {

    const raw =
      localStorage.getItem(
        LOCAL_STORAGE_USER_KEY
      );


    if(!raw)
      return null;


    return JSON.parse(raw);


  } catch {

    return null;

  }

}





export function setStoredUser(
  user:MSSUser | null
){


  if(
    typeof window === "undefined"
  )
    return;



  if(!user){

    localStorage.removeItem(
      LOCAL_STORAGE_USER_KEY
    );

  }
  else {

    localStorage.setItem(
      LOCAL_STORAGE_USER_KEY,
      JSON.stringify(user)
    );

  }

}