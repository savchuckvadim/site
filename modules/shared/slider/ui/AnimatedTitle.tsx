import React, { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle: FC<{ title: string }> = ({ title }) => {

    const animatedText = title.split("").map((char, index) => (
        <span key={index} className="letter inline-block">
            {char === " " ? "\u00A0" : char}
        </span>
    ));
    const textRef = useRef<HTMLDivElement>(null);

    useEffect
        (() => {
            const text = textRef.current;
            if (text) {
                const letters = text.querySelectorAll('.letter');

                // Стартовая анимация - появление букв с паузой
                gsap.fromTo(
                    letters,
                    { y: 50, opacity: 0, rotate: -30 },
                    {
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        stagger: 0.05,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: {
                            trigger: text,
                            start: 'top 120%',
                            end: 'top 30%',
                            scrub: 1,
                            onEnter: () => {
                                gsap.to(letters, {
                                    y: 0,
                                    opacity: 1,
                                    rotate: 0,
                                    delay: 0, // Пауза после появления
                                    duration: 0.5,
                                    ease: 'power1.inOut',
                                });
                            },
                        },
                    }
                );

                // Анимация при уходе вверх - улетает вверх с вращением
                // gsap.to(letters, {
                //     y: -20,
                //     opacity: 0,
                //     rotate: 30,
                //     stagger: 0.05,
                //     duration: 1.2,
                //     ease: 'power3.in',
                //     scrollTrigger: {
                //         trigger: text,
                //         start: 'top 100%',
                //         end: 'top 10%',
                //         scrub: 1,
                //     },
                // });
            }
        }, []);
    return (
        <div className='w-full h-24 bg-background  flex justify-center items-center p-5'>
            <div
                ref={textRef}
                className="text-5xl text-primary font-bold "
            >
                <h1 className=''>{animatedText}</h1>
            </div>
        </div>
    );
}

export default AnimatedTitle;