'use client';
import Image from 'next/image';
import { ReactNode } from 'react';


interface HeroProps {
    image: string;
    alt: string;
    children: ReactNode;
}


export default function Hero({ image, alt, children }: HeroProps) {

    if (!image) {
        return <p className="text-center text-gray-500">...</p>;
    }

    return (
        <>
            <div className="relative bg-fixed w-full h-screen overflow-hidden ">
                {/* Основной слайдер */}
                <div
                    key={`hero`}

                    className="absolute inset-0 w-full h-full "
                >
                    <Image
                        src={image}
                        alt={alt}
                        width={1920}
                        height={1080}
                        priority // Приоритетная загрузка
                        placeholder="blur" // Плавное появление
                        blurDataURL="/volkov.svg" // Путь к картинке-заглушке
                        className="w-full h-full object-cover  "
                    />

                </div>
                <div className='absolute inset-20  h-2/3 flex flex-col justify-center items-start'>
                  
                    {children}
                </div>



            </div>

        </>
    );
}
