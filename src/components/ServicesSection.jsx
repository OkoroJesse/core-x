import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Smartphone, Search, Wrench, Layers, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: 1,
        title: "Website Development",
        description: "Custom, high-performance websites built with modern technologies and best practices to drive your business forward.",
        icon: <Code className="w-8 h-8" />,
        bg: "bg-zinc-900",
        text: "text-white",
        iconBg: "bg-[#ccff00]",
        iconColor: "text-black"
    },
    {
        id: 2,
        title: "Website Design",
        description: "Beautiful, intuitive web designs that captivate your audience and deliver exceptional user experiences.",
        icon: <Palette className="w-8 h-8" />,
        bg: "bg-[#ccff00]",
        text: "text-black",
        iconBg: "bg-black",
        iconColor: "text-white"
    },
    {
        id: 3,
        title: "Mobile App Development",
        description: "Native and cross-platform mobile apps that engage users and extend your brand to every pocket.",
        icon: <Smartphone className="w-8 h-8" />,
        bg: "bg-zinc-900",
        text: "text-white",
        iconBg: "bg-[#ccff00]",
        iconColor: "text-black"
    },
    {
        id: 4,
        title: "SEO",
        description: "Strategic search engine optimization to increase visibility, drive organic traffic, and boost your online presence.",
        icon: <Search className="w-8 h-8" />,
        bg: "bg-gray-50",
        text: "text-black",
        iconBg: "bg-zinc-900",
        iconColor: "text-white"
    },
    {
        id: 5,
        title: "Website Maintenance",
        description: "Ongoing support and maintenance to keep your website secure, fast, and running smoothly at all times.",
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
        description: "User-centered design solutions that blend aesthetics with functionality for memorable digital experiences.",
        icon: <Layers className="w-8 h-8" />,
        bg: "bg-gray-50",
        text: "text-black",
        iconBg: "bg-zinc-900",
        iconColor: "text-white"
    }
];

const ServicesSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Header Animation
            gsap.from(headerRef.current.children, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Cards Animation - Removed to prevent fading
            // Cards are kept fully visible at all times

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToCards = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} id="services" className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div ref={headerRef} className="text-center mb-12 md:mb-20">
                    <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                        Our Services
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

                {/* Grid */}
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
    );
};

export default ServicesSection;
