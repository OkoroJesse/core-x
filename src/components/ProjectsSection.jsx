import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Fintech Dashboard",
        category: "UI/UXz",
        image: "/fintech dashboard.png",
    },
    {
        id: 2,
        title: "Luxury Real Estate",
        category: "Website Design",
        image: "/urbanpeak.png",
    },
    {
        id: 3,
        title: "E-Commerce Web App",
        category: "Web App",
        image: "/e-commerce.png",
    },
    {
        id: 4,
        title: "Brand Web Design",
        category: "Branding",
        image: "/perfumebrand.png",
    },
    {
        id: 5,
        title: "Crypto Web Platform",
        category: "Product Design",
        image: "/cryptoWebsite.png",
    },
    {
        id: 6,
        title: "Travel Website",
        category: "Web Design",
        image: "/travelnow.png",
    }
];

const ProjectsSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const projectRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Header Animation
            gsap.from(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Projects Stagger Animation
            gsap.from(projectRefs.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !projectRefs.current.includes(el)) {
            projectRefs.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} id="projects" className="w-full bg-white py-24 px-6 md:px-12 lg:px-20 text-black">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
                    <div className="flex-1">
                        <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                            Selected Works
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons leading-tight">
                            Featured <span className="text-black">Projects</span>
                        </h2>
                    </div>

                    <a href="/projects" className="inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-5 bg-[#ccff00] text-black rounded-xl font-poppins font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 group flex-shrink-0">
                        View All Projects
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>

                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            ref={addToRefs}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Image */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110 bg-gray-100"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div>
                                    <span className="inline-block px-4 py-1 bg-[#ccff00] text-black text-xs font-bold uppercase tracking-wider rounded-none mb-3">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-brattons text-white">{project.title}</h3>
                                </div>

                                <div className="w-10 h-10 bg-white rounded-none flex items-center justify-center text-black">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ProjectsSection;
