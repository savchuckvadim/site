'use client'

import { ScrollToTop } from '@/modules/shared';
import ModalPhone from '@/modules/shared/modal/ui/ModalPhone';
import { useState } from 'react';

const services = [
    {
        title: 'Spatial Planning Solution',
        price: '20 EUR per square meter',
        description: 'We provide a comprehensive spatial planning service, ensuring the most efficient use of space. Our team will analyze the specific needs of the project and create a functional layout that optimizes flow and comfort.',
    },
    {
        title: 'Drawings and Visualization',
        price: '35 EUR per square meter',
        description: 'Our service includes detailed technical drawings and high-quality visualizations to bring your project to life. Whether you’re working on a residential or commercial space, we ensure that every detail is meticulously planned and visually represented.',
    },
    {
        title: 'Complete Package for Technical Realization',
        price: '1,000 EUR per month',
        description: 'This package includes all the necessary drawings for the technical realization of your project, along with ongoing architectural supervision. We also coordinate and manage all required contractors to ensure smooth execution and timely delivery.',
    },
];

// const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
// };

export default function ServicesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="p-10 w-full mt-10 flex justify-center items-center">
                <div className="w-full md:w-3/4 lg:w-5/6">
                    <h1 className="text-center w-full text-4xl ml-3 font-bold mb-8">Services</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                        {services.map((service, index) => (
                            <div
                                onClick={handleCardClick}
                                key={service.title}
                                className={`bg-secondary cursor-pointer rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform 
                                ${index === services.length - 1 && services.length % 2 !== 0 ? 'col-span-2 md:col-span-1 md:mx-auto' : ''}`}
                                // style={{ maxWidth: index === services.length - 1 && services.length % 2 !== 0 ? '50%' : 'auto' }}
                            >
                                <div className="p-4">
                                    <h3 className="text-accent-foreground text-bold cursor-pointer text-xl font-semibold mb-2">{service.title}</h3>
                                    <p className="text-bold text-lg text-primary mt-1">{service.price}</p>
                                    <p className="text-accent-foreground">{service.description}</p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Modal Component */}
                <ModalPhone isOpen={isModalOpen} onClose={closeModal} />
            </div>
            <ScrollToTop />
        </>
    );
}
