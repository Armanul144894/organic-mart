
import React from "react";
import ProductCard from "./ProductCard";

export default function DairyProducts({ dairyProducts, dairySwiperRef, SectionTitle }) {
  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <SectionTitle
          icon="🥛"
          title="Dairy Products"
          sub="Fresh milk, cheese &amp;  more"
          viewAll="#"
        />
        <div ref={dairySwiperRef} className="swiper">
          <div className="swiper-wrapper">
            {dairyProducts.map((p) => (
              <div key={p.id} className="swiper-slide" style={{ width: 260 }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <button className="swiper-button-prev !w-9 !h-9 !bg-white !text-emerald-600 rounded-full shadow-md after:!text-sm !left-0" />
          <button className="swiper-button-next !w-9 !h-9 !bg-white !text-emerald-600 rounded-full shadow-md after:!text-sm !right-0" />
        </div>
      </section>
    </div>
  );
}
