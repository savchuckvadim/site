'use client'
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const ScrollToTop = ({ }) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            // Показываем кнопку, если не докрутили до конца
            if (scrolled < maxScroll - 50) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <AnimatePresence>
            {showButton && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="w-[50px] h-[50px] fixed bottom-8 right-8 p-1 rounded-full  bg-opacity-40 hover:bg-opacity-100 transition-all shadow-lg"
                    aria-label="Back to top"
                >
                    <p className='text-primary text-bold text-3xl'>
                        ↑
                    </p>
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export default ScrollToTop;