import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
    {
        id: 1,
        text: "Exceptional service! Truly impressed. Incredible service - top-notch quality delivered on time.",
        name: "Anna S",
        role: "Marketing Manager",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
    },
    {
        id: 2,
        text: "Incredible attention to detail !! On promptly Exceptional service!",
        name: "David L",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
    },
    {
        id: 3,
        text: "The team went above and beyond to ensure our vision was realized. Highly recommended!",
        name: "Sarah J",
        role: "Product Owner",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        text: "Professional, creative, and efficient. A pleasure to work with from start to finish.",
        name: "Michael B",
        role: "CEO, TechStart",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    }
];

const ReviewsSection = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Handle resize to determine mobile state
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // GSAP Animation for sliding
    useEffect(() => {
        const itemsToShow = isMobile ? 1 : 2;
        const slideWidth = 100 / itemsToShow;
        const xPercent = -(currentIndex * slideWidth);

        gsap.to(sliderRef.current, {
            xPercent: xPercent,
            duration: 0.8,
            ease: "power3.out"
        });
    }, [currentIndex, isMobile]);

    const nextSlide = () => {
        const itemsToShow = isMobile ? 1 : 2;
        const maxIndex = reviews.length - itemsToShow;
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(0); // Loop back to start
        }
    };

    const prevSlide = () => {
        const itemsToShow = isMobile ? 1 : 2;
        const maxIndex = reviews.length - itemsToShow;
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            setCurrentIndex(maxIndex); // Loop to end
        }
    };

    return (
        <section ref={sectionRef} className="w-full bg-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-center">
                    <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                        What Our Clients Say
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-8">
                        See What They Say <br />
                        About Us.
                    </h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 border-t border-gray-200 pt-8 mx-auto max-w-4xl">
                        <p className="text-gray-500 font-poppins max-w-xl text-sm md:text-base leading-relaxed">
                            Reviews are from <span className="font-bold text-black">creativity</span> with connectivity, resulting in <span className="font-bold text-black">impactful</span> solutions powered by innovative development strategies and <span className="font-bold text-black">advanced</span> technology.
                        </p>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 group"
                            >
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slider Container */}
                <div className="overflow-hidden -mx-4 px-4 py-4"> {/* Negative margin to allow shadow to show */}
                    <div ref={sliderRef} className="flex w-full">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className={`flex-shrink-0 px-4 ${isMobile ? 'w-full' : 'w-1/2'}`}
                            >
                                <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-md h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                                    <div>
                                        <Quote className="w-10 h-10 text-[#ccff00] fill-[#ccff00] mb-6" />
                                        <p className="text-xl md:text-2xl font-brattons leading-snug mb-8 text-black">
                                            {review.text}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                            <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold font-poppins text-black">{review.name}</h4>
                                            <p className="text-sm text-gray-500 font-poppins">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {reviews.map((_, idx) => {
                        // Only show dots relevant to the number of "pages"
                        const itemsToShow = isMobile ? 1 : 2;
                        const totalPages = Math.ceil(reviews.length / itemsToShow); // Simplified logic for dots
                        // Actually, for a sliding window, we might just want to highlight the current index
                        // But let's keep it simple: just show all dots and highlight current
                        return (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-black w-6' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default ReviewsSection;
