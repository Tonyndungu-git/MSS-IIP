"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import HeroBackground from "./HeroBackground";

export default function Hero() {

    return (

        <section
            className="
            relative
            overflow-hidden
            min-h-screen
            flex
            items-center
            "
        >

            <HeroBackground/>

            <div
                className="
                relative
                z-10
                max-w-7xl
                mx-auto
                px-8
                grid
                lg:grid-cols-2
                gap-16
                items-center
                "
            >

                <motion.div

                    initial={{
                        opacity:0,
                        y:40
                    }}

                    animate={{
                        opacity:1,
                        y:0
                    }}

                    transition={{
                        duration:0.8
                    }}

                >

                    <p
                        className="
                        uppercase
                        tracking-[0.3em]
                        text-cyan-400
                        mb-5
                        "
                    >

                        Intelligent Infrastructure Platform

                    </p>

                    <h1
                        className="
                        text-7xl
                        font-black
                        leading-tight
                        "
                    >

                        One Platform.

                        <br/>

                        Every Infrastructure.

                    </h1>

                    <p
                        className="
                        mt-8
                        text-xl
                        text-slate-300
                        max-w-2xl
                        leading-9
                        "
                    >

                        Monitor, automate and optimize EV charging,
                        energy systems, industrial assets and future
                        intelligent infrastructure using one unified platform.

                    </p>

                    <div className="flex gap-5 mt-12">

                        <Link

                            href="/register"

                            className="
                            bg-cyan-500
                            text-black
                            px-8
                            py-4
                            rounded-xl
                            font-bold
                            "

                        >

                            Start Free

                        </Link>

                        <Link

                            href="/dashboard"

                            className="
                            border
                            border-slate-700
                            px-8
                            py-4
                            rounded-xl
                            "

                        >

                            View Live Demo

                        </Link>

                    </div>

                </motion.div>

                <motion.img

                    initial={{
                        opacity:0,
                        x:100
                    }}

                    animate={{
                        opacity:1,
                        x:0
                    }}

                    transition={{
                        duration:1
                    }}

                    src="/hero/platform-dashboard.png"

                    alt="Platform"

                    className="
                    rounded-3xl
                    shadow-2xl
                    border
                    border-slate-700
                    "

                />

            </div>

        </section>

    );

}