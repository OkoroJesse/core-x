import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Twitter, Linkedin, Facebook, MessageCircle } from 'lucide-react';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
    const footerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Footer Content Animation
            if (contentRef.current) {
                gsap.from(contentRef.current.children, {
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 70%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                });
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative w-full bg-black text-white overflow-hidden">

            {/* Main Footer Content */}
            <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">

                {/* Grid: Logo/About + Links + Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8 text-center md:text-left">

                    {/* Column 1: Logo and About */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 mb-6 md:justify-start justify-center">
                            <div className="w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black font-bold text-xl">
                                C
                            </div>
                            <span className="text-2xl font-bold font-brattons">Core X</span>
                        </div>
                        <p className="text-gray-300 font-poppins text-sm leading-relaxed mb-6">
                            Core X is a web design and development Agency in Abuja that offers website development services. We are one of the best web developers in Nigeria.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4 md:justify-start justify-center">
                            <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300">
                                <span className="text-lg">🎵</span>
                            </a>
                            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300">
                                <span className="text-lg">▶</span>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-brattons font-bold text-lg mb-8 pb-3 border-b border-[#ccff00]/30 w-full">Quick Links</h4>
                        <ul className="space-y-4 w-full flex flex-col items-center md:items-start">
                            <li><a href="/" className="text-gray-300 font-poppins text-sm hover:text-[#ccff00] transition-colors flex items-center gap-2 group">Home</a></li>
                            <li><a href="/about" className="text-gray-300 font-poppins text-sm hover:text-[#ccff00] transition-colors flex items-center gap-2 group">About Us</a></li>
                            <li><a href="/services" className="text-gray-300 font-poppins text-sm hover:text-[#ccff00] transition-colors flex items-center gap-2 group">Services</a></li>
                            <li><a href="/#projects" className="text-gray-300 font-poppins text-sm hover:text-[#ccff00] transition-colors flex items-center gap-2 group">Projects</a></li>
                            <li><a href="/contact" className="text-gray-300 font-poppins text-sm hover:text-[#ccff00] transition-colors flex items-center gap-2 group">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-brattons font-bold text-lg mb-8 pb-3 border-b border-[#ccff00]/30 w-full">Contact Info</h4>
                        <ul className="space-y-5 w-full flex flex-col items-center md:items-start">
                            <li>
                                <a href="tel:+2348163321478" className="flex items-center gap-3 group">
                                    <Phone className="w-5 h-5 text-[#ccff00] flex-shrink-0" />
                                    <span className="text-gray-300 font-poppins text-sm hover:text-[#ccff00] transition-colors">08163321478</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:corexdigitalagency@gmail.com" className="flex items-center gap-3 group">
                                    <Mail className="w-5 h-5 text-[#ccff00] flex-shrink-0" />
                                    <span className="text-gray-300 font-poppins text-sm hover:text-[#ccff00] transition-colors">corexdigitalagency@gmail.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/2348140695734" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                                    <MessageCircle className="w-5 h-5 text-[#ccff00] flex-shrink-0" />
                                    <span className="text-gray-300 font-poppins text-sm hover:text-[#ccff00] transition-colors">08140695734</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-gray-400 font-poppins text-sm">
                        © 2025 <a href="#" className="text-[#ccff00] hover:underline">Core X</a>. All Rights Reserved.
                    </p>
                    <p className="text-gray-400 font-poppins text-xs">
                        Lead developer - <a href="https://jesse-nu.vercel.app/" target='blank' className="text-[#ccff00] hover:underline">Jesse Chinedu</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
