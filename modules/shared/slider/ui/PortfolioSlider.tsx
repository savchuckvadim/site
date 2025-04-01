'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Импорт Swiper и нужных модулей
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Image = {
  id: number;
  url: string;
  caption: string;
};

const baseUrl = '/api/portfolio/gallery';

export default function PortfolioSlider() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(baseUrl);
        setImages(response.data);
      } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
      }
    };
    fetchImages();
  }, []);

  if (images.length === 0) {
    return <p className="text-center text-gray-500">Загрузка изображений...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Swiper
        key={`protfolio_swiper`}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={images.length > 1} 
        className="rounded-lg shadow-xl"
      >
        {images.map((image) => (
          <SwiperSlide key={`protfolio_${image.id}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 bg-black/60 text-white p-2 rounded-br-lg">
                {image.caption}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
