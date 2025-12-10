import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const leftImgRef = useRef(null);
    const textRef = useRef(null);
    const badgeRef = useRef(null);
    const rightImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Left Image Animation (Slide from left)
            gsap.from(leftImgRef.current, {
                scrollTrigger: {
                    trigger: leftImgRef.current,
                    start: "top 75%",
                },
                x: -50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });

            // Text Animation
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 75%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out"
            });

            // Badge Animation (Pop in + Rotate)
            gsap.from(badgeRef.current, {
                scrollTrigger: {
                    trigger: badgeRef.current,
                    start: "top 85%",
                },
                scale: 0,
                rotation: -180,
                opacity: 0,
                duration: 1,
                delay: 0.4,
                ease: "elastic.out(1, 0.5)"
            });

            // Right Image Animation (Slide from right)
            gsap.from(rightImgRef.current, {
                scrollTrigger: {
                    trigger: rightImgRef.current,
                    start: "top 80%",
                },
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="w-full bg-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="relative flex flex-col items-center justify-center mb-16 md:mb-24">
                    {/* Decorative Line Left */}
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-24 h-1 bg-[#ccff00]"></div>

                    {/* Title */}
                    <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-brattons text-center text-black leading-tight max-w-3xl mx-auto z-10">
                        Digital agency problems and their best solutions
                    </h2>

                    {/* Decorative Squares Right */}
                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 gap-0">
                        <div className="w-8 h-8 bg-[#ccff00] transform translate-y-4"></div>
                        <div className="w-10 h-10 bg-black transform -translate-x-2 -translate-y-2"></div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Large Image */}
                    <div ref={leftImgRef} className="lg:col-span-5 relative">
                        <div className="rounded-3xl overflow-hidden h-[400px] md:h-[500px] w-full shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                                alt="Team working together"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-12">

                        {/* Paragraph */}
                        <p ref={textRef} className="text-gray-600 font-poppins text-lg leading-relaxed">
                            Businesses today face issues like slow websites, weak branding, and poor online visibility. Our agency solves these problems with strategic design, modern development, and results-focused digital solutions. We help brands grow with experiences that are fast, clear, and built to convert.
                        </p>

                        {/* Bottom Row: Badge & Small Image */}
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-10 md:gap-6">

                            {/* Circular Badge */}
                            <div ref={badgeRef} className="relative w-32 h-32 flex-shrink-0">
                                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                    <path
                                        id="aboutCirclePath"
                                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        fill="transparent"
                                    />
                                    <text className="text-[10px] font-bold uppercase tracking-[2px] fill-black font-poppins">
                                        <textPath href="#aboutCirclePath" startOffset="0%">
                                            Leading Digital Agency Since 2021 •
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer">
                                        <ArrowUpRight className="w-6 h-6 text-black" />
                                    </div>
                                </div>
                            </div>

                            {/* Right Small Image */}
                            <div ref={rightImgRef} className="w-full md:w-auto flex-grow">
                                <div className="rounded-3xl overflow-hidden h-[200px] md:h-[250px] w-full shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
                                        alt="Digital strategy meeting"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
