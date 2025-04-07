'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';

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

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

export default function ServicesPage() {
    return (
        <>

            <div className=" flex flex-wrap flex-row items-start justify-center mt-20  p-10 ">
                {services.map((service, index) => (
                    // <motion.div
                    //     key={service.title}
                    //     initial="hidden"
                    //     animate="visible"
                    //     // transition={{ duration: 0.5, delay: index * 0.2 }}
                    //     variants={cardVariants}
                    //     className="min-w-1/3 w-1/3 m-4"
                    // >
                    <Card className="h-72 min-w-1/3 w-1/3 m-4 shadow-xl hover:shadow-2xl transition-all">
                        <CardHeader className="text-center p-4 bg-gradient-to-r from-blue-500 to-pink-700 text-white rounded-t-lg">
                            <h2 className="text-2xl font-bold">{service.title}</h2>
                            <p className="text-lg mt-1">{service.price}</p>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-foreground text-justify">{service.description}</p>
                        </CardContent>
                    </Card>
                    // </motion.div>
                ))}
            </div>
            <div className='mt-13  w-full flex justify-center items-center m-1  mb-7'>

                <Button variant={'default'} className=' w-[300px] h-[50px]'>
                    Call me now
                </Button>
            </div>
        </>

    );
}
