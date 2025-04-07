
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import AnimatedItemsSmall from './components/AnimatedItemsSmall';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ModalPhone from '../../modal/ui/ModalPhone';

gsap.registerPlugin(ScrollTrigger);

export default function CoolText() {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
                    duration: 2.5,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: {
                        trigger: text,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1,
                        onEnter: () => {
                            gsap.to(letters, {
                                y: 0,
                                opacity: 1,
                                rotate: 0,
                                delay: 1, // Пауза после появления
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
    const text = 'Efficient & ergonomic design'
    const descriptionFirst = 'Your vision is brought to life by our in-house team of professionals. We manage the full construction/renovation process from concept, budgeting and purchasing of materials to lighting, heating and furniture installation. Our pool of suppliers, vendors and manufacturers provide us with discounts which allow significant budget cuts. '
    // Разделяем текст на буквы для индивидуальной анимации
    const animatedText = text.split("").map((char, index) => (
        <span key={index} className="letter inline-block">
            {char === " " ? "\u00A0" : char}
        </span>
    ));

    return (
        <div>
            <div className='w-full flex justify-center items-center m-1 mt-10 mb-10'>
              
                    <ModalPhone
                        ButtonInit={
                            <div className='w-full flex justify-center items-center m-1 mt-10 mb-10'>
                                <Button variant={'default'} className='w-[300px] h-[50px]'>
                                    Call me now
                                </Button>
                            </div>
                        }
                    />
                    {/* <Button variant={'default'} className='w-[300px] h-[50px]'>
                        get
                    </Button> */}
            
            </div>
            <div className='flex flex-col md:flex-row h-[500px] '>
                <div className="h-full 
                w-full 
                md:w-1/2  
                text-white 
                flex 
                flex-col 
                items-center 
                justify-center 
                p-10">
                    <h1 className='text-3xl mb-10 text-accent-foreground'>
                        From Idea to Reality
                    </h1>
                    <p className='text-accent-foreground'>
                        Your vision is brought to life by our in-house team of professionals. We manage the full construction/renovation process from concept, budgeting and purchasing of materials to lighting, heating and furniture installation. Our pool of suppliers, vendors and manufacturers provide us with discounts which allow significant budget cuts.
                    </p>
                </div>
                <div className="h-full w-1/2 bg-background text-white hidden md:flex flex-col items-center justify-center p-10">
                    {/* <div className='w-1/2'> */}
                    <Image
                        src="/feat.jpg"
                        alt="Image 3"
                        className="w-full h-full object-cover"
                        height={1280}
                        width={1920}
                    />
                    {/* </div> */}
                </div>
            </div>
            <div className="h-full w-full p-5  flex flex-col md:flex-row  flex-wrap items-center justify-center mb-10 pt-20">
                <div className='w-full  md:w-1/2 p-5'>
                    <div
                        ref={textRef}
                        className="text-5xl text-primary font-bold "
                    >

                        <p>
                            {animatedText}
                        </p>
                    </div>


                </div>
                <div className='w-full  md:w-1/2 p-5'>
                    <p >
                        {descriptionFirst}
                    </p>
                </div>
            </div>


            <AnimatedItemsSmall />
        </div>
    );
}