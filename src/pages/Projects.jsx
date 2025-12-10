import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FooterSection from '../components/FooterSection';
import BackToTop from '../components/BackToTop';
import WhatsAppFloat from '../components/WhatsAppFloat';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const projectsGridRef = useRef(null);
    const pillsRef = useRef([]);
    const projectCardsRef = useRef([]);

    const addToPills = (el) => {
        if (el && !pillsRef.current.includes(el)) {
            pillsRef.current.push(el);
        }
    };

    const addToCards = (el) => {
        if (el && !projectCardsRef.current.includes(el)) {
            projectCardsRef.current.push(el);
        }
    };

    const projects = [
        {
            id: 1,
            title: "Fintech Dashboard",
            category: "UI/UX",
            image: "/fintech dashboard.png",
            description: "A comprehensive Analytic dashboard design."
        },
        {
            id: 2,
            title: "Luxury Real Estate",
            category: "Website Design",
            image: "/urbanpeak.png",
            description: "Premium real estate platform showcasing luxury properties with 3D tours and virtual walkthroughs."
        },
        {
            id: 3,
            title: "E-Commerce Web App",
            category: "Web App",
            image: "/e-commerce.png",
            description: "Local e-commerce marketplace for both buyers and sellers."
        },
        {
            id: 4,
            title: "Brand Web Design",
            category: "Branding",
            image: "/perfumebrand.png",
            description: " A modern Perfume brand design."
        },
        {
            id: 5,
            title: "Crypto Web Platform",
            category: "Product Design",
            image: "/cryptoWebsite.png",
            description: "A crypto website design ."
        },
        {
            id: 6,
            title: "Travel Website",
            category: "Web Design",
            image: "/travelnow.png",
            description: "Modern travel and tour website."
        }
    ];

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

            // Projects Grid Animation
            if (projectsGridRef.current) {
                gsap.from(projectCardsRef.current, {
                    scrollTrigger: {
                        trigger: projectsGridRef.current,
                        start: "top 75%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                });
            }
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="w-full bg-white">

            {/* Navbar */}
            <Navbar isDark={true} />

            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full min-h-screen bg-zinc-900 text-white overflow-hidden flex flex-col">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
                        alt="Projects background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/60 to-zinc-900/90"></div>
                </div>

                {/* Hero Content */}
                <div ref={heroContentRef} className="relative z-10 flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-20 md:pt-32 pb-16 md:pb-24">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 max-w-6xl">
                        <div className="flex-1 w-full">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-brattons leading-[1.3] tracking-wide mb-8 text-white space-y-4">
                                <div className="overflow-hidden">
                                    <span className="hero-line block">Our Featured
                                        <span ref={addToPills} className="inline-block mx-4 px-8 py-1 bg-[#ccff00] text-black rounded-full transform -skew-x-6 origin-left">
                                            <span className="block transform skew-x-6">Works</span>
                                        </span>
                                    </span>
                                </div>
                                <div className="overflow-hidden">
                                    <span className="hero-line block">Showcase</span>
                                </div>
                            </h1>

                            <p className="hero-subtext text-gray-300 text-lg md:text-xl font-poppins leading-relaxed max-w-2xl">
                                Explore our portfolio of successful projects spanning web development, design, mobile apps, and digital transformation.
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
                                        Featured Projects •
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
            </section>

            {/* Projects Grid Section */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="mb-20">
                        <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                            Selected Works
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-6">
                            Recent Projects
                        </h2>
                        <p className="text-gray-600 font-poppins text-lg max-w-2xl">
                            From concept to launch, we've delivered exceptional digital solutions that drive results for our clients across various industries.
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                ref={addToCards}
                                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 h-64"
                            >
                                {/* Image */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between transform opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="text-left">
                                        <span className="inline-block px-4 py-1 bg-[#ccff00] text-black text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                            {project.category}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-brattons text-white mb-2 leading-tight">{project.title}</h3>
                                        <p className="text-gray-100 font-poppins text-sm mb-4 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-[#ccff00] font-poppins font-semibold text-sm">
                                            View Project
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-black py-12 md:py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-brattons text-white mb-6">
                        Have a Project in Mind?
                    </h2>
                    <p className="text-gray-300 font-poppins text-base md:text-lg mb-12 max-w-2xl mx-auto">
                        Let's work together to bring your vision to life with exceptional design and development.
                    </p>
                    <a href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#ccff00] text-black rounded-xl font-poppins font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 group">
                        Start Your Project
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <FooterSection />
            <BackToTop />
            <WhatsAppFloat />

        </div>
    );
};

export default Projects;
