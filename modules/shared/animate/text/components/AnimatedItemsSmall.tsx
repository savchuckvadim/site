'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const data = [
    {
        title: 'design process',
        description: 'Our team adapts to your schedule and set calls and meetings in order to understand your expectations. Throughout the concept stage we use 3D-modeling for you to visualize your future home and for us to better understand your needs. ',

    },
    {
        title: 'Budget planning',
        description: 'A detailed estimate of costs is provided for your approval. We work closely with many suppliers and manufacturers around Europe: European quality standards as well as competitive prices are guaranteed. ',
    },
    {
        title: 'Supervision ',
        description: 'The works are constantly supervised by our designer and the foreman to make sure the concept is followed thoroughly. We value your and our time, so the process is planned efficiently and there are no gaps between construction stages. ',
    },
    {
        title: 'Build a home for you',
        description: 'We take care of the final touches: furniture and appliance installation is in our hands. You simply have to come and live in your new home. ',
    }
]



gsap.registerPlugin(ScrollTrigger);

const smallData = [
    {
        title: '3D Modeling',
        description: 'Immerse yourself in your future home right from the beginning.',
    },
    {
        title: 'Purchasing & installation',
        description: 'You only need to work with one team for all steps of the way.',
    },
    {
        title: 'Customer Success service',
        description: 'We always stay in touch so that the renovation experience is peaceful for you.',
    },
];

const AnimatedItemsSmall = () => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        cardRefs.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(
                    card,
                    { y: 10, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.2,
                        ease: 'power3.out',
                        delay: index * 0.3, // задержка между карточками
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            end: 'top 30%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row lg:items-start items-center justify-between gap-6 p-4">
            {smallData.map((item, index) => (
                <div
                    key={item.title}
                    ref={(el) => {
                        if (el) cardRefs.current[index] = el;
                    }}
                    className="h-48 flex flex-col items-start w-full md:w-4/5 p-6 bg-white shadow-lg rounded-lg transform transition-all duration-500"
                >
                    <h3 className="w-full text-center text-xl text-gray-900 font-bold mt-5 mb-2">{item.title}</h3>
                    <p className="text-gray-900">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default AnimatedItemsSmall;
