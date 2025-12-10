import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ isDark = false }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Close menu when location changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // Handle body overflow when menu opens/closes
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    const handleMenuLinkClick = (href) => {
        // Scroll to top
        window.scrollTo(0, 0);
        // Navigate first
        navigate(href);
        // Close menu after a brief delay to allow animation
        setTimeout(() => {
            setIsMobileMenuOpen(false);
        }, 50);
    };

    const bgClass = isDark 
        ? scrolled ? 'bg-zinc-900/90 backdrop-blur-md' : 'bg-transparent'
        : scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent';
    
    const textClass = isDark ? 'text-white' : 'text-black';
    const hoverClass = 'hover:text-[#ccff00]';

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Projects', href: '/projects' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgClass} ${scrolled ? 'py-4' : 'py-6'}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 bg-[#ccff00] rounded-full flex items-center justify-center text-black font-bold text-xl">
                            C
                        </div>
                        <span className={`text-2xl font-bold font-poppins tracking-tight ${textClass}`}>Core X</span>
                    </a>

                    <div className={`hidden md:flex items-center gap-8 font-poppins text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <a href="/" className={`${hoverClass} transition-colors`}>Home</a>
                        <a href="/about" className={`${hoverClass} transition-colors`}>About Us</a>
                        <a href="/services" className={`${hoverClass} transition-colors`}>Services</a>
                        <a href="/projects" className={`${hoverClass} transition-colors`}>Projects</a>
                        <a href="/blog" className={`${hoverClass} transition-colors`}>Blog</a>
                        <a href="/contact" className={`${hoverClass} transition-colors`}>Contact</a>
                    </div>

                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden focus:outline-none">
                        {isMobileMenuOpen ? (
                            <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'} transition-colors`} />
                        ) : (
                            <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'} transition-colors`} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 top-0 md:hidden z-40 bg-zinc-900/95 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div 
                className={`fixed top-0 left-0 right-0 bottom-0 md:hidden z-40 bg-zinc-900 flex flex-col items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="space-y-8 text-center">
                    {menuItems.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => handleMenuLinkClick(item.href)}
                            className={`block text-3xl font-poppins font-bold text-white hover:text-[#ccff00] transition-colors active:text-[#ccff00]`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;
