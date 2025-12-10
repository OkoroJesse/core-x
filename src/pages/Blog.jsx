import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, Calendar, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FooterSection from '../components/FooterSection';
import BackToTop from '../components/BackToTop';
import WhatsAppFloat from '../components/WhatsAppFloat';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
    {
        id: 1,
        title: "The Future of Web Design: Brutalism Returns",
        category: "Design",
        date: "Oct 24, 2025",
        author: "Core X Team",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Why the raw, unpolished aesthetic is making a comeback in modern digital experiences.",
        content: "Web design has been soft and polished for years—rounded corners, smooth gradients, perfect UI. But in 2025, a bold trend is rising again: Brutalism.\n\nBrutalist web design embraces raw, unfiltered visuals. Think sharp edges, bold typography, simple layouts, and high contrast. It breaks away from the \"safe\" designs that all look the same, helping brands stand out instantly.\n\nWhy Brutalism Is Back\n\nPeople want something different from the typical clean UI. Pages load faster due to fewer graphics. It gives brands a strong, confident identity. Designers use it to show creativity in the AI era.\n\nModern Brutalism = Bold + Usable\n\nToday's brutalism (Neo-Brutalism) is cleaner, more structured, and still user-friendly. It mixes simplicity with attitude, making websites look modern, fast, and unforgettable.\n\nShould You Use It?\n\nChoose brutalism if you want a website that feels bold, edgy, and unique. It works especially well for creative agencies, tech startups, and personal brands.\n\nBrutalism isn't just a design trend—it's a statement."
    },
    {
        id: 2,
        title: "Optimizing React Performance for Scale",
        category: "Development",
        date: "Nov 12, 2025",
        author: "Core X Team",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Key strategies to keep your application fast and responsive as it grows in complexity.",
        content: "As React applications grow, performance can become a bottleneck. We explore advanced techniques like concurrent rendering, automatic batching, and effective use of useMemo and useCallback. We also dive into architecture patterns that decouple state management from UI components, ensuring that your app remains snappy even with thousands of components on screen."
    },
    {
        id: 3,
        title: "AI in Creative Workflows",
        category: "Technology",
        date: "Dec 05, 2025",
        author: "Core X Team",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        excerpt: "How generative AI is augmenting human creativity rather than replacing it.",
        content: "Generative AI tools are transforming how agencies work. From rapid prototyping to generating asset variations, AI is acting as a force multiplier for creative teams. However, the human touch remains essential for curation, strategy, and emotional resonance. We discuss how to integrate these tools ethically and effectively into your daily workflow."
    }
];

