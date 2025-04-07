'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/modules/entities/Project';
import { Button } from '@/components/ui/button';


interface PhotoGalleryProps {
  photos: Project[]
  // withNames: boolean
  // oneTitle: string
}
const PhotoGallery: FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  debugger
  return (
    <>


      <div className="relative w-full h-full overflow-hidden">
        {/* Плотная сетка изображений */}

        <div className="grid grid-cols-3 md:grid-cols-5 gap-0">
          {photos.map((photo, index) => (
            <div key={index} className="relative w-full h-48 cursor-pointer overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                onClick={() => setSelectedPhoto(photo.url)}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Модальное окно с изображением на весь экран */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.img
                src={selectedPhoto}
                alt="Full Screen"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="max-w-full max-h-full rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='w-full flex justify-center items-center m-1 mt-10 mb-10'>

        <Button variant={'default'} className='w-[300px] h-[50px]'>
          Call me now
        </Button>

      </div>
    </>

  );
};

export default PhotoGallery;
