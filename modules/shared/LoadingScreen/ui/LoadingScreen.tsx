'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './loading.css';
import { Rabbit } from 'lucide-react';
import ScaleLoader from "react-spinners/ScaleLoader";
const LoadingScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // 3 секунды прелоадер

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-background">
            {isVisible &&

                (
                    <motion.div
                        className="loading-screen bg-background"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <div className="center-spinner color-primary flex flex-col justify-center items-center">
                            {/* <div className="spinner color-primary"></div>
                         */}
                            <Rabbit size={50} />
                            <ScaleLoader
                                className='mt-3 color-foreground'
                                height={5}
                                width={12}
                                // color='foreground'
                            />
                        </div>

                        {/* <motion.div
                        className="horizontal-line"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 0.8 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    /> */}
                        {/* <Rabbit size={55} />
                        <p className='mt-10'>Loading...</p> */}
                        {/* Верхняя половина */}
                        <motion.div
                            className="reveal-top bg-background"
                            initial={{ y: 0 }}
                            animate={{ y: '-100%' }}
                            exit={{ y: '-100%' }}
                            transition={{ duration: 0.8, delay: 1, ease: 'easeInOut' }}
                        ></motion.div>


                        <motion.div
                            className="reveal-bottom bg-background"
                            initial={{ y: 0 }}
                            animate={{ y: '100%' }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 0.8, delay: 1, ease: 'easeInOut' }}
                        ></motion.div>
                    </motion.div>
                )}
        </div>
    );
};

export default LoadingScreen;






{/* <Script
                id="pace"
                strategy="beforeInteractive"
                src="/assets/js/pace.min.js"
            /> */}