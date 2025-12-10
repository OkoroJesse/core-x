import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call - replace with actual email service
        setTimeout(() => {
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
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email",
            value: "hello.corex@gmail.com",
            href: "mailto:hello.coreX@gmail.com"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            label: "Phone",
            value: "+234 (816) 332-1478",
            href: "tel:+234 8163 321478"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            label: "Location",
            value: "Abuja",
            href: "#"
        }
    ];

    return (
        <section ref={sectionRef} id="contact" className="w-full bg-white py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Contact Info */}
                    <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-start">
                        <div>
                            <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                                Get In Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-6">
                                Let's Start <br /> Something Great
                            </h2>
                            <p className="text-gray-600 font-poppins text-lg leading-relaxed mb-8">
                                Have a project in mind? We'd love to hear about it. Get in touch with us and let's create something amazing together.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-2 mt-6">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.href}
                                    className="group p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-200 hover:border-[#ccff00] hover:bg-yellow-50/30 shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-poppins font-bold text-black text-sm md:text-base">
                                                {info.label}
                                            </h4>
                                            <p className="font-poppins text-gray-600 text-xs md:text-sm">
                                                {info.value}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-gray-600 font-poppins text-sm mb-4">Follow us</p>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div ref={rightColRef} className="lg:col-span-7">
                        {submitted ? (
                            <div className="h-full flex items-center justify-center p-12 bg-green-50 rounded-2xl border border-green-200">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#ccff00] rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-brattons text-black mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 font-poppins">Thanks for reaching out. We'll get back to you soon.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
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
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg font-poppins text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all duration-300"
                                    />
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
                                        placeholder="+1 (555) 000-0000"
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
                                        placeholder="Tell us more about your project..."
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg font-poppins text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all duration-300 resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full group flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white font-poppins font-medium text-sm rounded-lg hover:bg-[#ccff00] hover:text-black transition-all duration-300 mt-4 disabled:opacity-70"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    {!isSubmitting && <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                                </button>

                                {/* Privacy Note */}
                                <p className="text-gray-500 font-poppins text-[10px] text-center mt-3">
                                    We respect your privacy. Your information will only be used to contact you about your inquiry.
                                </p>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;
