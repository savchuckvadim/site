import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const HomeHeroInfo = ({ }) => {
    return (
        <div className='home-hero-information-block w-xs  py-4 flex flex-col  p-5 justify-center items-start'>
            <h1 className='text-4xl font-extrabold text-white'>Elegant and Unique Design</h1>
            <p className='mt-2  text-white'>Right design and right ideas matter a lot of in interior design business. </p>
            <Link
                href="/portfolio"
            >
                <Button
                    className='mt-4 w-3xs h-3xs'
                    variant={'secondary'}
                >
                    Read More
                </Button>
            </Link>

        </div>
    );
}

export default HomeHeroInfo;