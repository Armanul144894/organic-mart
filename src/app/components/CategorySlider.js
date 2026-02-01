import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import CategoryCard from "./CategoryCard";

export default function CategorySlider({ categories, SectionTitle }) {
  return (
    <section className="container mx-auto px-4 py-7">
      <SectionTitle
        title="Shop by Category"
        sub="Browse our fresh collections"
        viewAll="#"
      />

      <div className="relative">
        {/* Prev */}
        <button className="cat-prev absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white text-emerald-600 rounded-full shadow-md flex items-center justify-center hover:bg-emerald-50">
          <ChevronLeft size={18} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={14}
          navigation={{
            prevEl: ".cat-prev",
            nextEl: ".cat-next",
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <CategoryCard cat={cat}/>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next */}
        <button className="cat-next absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white text-emerald-600 rounded-full shadow-md flex items-center justify-center hover:bg-emerald-50">
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
