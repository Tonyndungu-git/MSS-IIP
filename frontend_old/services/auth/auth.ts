import { supabase } from "@/lib/auth/supabase";



export async function registerUser(

email:string,

password:string,

metadata:{
    full_name:string;
    organization:string;
}

){


const {data,error}=

await supabase.auth.signUp({

    email,

    password,

    options:{

        data:metadata

    }

});


if(error){

    throw error;

}


return data;

}




export async function loginUser(

email:string,

password:string

){


const {data,error}=

await supabase.auth.signInWithPassword({

    email,

    password

});


if(error){

    throw error;

}


return data;

}





export async function logoutUser(){


const {error}=

await supabase.auth.signOut();


if(error){

    throw error;

}

}