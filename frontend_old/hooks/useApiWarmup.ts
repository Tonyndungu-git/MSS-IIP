"use client";

import {useEffect} from "react";


export default function useApiWarmup(){


useEffect(()=>{


const wake = async()=>{

try{

await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/health/`,
{
cache:"no-store"
}
);


console.log("MSS API ready");


}
catch(e){

console.log("Waiting for MSS API");

}


};


wake();


},[]);


}