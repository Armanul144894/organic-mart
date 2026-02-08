import React from "react";
import SectionTitle from "./SectionTitle";
import Link from "next/link";

export default function PopularBrand({ brands, brandSwiperRef }) {
  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <SectionTitle title="🏆 Top Brands" sub="Trusted by millions" viewAll={'/brands'}/>
        <div ref={brandSwiperRef} className="swiper">
          <div className="swiper-wrapper">
            {brands.map((brand, i) => (
              <div key={i} className="swiper-slide" style={{ width: 180 }}>
                <Link
                  key={brand.slug}
                  href={`/${brand.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-40 flex flex-col items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    {/* Brand Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg mb-3 group-hover:scale-110 transition-transform"
                      style={{ background: brand.color }}
                    >
                      {brand.name.charAt(0)}
                    </div>

                    {/* Brand Name */}
                    <h3 className="text-sm font-bold text-gray-800 text-center line-clamp-2 mb-1">
                      {brand.name}
                    </h3>

                    {/* Product Count */}
                    <span className="text-xs text-gray-500 font-medium">
                      {brand.productCount}{" "}
                      {brand.productCount === 1 ? "product" : "products"}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
