import React from 'react';
import { Send } from 'lucide-react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-3 font-poppins font-bold uppercase tracking-wider transition-all duration-300 rounded-full';
  
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  const variants = {
    primary: 'bg-black text-white hover:bg-[#ccff00] hover:text-black group',
    secondary: 'border-2 border-white text-white bg-transparent hover:bg-white hover:text-black group',
    accent: 'bg-[#ccff00] text-black hover:bg-white group'
  };

  return (
    <button className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
    </button>
  );
};

export default Button;
