import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Asterisk } from 'lucide-react';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const heroRef = useRef(null);
    const pillsRef = useRef([]);
    const marqueeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Text Animation
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-line", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                delay: 0.5
            })
                .from(pillsRef.current, {
                    scaleX: 0,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    transformOrigin: "center left" // Expands from left
                }, "-=0.5")
                .from(".hero-subtext", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8
                }, "-=0.3")
                .from(".circular-badge", {
                    scale: 0,
                    rotate: -180,
                    opacity: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.5");

            // Marquee Animation
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear",
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const addToPills = (el) => {
        if (el && !pillsRef.current.includes(el)) {
            pillsRef.current.push(el);
        }
    };

    return (
        <div ref={heroRef} id="home" className="relative w-screen min-h-screen bg-zinc-900 text-white overflow-hidden flex flex-col">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                    alt="Team collaborating"
                    className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/50 to-zinc-900/90"></div>
            </div>

            {/* Use the Navbar component */}
            <Navbar isDark={true} />

            {/* Hero Content */}
            <main className="relative z-10 flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-32 pb-24">

                <div className="w-full">
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-beyond leading-[1.1] tracking-wide mb-8">
                        <div className="overflow-hidden">
                            <span className="hero-line block">Creating
                                <span ref={addToPills} className="inline-block mx-4 px-8 py-1 bg-[#ccff00] text-black rounded-full transform -skew-x-6 origin-left">
                                    <span className="block transform skew-x-6">brands</span>
                                </span>
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-line block">and digital</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-line block">
                                <span ref={addToPills} className="inline-block mr-4 px-8 py-1 bg-[#ccff00] text-black rounded-full transform -skew-x-6 origin-left">
                                    <span className="block transform skew-x-6">solutions</span>
                                </span>
                            </span>
                        </div>
                    </h1>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mt-12">
                        {/* Subtext */}
                        <p className="hero-subtext text-gray-300 font-poppins text-lg md:text-xl max-w-md leading-relaxed">
                            We design exceptional brands, products, web apps, mobile apps, websites for startups and enterprises.
                        </p>

                        {/* Circular Badge */}
                        <div className="circular-badge relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                <path
                                    id="circlePath"
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="transparent"
                                />
                                <text className="text-[10px] font-bold uppercase tracking-[2px] fill-white font-poppins">
                                    <textPath href="#circlePath" startOffset="0%">
                                        Leading Digital Agency Since 2021 •
                                    </textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center">
                                    <ArrowUpRight className="w-6 h-6 text-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* Bottom Marquee */}
            <div className="relative z-20 bg-[#ccff00] text-black py-4 overflow-hidden font-bold font-poppins text-lg uppercase tracking-wider">
                <div ref={marqueeRef} className="flex whitespace-nowrap w-[200%]">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-12 px-6">
                            <span>Web Development</span>
                            <Asterisk className="w-6 h-6 animate-spin-slow" />
                            <span>UI/UX Design</span>
                            <Asterisk className="w-6 h-6 animate-spin-slow" />
                            <span>App Development</span>
                            <Asterisk className="w-6 h-6 animate-spin-slow" />
                            <span>Innovative Ideas</span>
                            <Asterisk className="w-6 h-6 animate-spin-slow" />
                            <span>Development Agency</span>
                            <Asterisk className="w-6 h-6 animate-spin-slow" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HeroSection;
