import {  Dot } from 'lucide-react';
import React from 'react';
import { motion } from "framer-motion";

const TypingLoader = () => (
    <div className="relative max-w-sm px-4 py-2 rounded-lg">
        <motion.div
            animate={{
                // scale: [1, 0, 0], // Анимация увеличения и уменьшения
            }}
            transition={{
                duration: 0.6, // Длительность анимации
                // repeat: Infinity, // Бесконечный повтор
                ease: "easeInOut", // Плавный эффект
            }}
        >
            <Dot className="w-3 h-3" />
        </motion.div>

    </div>

);

export default TypingLoader;