'use client'

import { useProjects } from '@/modules/entities/Project';
import { HeroSlider, ScrollToTop } from '@/modules/shared';
import LoadingScreen from '@/modules/shared/LoadingScreen/ui/LoadingScreen';
import React from 'react';


const Portfolio = ({ }) => {
    const { projects, loading, isFetched, error } = useProjects();

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (<>
        {
            isFetched && !loading
                ? <HeroSlider images={projects} />

                : <LoadingScreen />
        }
        <ScrollToTop />
    </>
    );
}

export default Portfolio;