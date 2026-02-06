import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import CategoryCard from "./CategoryCard";
import SectionTitle from "./SectionTitle";

export default function CategorySlider({ categories,categorySwiperRef }) {
  return (
    <section className="container mx-auto px-4 py-7">
      <SectionTitle
        title="Shop by Category"
        sub="Browse our fresh collections"
        viewAll="#"
      />

      <div ref={categorySwiperRef} className="swiper">
                <div className="swiper-wrapper">
                  {categories.map(cat => (
                    <div key={cat.id} className="swiper-slide" style={{ width: 260 }}>
                      <CategoryCard cat={cat}/>
                    </div>
                  ))}
                </div>
                <button className="swiper-button-prev !w-9 !h-9 !bg-white !text-emerald-600 rounded-full shadow-md after:!text-sm !left-0"/>
                <button className="swiper-button-next !w-9 !h-9 !bg-white !text-emerald-600 rounded-full shadow-md after:!text-sm !right-0"/>
              </div>
    </section>
  );
}
