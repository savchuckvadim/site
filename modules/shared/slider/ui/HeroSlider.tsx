'use client';

import { useState } from 'react';
import './HeroSlider.css'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Project } from '@/modules/admin/widgetes/portfolio/ui/Portfolio';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectGrid from './ProjectGrid';
import Image from 'next/image';


type Image = Project

// const baseUrl = '/api/projects';

export default function HeroSlider({ images }: { images: Project[] }) {
    // const [images, setImages] = useState<Image[]>([]);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);


    if (images.length === 0) {
        return <p className="text-center text-gray-500">...</p>;
    }

    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">
                {/* Основной слайдер */}
                <Swiper
                    key={`hero_swiper`}
                    modules={[Navigation, Pagination, Thumbs, Autoplay]}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    pagination={{ clickable: true }}
                    thumbs={{ swiper: thumbsSwiper }}
                    autoplay={{
                        delay: 3000,     // Задержка между слайдами (в миллисекундах)
                        disableOnInteraction: false,  // Не останавливать при взаимодействии
                    }}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={images.length > 1}
                    className="absolute inset-0 w-full h-full"
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={image.url}
                                    alt={image.title}
                                    width={1920}
                                    height={1080}
                                    priority // Приоритетная загрузка
                                    placeholder="blur" // Плавное появление
                                    blurDataURL="/volkov.svg" // Путь к картинке-заглушке
                                    className="w-full h-full object-cover"
                                />
                                {/* <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover"
                                /> */}
                                <div className="absolute bottom-0 left-0 bg-black/60 text-white p-4">
                                    {image.title}
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                    <div className="custom-prev absolute top-1/2 -translate-y-1/2 left-2 z-10 p-2 bg-black/50 rounded-full cursor-pointer">
                        <ChevronLeft className="text-white w-6 h-6" />
                    </div>
                    <div className="custom-next absolute top-1/2 -translate-y-1/2 right-2 z-10 p-2 bg-black/50 rounded-full cursor-pointer">
                        <ChevronRight className="text-white w-6 h-6" />
                    </div>
                </Swiper>

                {/* Слайдер-превью */}
                {/* Слайдер-превью */}
                <Swiper
                    modules={[Navigation, Thumbs, Mousewheel]}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={7}
                    watchSlidesProgress
                    mousewheel={{ forceToAxis: true }}

                    className="absolute swiper-custom-thumb left-1/2 transform -translate-x-1/2 w-[90%] p-2 bg-black/40 backdrop-blur rounded-lg"
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id} className="h-full flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="overflow-hidden rounded-md cursor-pointer"
                            >
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
            <ProjectGrid projects={images} />
        </>
    );
}
