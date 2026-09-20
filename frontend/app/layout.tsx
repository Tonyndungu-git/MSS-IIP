import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/components/auth/AuthProvider";
import ApiWarmupProvider from "@/components/providers/ApiWarmupProvider";


const geistSans = Geist({

    variable:"--font-geist-sans",

    subsets:["latin"],

});


const geistMono = Geist_Mono({

    variable:"--font-geist-mono",

    subsets:["latin"],

});



export const metadata: Metadata = {

    title:"M Synapses Systems | Intelligent Infrastructure Platform",

    description:
    "MSS-IIP connects physical infrastructure, real-time data and artificial intelligence into one intelligent operating platform.",

};



export default function RootLayout({

children

}: Readonly<{

children:React.ReactNode;

}>) {


return (

<html

lang="en"

className={`${geistSans.variable} ${geistMono.variable} antialiased`}

>


<body className="min-h-full flex flex-col">

<ApiWarmupProvider />

<AuthProvider>

{children}

</AuthProvider>

</body>


</html>

);

}