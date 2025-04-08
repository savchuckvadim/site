'use client'
import { Hero } from '@/modules/shared/slider';
import React from 'react';
import HomeHeroInfo from './components/HomeHeroInfo';
import HomeServices from './components/HomeServices';
import HomeLastProjects from './components/HomeLastProjects';
import { useProjects } from '@/modules/entities/Project';
import LoadingScreen from '@/modules/shared/LoadingScreen/ui/LoadingScreen';
import { AnimatedText, ScrollToTop } from '@/modules/shared';

const HomePage = () => {
    const { projects, loading, isFetched, error } = useProjects();
    let orderedProjects = projects
    let lastProjects = projects
    if (error) {
        return <p>Ошибка: {error}</p>;
    }
    if (projects && projects.length > 0) {
        orderedProjects = [...projects].sort((a, b) => a.order_number - b.order_number);
        lastProjects = [...projects].sort((a, b) => b.id - a.id);

    }

    return (<>
        {
            isFetched && !loading
                ? <>
                    <Hero image={orderedProjects[0]?.url} alt={'Home Hero image'}>
                        <HomeHeroInfo />
                    </Hero>
                    <HomeServices />
                    <HomeLastProjects projects={lastProjects} />
                </>
                : <LoadingScreen />
        }
        <ScrollToTop />
    </>

    );
}

export default HomePage;