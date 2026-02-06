'use client';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from './ProductCard';

export default function RelatedProduct({ relatedProducts }) {


  return (
    <div className="w-full py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Related Products
      </h2>

      {/* Slider Wrapper (IMPORTANT) */}
      <div className="relative w-full max-w-full overflow-hidden">
        {/* Navigation buttons */}
        <button
          className="cat-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          className="cat-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".cat-prev",
            nextEl: ".cat-next",
          }}
          spaceBetween={16}
          slidesPerView={1}
          speed={2000}
          observer
          observeParents
          watchOverflow
          breakpoints={{
            380: { slidesPerView: 1.5 },
            540: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1380: { slidesPerView: 4 },
            // Desktop (1536px)
            1536: {
              slidesPerView: 5.5,
              spaceBetween: 24,
            },
          }}
          className="w-full max-w-full"
        >
          {relatedProducts?.map((item) => (
            <SwiperSlide key={item?.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <Link href={`/${item?.slug}`}>
                <ProductCard product={item}/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div >
    </div >
  );
};
