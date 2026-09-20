"use client";


import {useAuth} from "@/components/auth/AuthProvider";


export default function useUser(){

    return useAuth();

}