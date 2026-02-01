import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function FreshFruits({ fruitProducts, fruitSwiperRef, SectionTitle }) {
  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <SectionTitle icon="🍎" title="Fresh Fruits" sub="Seasonal &amp; exotic varieties" viewAll="#"/>
        <div ref={fruitSwiperRef} className="swiper">
          <div className="swiper-wrapper">
            {fruitProducts.map(p => (
              <div key={p.id} className="swiper-slide" style={{ width: 260 }}>
                <ProductCard product={p}/>
              </div>
            ))}
          </div>
          <button className="swiper-button-prev !w-9 !h-9 !bg-white !text-emerald-600 rounded-full shadow-md after:!text-sm !left-0"/>
          <button className="swiper-button-next !w-9 !h-9 !bg-white !text-emerald-600 rounded-full shadow-md after:!text-sm !right-0"/>
        </div>
      </section>
    </div>
  );
}
