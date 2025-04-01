'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './loading.css';

const LoadingScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // 3 секунды прелоадер

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="loading-screen"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <div className="center-spinner">
                        <div className="spinner"></div>
                    </div>

                    <motion.div
                        className="horizontal-line"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    />

                    {/* Верхняя половина */}
                    <motion.div
                        className="reveal-top"
                        initial={{ y: 0 }}
                        animate={{ y: '-100%' }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
                    ></motion.div>

                    {/* Нижняя половина */}
                    <motion.div
                        className="reveal-bottom"
                        initial={{ y: 0 }}
                        animate={{ y: '100%' }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
                    ></motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;






      {/* <Script
                id="pace"
                strategy="beforeInteractive"
                src="/assets/js/pace.min.js"
            /> */}