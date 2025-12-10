import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, Calendar, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
    {
        id: 1,
        title: "The Future of Web Design: Brutalism Returns",
        category: "Design",
        date: "Oct 24, 2025",
        author: "Alex Morgan",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Why the raw, unpolished aesthetic is making a comeback in modern digital experiences.",
        content: "Web design has been soft and polished for years—rounded corners, smooth gradients, perfect UI. But in 2025, a bold trend is rising again: Brutalism.\n\nBrutalist web design embraces raw, unfiltered visuals. Think sharp edges, bold typography, simple layouts, and high contrast. It breaks away from the \"safe\" designs that all look the same, helping brands stand out instantly.\n\nWhy Brutalism Is Back\n\nPeople want something different from the typical clean UI. Pages load faster due to fewer graphics. It gives brands a strong, confident identity. Designers use it to show creativity in the AI era.\n\nModern Brutalism = Bold + Usable\n\nToday's brutalism (Neo-Brutalism) is cleaner, more structured, and still user-friendly. It mixes simplicity with attitude, making websites look modern, fast, and unforgettable.\n\nShould You Use It?\n\nChoose brutalism if you want a website that feels bold, edgy, and unique. It works especially well for creative agencies, tech startups, and personal brands.\n\nBrutalism isn't just a design trend—it's a statement."
    },
    {
        id: 2,
        title: "Optimizing React Performance for Scale",
        category: "Development",
        date: "Nov 12, 2025",
        author: "Sarah Jenkins",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Key strategies to keep your application fast and responsive as it grows in complexity.",
        content: "As React applications grow, performance can become a bottleneck. We explore advanced techniques like concurrent rendering, automatic batching, and effective use of useMemo and useCallback. We also dive into architecture patterns that decouple state management from UI components, ensuring that your app remains snappy even with thousands of components on screen."
    },
    {
        id: 3,
        title: "AI in Creative Workflows",
        category: "Technology",
        date: "Dec 05, 2025",
        author: "Marcus Chen",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        excerpt: "How generative AI is augmenting human creativity rather than replacing it.",
        content: "Generative AI tools are transforming how agencies work. From rapid prototyping to generating asset variations, AI is acting as a force multiplier for creative teams. However, the human touch remains essential for curation, strategy, and emotional resonance. We discuss how to integrate these tools ethically and effectively into your daily workflow."
    }
];

const BlogModal = ({ post, onClose }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Lock scroll when modal opens
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

        // Cleanup: Unlock scroll and revert animations
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
                className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl rounded-none"
            >

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black text-white hover:bg-[#ccff00] hover:text-black transition-colors rounded-none"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image */}
                <div className="h-64 md:h-80 w-full relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-[#ccff00] text-black px-4 py-1 text-xs font-bold uppercase tracking-wider">
                        {post.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 font-poppins">
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

                    <div className="prose max-w-none font-poppins text-gray-600 leading-relaxed">
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const BlogSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const underlineRef = useRef(null);
    const cardsRef = useRef([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Header Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                }
            });

            tl.from(headerRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            })
                .from(underlineRef.current, {
                    scaleX: 0,
                    transformOrigin: "left center",
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.5");

            // Cards Animation
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToCards = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} id="blog" className="w-full bg-white py-24 px-6 md:px-12 lg:px-20 text-black relative z-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-24 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-light leading-tight mb-4 tracking-tight">
                        Stay Updated On
                    </h2>
                    <div className="relative inline-block">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-brattons font-bold leading-tight relative z-10 px-2">
                            The Latest News
                        </h2>
                        <span
                            ref={underlineRef}
                            className="absolute bottom-2 left-0 w-full h-4 bg-[#ccff00] -z-0 transform -skew-x-6 opacity-80"
                        ></span>
                    </div>
                    <p className="mt-8 text-gray-500 font-poppins text-lg leading-relaxed max-w-2xl mx-auto">
                        Discover the latest trends, strategies, and insights from the world of digital innovation and design.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            ref={addToCards}
                            className="group flex flex-col h-full bg-transparent cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden rounded-xl mb-8 shadow-md group-hover:shadow-xl transition-all duration-500">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>

                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow px-2">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-poppins uppercase tracking-wide">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="flex items-center gap-2">
                                        <User className="w-3 h-3" />
                                        {post.author}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-brattons mb-4 leading-tight group-hover:text-[#8cb300] transition-colors duration-300">
                                    {post.title}
                                </h3>

                                <p className="text-gray-500 font-poppins text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Read More Link */}
                                <button
                                    onClick={() => setSelectedPost(post)}
                                    className="inline-flex items-center gap-2 text-black font-poppins text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all duration-300 mt-auto w-fit"
                                >
                                    Read More
                                    <ArrowUpRight className="w-4 h-4 text-[#8cb300]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal */}
            {selectedPost && (
                <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </section>
    );
};

export default BlogSection;
