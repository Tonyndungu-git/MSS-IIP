"use client";

import Link from "next/link";

export default function Navbar() {

    return (

        <nav
            className="
            fixed
            top-0
            left-0
            right-0
            z-50
            backdrop-blur-xl
            border-b
            border-slate-800/50
            bg-slate-950/70
            "
        >

            <div
                className="
                max-w-7xl
                mx-auto
                flex
                justify-between
                items-center
                px-8
                py-5
                "
            >

                <Link
                    href="/"
                    className="text-2xl font-bold"
                >
                    M Synapses Systems
                </Link>

                <div className="flex gap-8">

                    <Link href="/industries">Industries</Link>

                    <Link href="/pricing">Pricing</Link>

                    <Link href="/about">About</Link>

                    <Link href="/contact">Contact</Link>

                </div>

                <div className="flex gap-4">

                    <Link
                        href="/login"
                        className="
                        px-5
                        py-2
                        rounded-lg
                        border
                        border-slate-700
                        "
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="
                        bg-cyan-500
                        text-black
                        px-5
                        py-2
                        rounded-lg
                        font-semibold
                        "
                    >
                        Start Free
                    </Link>

                </div>

            </div>

        </nav>

    );

}