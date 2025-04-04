'use client'
import { Project } from '@/modules/admin/entities/Project/type/project-type';
import React, { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


interface HomeLastProjectsProps {
    projects: Project[]
}
const HomeLastProjects: FC<HomeLastProjectsProps> = ({ projects }) => {
    const orderedProjects = projects.sort((a, b) => a.id - b.id)
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Получаем активный проект по индексу
    const activeProject = orderedProjects[activeIndex];

    return (
        <div className="relative bg-secondary w-full h-1/2 overflow-hidden p-1">
            <Link
                href='/portfolio'
            >
                <h1 className='text-5xl m-10 text-foreground text-center'>Projects</h1>
            </Link>
            <p className='text-xl mb-2 text-foreground text-center'>Last projects</p>
            <div className='flex flex-row flex-wrap justify-center items-center m-2 mb-10'>{
                projects
                    .filter((p, i) => i < 3)
                    .map(project => {
                        const itemDetailUrl = `portfolio/${project.id}/details`
                        return <Card key={`home_projects_card-${project.id}`} className="m-3 mb-0 bg-primary text-foreground shadow-md w-full max-w-md flex flex-col min-h-[300px] max-h-[500px]">
                            <Link href={itemDetailUrl} className="text-blue-500 underline">
                                <CardContent>
                                    <div className="relative rounded-lg  overflow-hidden p-4 w-full">
                                        <div className="relative overflow-hidden flex-shrink-0">

                                            <img src={project.url} alt={project.title} className="w-full h-48 object-cover rounded" />
                                        </div>
                                        <div className="p-2  overflow-hidden ">


                                            <h3 className="text-lg font-semibold mb-1">{project.title}</h3>

                                            {/* <p className="text-foreground max-h-48 overflow-y-auto break-words">{project.description}</p> */}
                                        </div>
                                    </div>

                                </CardContent>
                            </Link>
                        </Card>


                    })
            }
            </div>
            <div className='w-full flex justify-center items-center m-1 mb-10'>
                <Link
                    href='/portfolio'
                >
                    <Button variant={'default'} className='w-[300px] h-[50px]'>
                        All Projects
                    </Button>
                </Link>
            </div>
            <div className='p-0 flex flex-col'>
                <div className='w-full flex flex-row flex-wrap justify-center'>
                    {/* Слайдер с изображениями */}
                    <div className='w-1/2 min-w-[400px]'>
                        <Swiper
                            key={`home_projects_swiper`}
                            modules={[Navigation, Pagination, Thumbs, Autoplay]}
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev",
                            }}
                            pagination={{ clickable: true }}
                            thumbs={{ swiper: thumbsSwiper }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={orderedProjects.length > 1}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Обновляем индекс слайда
                            className="absolute inset-0 w-full h-full"
                        >
                            {orderedProjects.map((image, index) => (
                                <SwiperSlide key={`home_projects_swiper-${image.id}`}>
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
                                            priority
                                            placeholder="blur"
                                            blurDataURL="/vercel.svg"
                                            className="w-auto h-[500px]"
                                        />
                                        <div className="absolute bottom-0 left-0 bg-black/60 text-white p-4">
                                            {image.title}
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    {/* Данные текущего проекта */}
                    <div className='w-1/2 min-w-[400px] p-4 pt-0 flex flex-col justify-start items-start'>
                        <h2 className="text-2xl mb-5 font-bold">{activeProject?.title || 'No Title'}</h2>
                        <p className="text-sm text-foreground">{activeProject?.description || 'No Description'}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default HomeLastProjects;