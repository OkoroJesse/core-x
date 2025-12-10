import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        id: 1,
        value: 10,
        label: "Years Experience",
        suffix: "+"
    },
    {
        id: 2,
        value: 50,
        label: "Projects Completed",
        suffix: "+"
    },
    {
        id: 3,
        value: 15,
        label: "Worldwide Clients",
        suffix: "+"
    }
];

const StatsSection = () => {
    const sectionRef = useRef(null);
    const numbersRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            numbersRef.current.forEach((el, index) => {
                const stat = stats[index];
                gsap.fromTo(el,
                    { innerText: 0 },
                    {
                        innerText: stat.value,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: 1 }, // Snap to whole numbers
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        },
                        onUpdate: function () {
                            el.innerHTML = Math.ceil(this.targets()[0].innerText) + stat.suffix;
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !numbersRef.current.includes(el)) {
            numbersRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="w-full bg-white pb-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto border-t border-gray-200 pt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center justify-center">
                            <h3
                                ref={addToRefs}
                                className="text-6xl md:text-7xl font-brattons font-bold text-black mb-2"
                            >
                                0{stat.suffix}
                            </h3>
                            <p className="text-gray-500 font-poppins text-lg uppercase tracking-wider font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
