import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Zap, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import Button from '../components/Button';
import FooterSection from '../components/FooterSection';
import BackToTop from '../components/BackToTop';
import WhatsAppFloat from '../components/WhatsAppFloat';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const mainContentRef = useRef(null);
    const infoCardsRef = useRef(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

            // Main Content Animation
            gsap.from(mainContentRef.current.children, {
                scrollTrigger: {
                    trigger: mainContentRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Info Cards Animation - Removed to prevent fading
            // Cards are kept fully visible at all times

            // Form Animation with enhanced effect
            if (formRef.current) {
                gsap.from(formRef.current, {
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 70%",
                    },
                    x: 50,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out"
                });
            }
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '399af771-5739-4cdb-90f9-d7627fe3c1a6', // Replace with your Web3Forms Access Key
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                    from_name: 'Core X Contact Form'
                })
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitting(false);
                setSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });

                // Reset success message after 4 seconds
                setTimeout(() => setSubmitted(false), 4000);
            } else {
                setIsSubmitting(false);
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email",
            value: "corexdigitalagency@gmail.com",
            href: "mailto:corexdigitalagency@gmail.com",
            description: "Send us an email anytime"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            label: "Phone",
            value: "+234 (816) 332-1478",
            href: "tel:+2348163321478",
            description: "We're available 9am-6pm EST"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            label: "Location",
            value: "Abuja, Nigeria",
            href: "#",
            description: ""
        },
        {
            icon: <Clock className="w-6 h-6" />,
            label: "Response Time",
            value: "Within 24 Hours",
            href: "#",
            description: "We'll get back to you quickly"
        }
    ];

    const whyChooseUs = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Fast Response",
            description: "We respond to inquiries within 24 hours"
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Expert Advice",
            description: "Get professional guidance from our team"
        },
        {
            icon: <Send className="w-8 h-8" />,
            title: "Seamless Process",
            description: "From inquiry to project kickoff made simple"
        }
    ];

    return (
        <div ref={pageRef} className="w-full bg-white">
            <Seo
                title="Contact Us"
                description="Get in touch with Core X. We're here to help you bring your digital vision to life."
                canonical="/contact"
            />

            {/* Navbar */}
            <Navbar isDark={true} />

            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full min-h-screen bg-zinc-900 text-white overflow-hidden flex flex-col">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                        alt="Team working together"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/60 to-zinc-900/90"></div>
                </div>

                {/* Hero Content */}
                <div ref={heroContentRef} className="relative z-10 flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-32 md:pt-40 pb-16 md:pb-24">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 max-w-6xl">
                        <div className="flex-1 w-full">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-brattons leading-[1.1] tracking-wide mb-8 text-white">
                                <div className="overflow-hidden">
                                    <span className="hero-line block">Get in Touch &
                                        <span ref={addToPills} className="inline-block mx-4 px-8 py-1 bg-[#ccff00] text-black rounded-full transform -skew-x-6 origin-left">
                                            <span className="block transform skew-x-6">Connect</span>
                                        </span>
                                    </span>
                                </div>
                            </h1>

                            <p className="hero-subtext text-gray-300 font-poppins text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                                Get in touch with our team of experts. We're here to help you bring your digital vision to life and answer any questions you may have.
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
                                        Get In Touch Today •
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

            {/* Main Content Section */}
            <section ref={mainContentRef} className="w-full bg-white py-8 md:py-12 lg:py-16 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-2 block">
                            Get In Touch
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-brattons font-bold text-black leading-tight mb-4">
                            Let's Talk About Your Project
                        </h2>
                        <p className="text-gray-600 font-poppins text-base md:text-lg max-w-2xl mx-auto">
                            Whether you have a question about our services, want to discuss your project, or just want to say hello, we'd love to hear from you.
                        </p>
                    </div>

                    {/* Contact Info Cards */}
                    <div ref={infoCardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.href}
                                className="group p-6 md:p-8 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-200 hover:border-[#ccff00] hover:bg-yellow-50/30 transition-all duration-300"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#ccff00] rounded-full flex items-center justify-center text-black mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                    {info.icon}
                                </div>
                                <h3 className="font-poppins font-bold text-black text-base md:text-lg mb-2">{info.label}</h3>
                                <p className="text-gray-600 font-poppins text-sm md:text-base mb-2">{info.value}</p>
                                <p className="text-gray-500 font-poppins text-sm">{info.description}</p>
                            </a>
                        ))}
                    </div>

                </div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="w-full bg-gray-50 py-8 md:py-12 lg:py-16 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

                        {/* Left Column: Why Choose Us */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                                Why Work With Us
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-brattons font-bold text-black leading-tight mb-6 md:mb-8">
                                We Make It Easy
                            </h2>

                            <div className="space-y-4 md:space-y-6">
                                {whyChooseUs.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 md:gap-4 group">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-poppins font-bold text-black text-sm md:text-base mb-1">{item.title}</h3>
                                            <p className="text-gray-600 font-poppins text-xs md:text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 bg-white rounded-2xl border-2 border-[#ccff00]">
                                <p className="text-gray-600 font-poppins italic mb-4">
                                    "Core X transformed our entire digital presence. The team is professional, creative, and genuinely cares about your success."
                                </p>
                                <p className="font-poppins font-bold text-black">Sarah Johnson</p>
                                <p className="text-gray-500 font-poppins text-sm">CEO, Tech Innovations Inc.</p>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div ref={formRef} className="lg:col-span-7">
                            {submitted ? (
                                <div className="h-full flex items-center justify-center p-12 bg-white rounded-2xl border-2 border-green-200 shadow-lg">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-[#ccff00] rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl font-brattons text-black mb-3">Message Sent!</h3>
                                        <p className="text-gray-600 font-poppins mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-[#ccff00] font-poppins font-semibold hover:text-black transition-colors"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Name Input */}
                                        <div>
                                            <label className="block font-poppins font-medium text-black mb-1.5 text-xs">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your Name"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-poppins text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all duration-300"
                                            />
                                        </div>

                                        {/* Email Input */}
                                        <div>
                                            <label className="block font-poppins font-medium text-black mb-1.5 text-xs">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="youremail@example.com"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-poppins text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <div>
                                        <label className="block font-poppins font-medium text-black mb-1.5 text-xs">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (234) 567-8910"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg font-poppins text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all duration-300"
                                        />
                                    </div>

                                    {/* Subject Input */}
                                    <div>
                                        <label className="block font-poppins font-medium text-black mb-1.5 text-xs">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="Project Inquiry"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg font-poppins text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all duration-300"
                                        />
                                    </div>

                                    {/* Message Textarea */}
                                    <div>
                                        <label className="block font-poppins font-medium text-black mb-1.5 text-xs">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tell us about your project..."
                                            rows="4"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg font-poppins text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all duration-300 resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full group flex items-center justify-center gap-2 px-6 py-2 bg-black text-white font-poppins font-bold uppercase tracking-wider rounded-full hover:bg-[#ccff00] hover:text-black transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                                    >
                                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                        {!isSubmitting && <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                                    </button>

                                    {/* Privacy Note */}
                                    <p className="text-gray-500 font-poppins text-xs text-center text-[0.7rem]">
                                        We respect your privacy. Your information will only be used to contact you about your inquiry.
                                    </p>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-6">
                            Common Questions
                        </h2>
                        <p className="text-gray-600 font-poppins text-lg">
                            Can't find what you're looking for? Check our <a href="/#contact" className="text-[#ccff00] hover:text-black transition-colors font-semibold">FAQ page</a> for more info.
                        </p>
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

export default Contact;
