'use client';

import Link from 'next/link';
import { FC } from 'react';


type Project = {
    id: number;
    url: string;
    title: string;
    description: string;
    order_number: number;
};


const ProjectGrid: FC<{ projects: Project[] }> = ({ projects }) => {


    return (
        <div className="w-full mt-10 flex justify-center">
            <div className="w-full md:w-3/4 lg:w-5/6">
                <h1 className="text-4xl ml-3 font-bold mb-8">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
                            <img
                                src={project.url}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <Link
                                    href={`/portfolio/${project.id}/details`}
                                >
                                    <h3 className="text-gray-900 cursor-pointer text-xl font-semibold mb-2">{project.title}</h3>
                                </Link>
                                <p className="text-gray-600">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ProjectGrid