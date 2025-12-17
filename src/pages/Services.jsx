import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Smartphone, Search, Wrench, Layers, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import Button from '../components/Button';
import FooterSection from '../components/FooterSection';
import BackToTop from '../components/BackToTop';
import WhatsAppFloat from '../components/WhatsAppFloat';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const servicesGridRef = useRef(null);
    const pillsRef = useRef([]);

    const addToPills = (el) => {
        if (el && !pillsRef.current.includes(el)) {
            pillsRef.current.push(el);
        }
    };

    const services = [
        {
            id: 1,
            title: "Website Development",
            description: "Custom, high-performance websites built with modern technologies and best practices to drive your business forward. From concept to deployment, we ensure your site is fast, secure, and scalable.",
            icon: <Code className="w-8 h-8" />,
            bg: "bg-zinc-900",
            text: "text-white",
            iconBg: "bg-[#ccff00]",
            iconColor: "text-black"
        },
        {
            id: 2,
            title: "Website Design",
            description: "Beautiful, intuitive web designs that captivate your audience and deliver exceptional user experiences. We create visually stunning websites that align with your brand identity.",
            icon: <Palette className="w-8 h-8" />,
            bg: "bg-[#ccff00]",
            text: "text-black",
            iconBg: "bg-black",
            iconColor: "text-white"
        },
        {
            id: 3,
            title: "Mobile App Development",
            description: "Native and cross-platform mobile apps that engage users and extend your brand to every pocket. We build apps that are intuitive, fast, and help you reach your audience wherever they are.",
            icon: <Smartphone className="w-8 h-8" />,
            bg: "bg-zinc-900",
            text: "text-white",
            iconBg: "bg-[#ccff00]",
            iconColor: "text-black"
        },
        {
            id: 4,
            title: "SEO",
            description: "Strategic search engine optimization to increase visibility, drive organic traffic, and boost your online presence. We use data-driven strategies to help your business rank higher.",
            icon: <Search className="w-8 h-8" />,
            bg: "bg-gray-50",
            text: "text-black",
            iconBg: "bg-zinc-900",
            iconColor: "text-white"
        },
        {
            id: 5,
            title: "Website Maintenance",
            description: "Ongoing support and maintenance to keep your website secure, fast, and running smoothly at all times. We handle updates, backups, and security so you can focus on your business.",
            icon: <Wrench className="w-8 h-8" />,
            bg: "bg-white",
            text: "text-black",
            iconBg: "bg-zinc-900",
            iconColor: "text-white",
            border: "border border-gray-100"
        },
        {
            id: 6,
            title: "UI/UX Design",
            description: "User-centered design solutions that blend aesthetics with functionality for memorable digital experiences. We create interfaces that are beautiful, intuitive, and conversion-focused.",
            icon: <Layers className="w-8 h-8" />,
            bg: "bg-gray-50",
            text: "text-black",
            iconBg: "bg-zinc-900",
            iconColor: "text-white"
        }
    ];

    const cardsRef = useRef([]);

    const addToCards = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Title Animation
            if (heroContentRef.current) {
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
                        transformOrigin: "center left"
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
            }

            // Services Grid Animation - Removed to prevent fading
            // Cards are kept fully visible at all times
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="w-full bg-white">
            <Seo
                title="Services"
                description="Explore our comprehensive suite of professional services including Website Development, UI/UX Design, Mobile Apps, and SEO."
                canonical="/services"
            />
            {/* Navbar */}
            <Navbar isDark={true} />

            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full min-h-screen bg-zinc-900 text-white overflow-hidden flex flex-col">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                        alt="Services team"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/60 to-zinc-900/90"></div>
                </div>

                {/* Hero Content */}
                <div ref={heroContentRef} className="relative z-10 flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-20 md:pt-32 pb-16 md:pb-24">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 max-w-6xl">
                        <div className="flex-1 w-full">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-brattons leading-[1.3] tracking-wide mb-8 text-white space-y-4">
                                <div className="overflow-hidden">
                                    <span className="hero-line block">Our Comprehensive
                                        <span ref={addToPills} className="inline-block mx-4 px-8 py-1 bg-[#ccff00] text-black rounded-full transform -skew-x-6 origin-left">
                                            <span className="block transform skew-x-6">Services</span>
                                        </span>
                                    </span>
                                </div>
                            </h1>

                            <p className="hero-subtext text-gray-300 font-poppins text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                                Explore our comprehensive suite of professional services designed to elevate your business and drive growth through innovation and expertise.
                            </p>
                        </div>

                        {/* Circular Badge */}
                        <div className="circular-badge relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center flex-shrink-0 self-start md:self-center">
                            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                <path
                                    id="circlePath"
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="transparent"
                                />
                                <text className="text-[9px] font-bold uppercase tracking-[1px] fill-white font-poppins">
                                    <textPath href="#circlePath" startOffset="0%">
                                        Professional Services •
                                    </textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ccff00] rounded-full flex items-center justify-center">
                                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="relative z-10 flex justify-center pb-8">
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section ref={servicesGridRef} className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-20">
                        <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                            What We Offer
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons text-black leading-tight max-w-4xl mx-auto">
                            Our Mission Is To Make Your <br className="hidden sm:block" />
                            <span className="relative inline-block px-4 mx-2">
                                <span className="absolute inset-0 bg-[#ccff00] transform -skew-x-6 rounded-md"></span>
                                <span className="relative z-10">Business</span>
                            </span>
                            Better Through Technology
                        </h2>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                ref={addToCards}
                                className={`group relative p-5 md:p-6 rounded-2xl md:rounded-[2.5rem] ${service.bg} ${service.text} ${service.border || ''} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col`}
                            >
                                {/* Icon */}
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${service.iconBg} ${service.iconColor} flex items-center justify-center mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0`}>
                                    {service.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <h3 className={`text-base md:text-lg font-brattons mb-2 ${service.text}`}>{service.title}</h3>
                                    <p className={`font-poppins text-xs md:text-sm leading-relaxed ${service.text === 'text-white' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {service.description}
                                    </p>
                                </div>

                                {/* Learn More Link */}
                                <div className="flex items-center gap-2 font-poppins font-semibold text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
                                    <span>Learn More</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <FooterSection />
            <BackToTop />
            <WhatsAppFloat />
        </div>
    );
};

export default Services;
