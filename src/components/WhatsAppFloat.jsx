import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
    const whatsappNumber = '2348140695734'; // Your WhatsApp number
    const whatsappMessage = 'Hello! I am interested in your services.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-8 z-40 w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            aria-label="Chat with us on WhatsApp"
        >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </a>
    );
};

export default WhatsAppFloat;
