
import { AnimatedText } from '@/modules/shared';
import AnimatedItems from '@/modules/shared/animate/text/components/AnimatedItems';
import AnimatedItemsSmall from '@/modules/shared/animate/text/components/AnimatedItemsSmall';

import React from 'react';

const HomeServices = ({ }) => {
    return (
        <div className='pt-30'>
            <div className='h-14'></div>
            <AnimatedItems />
            <div className="bg-background w-full  overflow-hidden ">
                <AnimatedText />

            </div>
            {/* <div className='w-full flex justify-center items-cente mt-10  mb-10'>
                <Link
                    href='/about'
                >
                    <Button variant={'default'} className='w-[300px] h-[50px]'>
                        Services
                    </Button>
                </Link>
            </div> */}

        </div>
    );
}

export default HomeServices;