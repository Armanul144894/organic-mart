import React from "react";
import SectionTitle from "./SectionTitle";

export default function PopularBrand({ brands,brandSwiperRef }) {
  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <SectionTitle title="🏆 Top Brands" sub="Trusted by millions" />
        <div ref={brandSwiperRef} className="swiper">
          <div className="swiper-wrapper">
            {brands.map((b, i) => (
              <div key={i} className="swiper-slide" style={{ width: 180 }}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-24 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow"
                    style={{ background: b.bg }}
                  >
                    {b.name}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 mt-1.5">
                    {b.name} Foods
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
