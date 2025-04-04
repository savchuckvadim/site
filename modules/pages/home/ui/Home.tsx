import { Hero } from '@/modules/shared/slider';
import React from 'react';
import HomeHeroInfo from './components/HomeHeroInfo';
import HomeServices from './components/HomeServices';
import HomeLastProjects from './components/HomeLastProjects';
import { Project } from '@/modules/admin/entities/Project/type/project-type';

interface HeroProps {
    url: string
    projects: Project[]
}
const HomePage = ({ url, projects }: HeroProps) => {
    return (<>
        <Hero image={url} alt={'Home Hero image'}>
            <HomeHeroInfo />
        </Hero>
        <HomeServices />
        <HomeLastProjects projects={projects} />

    </>

    );
}

export default HomePage;