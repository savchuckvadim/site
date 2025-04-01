'use client';


import { Project } from '@/modules/admin/widgetes/portfolio/ui/Portfolio';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';





export default function Hero({ image }: { image: Project }) {

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
                        src={image.url}
                        alt={image.title}
                        width={1920}
                        height={1080}
                        priority // Приоритетная загрузка
                        placeholder="blur" // Плавное появление
                        blurDataURL="/vercel.svg" // Путь к картинке-заглушке
                        className="w-full h-full object-cover  "
                    />

                </div>
                <div className='absolute inset-20  h-2/3 flex flex-col justify-center items-start'>
                    <div className='home-hero-information-block w-xs  py-4 flex flex-col  p-3 justify-center items-start'>
                        <h1 className='text-4xl font-extrabold'>Elegant and Unique Design</h1>
                        <p className='mt-2'>Right design and right ideas matter a lot of in interior design business. </p>
                        <Link
                            href="/portfolio"
                        >
                            <Button
                                className='mt-4 bg-white'
                                variant={'secondary'}
                            >
                                Read More
                            </Button>
                        </Link>

                    </div>

                </div>



            </div>

        </>
    );
}
