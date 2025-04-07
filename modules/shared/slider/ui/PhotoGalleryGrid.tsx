'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/modules/entities/Project';
import { Button } from '@/components/ui/button';
import ModalPhone from '../../modal/ui/ModalPhone';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PhotoGalleryProps {
  photos: Project[];
}

const PhotoGallery: FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) => (Number(prevIndex) + 1) % photos.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        Number(prevIndex) - 1 < 0 ? photos.length - 1 : Number(prevIndex) - 1
      );
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    e.currentTarget.setAttribute('data-start-x', startX.toString());
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const startX = parseFloat(e.currentTarget.getAttribute('data-start-x') || '0');
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      handleSwipe(deltaX > 0 ? 'right' : 'left');
    }
  };

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-0">
          {photos.map((photo, index) => (
            <div key={index} className="relative w-full h-48 cursor-pointer overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                onClick={() => setSelectedIndex(index)}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            >
              <div
                className="absolute inset-0"
                onClick={handleClose}
              />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="relative  flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[selectedIndex]?.url}
                  alt="Full Screen"
                  className="max-w-full max-h-full object-contain rounded-lg max-w-[99vw] max-h-[99vh]"
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-2"
                >
                  <X className="w-6 h-6" />
                </button>
                {/* Navigation buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ModalPhone
        ButtonInit={
          <div className='w-full flex justify-center items-center m-1 mt-10 mb-10'>
            <Button variant={'default'} className='w-[300px] h-[50px]'>
              Call me now
            </Button>
          </div>
        }
      />
    </>
  );
};

export default PhotoGallery;