const BlogModal = ({ post, onClose }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            gsap.to(modalRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
            );
        }, modalRef);

        return () => {
            document.body.style.overflow = '';
            ctx.revert();
        };
    }, []);

    if (!post) return null;

    return createPortal(
        <div ref={modalRef} className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 opacity-0 backdrop-blur-sm">
            <div
                ref={contentRef}
                className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl rounded-2xl"
            >

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black text-white hover:bg-[#ccff00] hover:text-black transition-colors rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image */}
                <div className="h-64 md:h-80 w-full relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-[#ccff00] text-black px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                        {post.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 text-sm text-gray-500 mb-6 font-poppins">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-brattons mb-6 leading-tight text-black">{post.title}</h2>

                    <div className="prose max-w-none font-poppins text-gray-600 leading-relaxed text-base md:text-lg">
                        <p className="mb-4">{post.content}</p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const Blog = () => {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const blogGridRef = useRef(null);
    const pillsRef = useRef([]);
    const blogCardsRef = useRef([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [subscribeMessage, setSubscribeMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!subscribeEmail) {
            setSubscribeMessage('Please enter your email');
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '24081fbe-8e88-4c4f-bc82-a7c63fc7c77b',
                    email: subscribeEmail,
                    from_name: 'Core X Newsletter Subscriber'
                })
            });

            if (response.ok) {
                setSubscribeMessage('Thank you for subscribing!');
                setSubscribeEmail('');
                setTimeout(() => setSubscribeMessage(''), 3000);
            } else {
                setSubscribeMessage('Failed to subscribe. Please try again.');
            }
        } catch (error) {
            setSubscribeMessage('Error subscribing. Please try again.');
            console.error('Subscribe error:', error);
        }
    };

    const addToPills = (el) => {
        if (el && !pillsRef.current.includes(el)) {
            pillsRef.current.push(el);
        }
    };

    const addToCards = (el) => {
        if (el && !blogCardsRef.current.includes(el)) {
            blogCardsRef.current.push(el);
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

            // Blog Grid Animation
            if (blogGridRef.current) {
                gsap.from(blogCardsRef.current, {
                    scrollTrigger: {
                        trigger: blogGridRef.current,
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
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
                        alt="Blog background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-900/40 to-zinc-900/70"></div>
                </div>

                {/* Hero Content */}
                <div ref={heroContentRef} className="relative z-10 flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-20 md:pt-32 pb-16 md:pb-24">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 max-w-6xl">
                        <div className="flex-1 w-full">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-brattons leading-[1.3] tracking-wide mb-8 text-white space-y-4">
                                <div className="overflow-hidden">
                                    <span className="hero-line block">Insights &
                                        <span ref={addToPills} className="inline-block mx-4 px-8 py-1 bg-[#ccff00] text-black rounded-full transform -skew-x-6 origin-left">
                                            <span className="block transform skew-x-6">Stories</span>
                                        </span>
                                    </span>
                                </div>
                                <div className="overflow-hidden">
                                    <span className="hero-line block">From Our Team</span>
                                </div>
                            </h1>

                            <p className="hero-subtext text-gray-300 text-lg md:text-xl font-poppins leading-relaxed max-w-2xl">
                                Discover the latest trends, strategies, and insights from the world of digital innovation and design.
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
                                        Latest Articles •
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

            {/* Blog Grid Section */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="mb-20">
                        <span className="text-[#ccff00] font-poppins font-bold tracking-wider uppercase text-sm mb-4 block">
                            Latest Articles
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons font-bold text-black leading-tight mb-6">
                            Latest News & Updates
                        </h2>
                        <p className="text-gray-600 font-poppins text-lg max-w-2xl">
                            Stay informed with our latest articles, tips, and industry insights on web design, development, and digital strategy.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div ref={blogGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {blogPosts.map((post) => (
                            <div
                                key={post.id}
                                ref={addToCards}
                                className="group flex flex-col h-full bg-transparent cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 md:h-72 overflow-hidden rounded-2xl mb-6 md:mb-8 shadow-md group-hover:shadow-lg transition-all duration-500">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>

                                    <div className="absolute top-4 left-4 bg-[#ccff00] text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {post.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 text-xs text-gray-400 mb-4 font-poppins uppercase tracking-wide">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></span>
                                        <span className="flex items-center gap-2">
                                            <User className="w-3 h-3" />
                                            {post.author}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-brattons mb-4 leading-tight group-hover:text-[#ccff00] transition-colors duration-300">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-500 font-poppins text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Read More Link */}
                                    <button
                                        onClick={() => setSelectedPost(post)}
                                        className="inline-flex items-center gap-2 text-black font-poppins text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all duration-300 mt-auto w-fit"
                                    >
                                        Read More
                                        <ArrowUpRight className="w-4 h-4 text-[#ccff00]" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-black py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons text-white mb-6">
                        Stay Updated
                    </h2>
                    <p className="text-gray-300 font-poppins text-lg mb-12 max-w-2xl mx-auto">
                        Subscribe to our newsletter to get the latest articles, design tips, and industry insights delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={subscribeEmail}
                            onChange={(e) => setSubscribeEmail(e.target.value)}
                            className="flex-1 px-6 py-4 bg-white text-black rounded-xl font-poppins placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                        />
                        <button onClick={handleSubscribe} className="px-8 py-4 bg-[#ccff00] text-black rounded-xl font-poppins font-bold uppercase tracking-wider hover:bg-white transition-all duration-300">
                            Subscribe
                        </button>
                    </div>
                    {subscribeMessage && (
                        <p className="mt-4 text-center text-[#ccff00] font-poppins text-sm">
                            {subscribeMessage}
                        </p>
                    )}
                </div>
            </section>

            {/* Blog Modal */}
            {selectedPost && (
                <BlogModal
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}

            {/* Footer */}
            <FooterSection />
            <BackToTop />
            <WhatsAppFloat />

        </div>
    );
};

export default Blog;
