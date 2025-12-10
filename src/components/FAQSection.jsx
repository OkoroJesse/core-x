import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const CustomPlus = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
);

const CustomMinus = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
);

const faqs = [
    {
        id: 1,
        question: "What services does your agency specialize in?",
        answer: "We specialize in delivering high-quality web development, modern UI/UX design, and professional web design services—crafted to elevate your brand and create seamless digital experiences."
    },
    {
        id: 2,
        question: "How do you handle project communication?",
        answer: "We believe in transparent and consistent communication. We use tools like Google Meet, Trello, and Zoom for regular updates, and you'll have a dedicated project manager to ensure your vision is perfectly executed."
    },
    {
        id: 3,
        question: "What is your typical project timeline?",
        answer: "Timelines vary based on project complexity. A standard website typically takes 2-6 weeks, while complex web applications may take 1-3 months. We provide a detailed timeline during our initial consultation."
    },
    {
        id: 4,
        question: "Do you provide post-launch support?",
        answer: "Absolutely. We offer various maintenance and support packages to ensure your digital product remains secure, up-to-date, and optimized for performance long after launch."
    },
    {
        id: 5,
        question: "What is your pricing structure?",
        answer: "Our pricing is project-based and tailored to your specific needs and goals. We offer flexible engagement models including fixed-price contracts for defined scopes and time-and-materials for evolving projects."
    }
];

const FAQItem = ({ item, isOpen, onClick }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.5,
                ease: "power3.out"
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.in"
            });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-gray-200 last:border-none">
            <button
                onClick={onClick}
                className="w-full py-6 flex justify-between items-center text-left group"
            >
                <span className={`text-lg md:text-xl font-brattons transition-colors duration-300 ${isOpen ? 'text-[#8cb300]' : 'text-black group-hover:text-gray-600'}`}>
                    {item.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ml-4 ${isOpen ? 'bg-[#ccff00] border-[#ccff00] rotate-180' : 'bg-white border-gray-300 group-hover:border-black'}`}>
                    {isOpen ? <CustomMinus className="w-4 h-4 text-black" /> : <CustomPlus className="w-4 h-4 text-black" />}
                </div>
            </button>
            <div
                ref={contentRef}
                className="h-0 overflow-hidden opacity-0"
            >
                <p className="pb-6 text-gray-500 font-poppins text-sm leading-relaxed">
                    {item.answer}
                </p>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left Column Animation
            gsap.from(leftColRef.current.children, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Right Column Animation
            gsap.from(rightColRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section ref={sectionRef} id="contact" className="w-full bg-white py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Header & Contact Card */}
                    <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-between h-full">
                        <div>
                            <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                                Common Questions
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-8">
                                Frequently Asked <br /> Questions
                            </h2>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-zinc-900 rounded-3xl p-8 text-white mt-8 lg:mt-auto relative overflow-hidden group">
                            {/* Decorative Circle */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ccff00]/20 rounded-full blur-2xl group-hover:bg-[#ccff00]/30 transition-colors duration-500"></div>

                            <h3 className="text-2xl font-brattons mb-4 relative z-10">Still have questions?</h3>
                            <p className="text-gray-400 font-poppins text-sm mb-8 relative z-10 leading-relaxed">
                                Can't find the answer you're looking for? Please chat to our friendly team.
                            </p>

                            <button onClick={() => navigate('/contact')} className="w-full py-4 bg-[#ccff00] text-black font-poppins font-bold uppercase tracking-wider rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3 relative z-10 group">
                                <span>Get in Touch</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: FAQ List */}
                    <div ref={rightColRef} className="lg:col-span-7">
                        <div className="bg-gray-50 rounded-[2rem] p-8 md:p-10">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={faq.id}
                                    item={faq}
                                    isOpen={openIndex === index}
                                    onClick={() => handleToggle(index)}
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default FAQSection;
