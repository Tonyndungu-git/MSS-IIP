"use client";

import useApiWarmup from "@/hooks/useApiWarmup";


export default function ApiWarmupProvider(){

    useApiWarmup();

    return null;

}