import Navbar from "@/components/landing/Navbar";

import Hero from "@/components/landing/Hero";

import PlatformSection from "@/components/landing/PlatformSection";

import ProductsSection from "@/components/landing/ProductsSection";

import IndustriesSection from "@/components/landing/IndustriesSection";

import AISection from "@/components/landing/AISection";

import StatsSection from "@/components/landing/StatsSection";

import DemoSection from "@/components/landing/DemoSection";

import CTASection from "@/components/landing/CTASection";

import Footer from "@/components/landing/Footer";

export default function Home(){

    return(

        <main
            className="
            bg-slate-950
            text-white
            "
        >

            <Navbar/>

            <Hero/>

            <PlatformSection/>

            <ProductsSection/>

            <IndustriesSection/>

            <AISection/>

            <StatsSection/>

            <DemoSection/>

            <CTASection/>

            <Footer/>

        </main>

    );

}