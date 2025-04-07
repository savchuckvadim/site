'use client'

import { useProjectDetails } from '@/modules/entities/Project';
import { ScrollToTop } from '@/modules/shared';
import LoadingScreen from '@/modules/shared/LoadingScreen/ui/LoadingScreen';
import FullSlider from '@/modules/shared/slider/ui/FullSlider';
import React, { FC } from 'react';


const Details: FC<{ projectId: number }> = ({ projectId }) => {
    const { currentProject, loading, fetched, error } = useProjectDetails(projectId);


    if (error) {
        return <p className='mt-20 text-red'>Ошибка: {error}</p>;
    }

    return (<>
        {
            fetched && !loading && currentProject
                ? <FullSlider images={currentProject.project_details} withNames={false} oneTitle={currentProject?.title} />

                : <LoadingScreen />
        }
        <ScrollToTop />
    </>
    );
}

export default Details;