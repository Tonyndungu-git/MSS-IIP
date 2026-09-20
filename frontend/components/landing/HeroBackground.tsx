"use client";

import { motion } from "framer-motion";

export default function HeroBackground(){

    return(

        <>

            <motion.div

                animate={{
                    scale:[1,1.2,1],
                    opacity:[0.2,0.5,0.2]
                }}

                transition={{
                    duration:12,
                    repeat:Infinity
                }}

                className="
                absolute
                w-[900px]
                h-[900px]
                rounded-full
                bg-cyan-500/20
                blur-[160px]
                -top-60
                -left-60
                "

            />

            <motion.div

                animate={{
                    scale:[1,1.1,1],
                    opacity:[0.15,0.4,0.15]
                }}

                transition={{
                    duration:15,
                    repeat:Infinity
                }}

                className="
                absolute
                w-[800px]
                h-[800px]
                rounded-full
                bg-blue-600/20
                blur-[180px]
                bottom-0
                right-0
                "

            />

        </>

    );

}