import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Rocket, Target, Users, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import BackToTop from '../components/BackToTop';
import WhatsAppFloat from '../components/WhatsAppFloat';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const aboutRef = useRef(null);
    const textColRef = useRef(null);
    const imageColRef = useRef(null);
    const statsRef = useRef(null);
    const valuesRef = useRef(null);

    const pillsRef = useRef([]);

    const addToPills = (el) => {
        if (el && !pillsRef.current.includes(el)) {
            pillsRef.current.push(el);
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

            // About Section Animation
            if (textColRef.current) {
                gsap.from(textColRef.current, {
                    scrollTrigger: {
                        trigger: aboutRef.current,
                        start: "top 75%",
                    },
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }

            if (imageColRef.current) {
                gsap.from(imageColRef.current, {
                    scrollTrigger: {
                        trigger: aboutRef.current,
                        start: "top 75%",
                    },
                    x: 50,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out"
                });
            }

            // Stats Animation
            if (statsRef.current && statsRef.current.children.length > 0) {
                gsap.from(statsRef.current.children, {
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 80%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out"
                });
            }

            // Mission & Vision Animation - Removed to prevent fading
            // Cards are kept fully visible at all times
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
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                        alt="Team collaborating"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/60 to-zinc-900/90"></div>
                </div>

                {/* Hero Content */}
                <div ref={heroContentRef} className="relative z-10 flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-32 md:pt-40 pb-16 md:pb-24">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 max-w-6xl">
                        <div className="flex-1 w-full">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-brattons leading-[1.3] tracking-wide mb-8 text-white space-y-4">
                                <div className="overflow-hidden">
                                    <span className="hero-line block">Building
                                        <span ref={addToPills} className="inline-block mx-4 px-8 py-1 bg-[#ccff00] text-black rounded-full transform -skew-x-6 origin-left">
                                            <span className="block transform skew-x-6">Digital</span>
                                        </span>
                                    </span>
                                </div>
                                <div className="overflow-hidden">
                                    <span className="hero-line block">
                                        <span ref={addToPills} className="inline-block mr-4 px-8 py-1 bg-[#ccff00] text-black rounded-full transform -skew-x-6 origin-left">
                                            <span className="block transform skew-x-6">Excellence</span>
                                        </span>
                                    </span>
                                </div>
                            </h1>

                            <p className="hero-subtext text-gray-300 font-poppins text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                                We're a team of creative designers, strategic thinkers, and talented developers dedicated to creating exceptional digital experiences that transform businesses.
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
                                        Building Excellence •
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

            {/* About Section */}
            <section ref={aboutRef} id="about" className="w-full bg-white py-12 md:py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Column: Text */}
                        <div ref={textColRef} className="flex flex-col justify-center">
                            <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                                About Core X
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-8">
                                Your Vision, Our Expertise
                            </h2>

                            <p className="text-gray-600 font-poppins text-lg leading-relaxed mb-6">
                                Since 2021, Core X has been at the forefront of digital innovation. We've helped startups launch their first product, guided enterprises through digital transformation, and empowered creative teams to bring their boldest ideas to life.
                            </p>

                            <p className="text-gray-600 font-poppins text-lg leading-relaxed mb-8">
                                Our approach combines strategic thinking, creative design, and technical excellence. We don't just build websites and apps—we create digital experiences that engage users, drive conversions, and fuel business growth.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-[#ccff00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-poppins font-bold text-black mb-1">Expert Team</h4>
                                        <p className="text-gray-600 font-poppins text-sm">Talented professionals across design, development, and strategy</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-[#ccff00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-poppins font-bold text-black mb-1">Proven Track Record</h4>
                                        <p className="text-gray-600 font-poppins text-sm">50+ successful projects delivered to clients worldwide</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-[#ccff00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-poppins font-bold text-black mb-1">Global Presence</h4>
                                        <p className="text-gray-600 font-poppins text-sm">Serving clients across North America, Europe, and beyond</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Image */}
                        <div ref={imageColRef} className="relative">
                            <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                    alt="Team collaboration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Floating Card */}
                            <div className="absolute -bottom-12 -right-8 bg-white p-8 rounded-2xl shadow-2xl max-w-xs">
                                <p className="text-gray-600 font-poppins text-sm mb-4">
                                    "Working with Core X transformed our digital presence and business growth."
                                </p>
                                <p className="font-poppins font-bold text-black">- Jane Smith, CEO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="w-full bg-white py-12 md:py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-[#ccff00] font-poppins font-semibold tracking-wider uppercase text-sm mb-4 block">
                            Our Purpose
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-6">
                            Mission & Vision
                        </h2>
                        <p className="text-gray-600 font-poppins text-base md:text-lg max-w-3xl mx-auto">
                            Driving digital transformation with purpose and passion.
                        </p>
                    </div>

                    <div ref={valuesRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Mission Card */}
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200">
                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#ccff00] rounded-full flex items-center justify-center text-black flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Rocket className="w-6 h-6 md:w-8 md:h-8 text-black" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-brattons font-bold text-black">Our Mission</h3>
                            </div>
                            <p className="text-gray-700 font-poppins text-sm md:text-base leading-relaxed mb-4">
                                Our mission is to help businesses succeed by creating beautiful, functional, and user-friendly websites that truly reflect their brand. We're passionate about combining creativity and technology to deliver custom website development that not only look great but also drive results.
                            </p>
                            <p className="text-gray-700 font-poppins text-sm md:text-base leading-relaxed">
                                Whether it's helping a startup establish its online presence or enabling a big business to grow, we're here to make your digital goals a reality. We believe that every business deserves a website that works as hard as they do.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200">
                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#ccff00] rounded-full flex items-center justify-center text-black flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Target className="w-6 h-6 md:w-8 md:h-8 text-black" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-brattons font-bold text-black">Our Vision</h3>
                            </div>
                            <p className="text-gray-700 font-poppins text-sm md:text-base leading-relaxed mb-4">
                                Our vision is to become the best web design agency in Nigeria, known for helping businesses thrive in the digital age. We aim to set the bar for creativity and quality, delivering websites and digital solutions that leave a lasting impact on our clients and their customers.
                            </p>
                            <p className="text-gray-700 font-poppins text-sm md:text-base leading-relaxed">
                                We see a future where businesses of all sizes can compete on a global scale with the right digital tools and strategies. By staying ahead of trends and continually improving our skills, we want to help shape that future.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="w-full bg-gray-50 py-12 md:py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-[#ccff00] font-poppins font-semibold tracking-wider uppercase text-sm mb-4 block">
                            Our Values
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-6">
                            What Drives Us
                        </h2>
                        <p className="text-gray-600 font-poppins text-base md:text-lg max-w-3xl mx-auto">
                            Our core values shape every decision we make and guide our work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group">
                            <div className="w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-brattons text-black mb-3">Innovation</h3>
                            <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                                We push boundaries with cutting-edge technology and creative solutions that drive real results.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group">
                            <div className="w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-brattons text-black mb-3">Client Focus</h3>
                            <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                                Your success is our success. We partner with you to understand and exceed your business goals.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group">
                            <div className="w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-brattons text-black mb-3">Excellence</h3>
                            <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                                We deliver high-quality work with attention to detail and commitment to perfection.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group">
                            <div className="w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-brattons text-black mb-3">Strategy</h3>
                            <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                                Every project starts with strategy. We align design and development with your business objectives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-black py-12 md:py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-brattons text-white mb-6">
                        Ready to Partner with Us?
                    </h2>
                    <p className="text-gray-300 font-poppins text-base md:text-lg mb-12 max-w-2xl mx-auto">
                        Let's discuss how we can help you achieve your digital goals and transform your business.
                    </p>
                    <a href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#ccff00] text-black rounded-xl font-poppins font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 group">
                        Get In Touch
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

export default About;
