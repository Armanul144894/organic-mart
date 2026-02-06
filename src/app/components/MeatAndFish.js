
import React from "react";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

export default function MeatAndFish({ meatFishProducts, meatFishSwiperRef }) {
  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <SectionTitle
          icon="🥛"
          title="Meat & Fish"
          sub="Fresh Meat, Fish &amp;  more"
          viewAll="/products"
        />
        <div ref={meatFishSwiperRef} className="swiper">
          <div className="swiper-wrapper">
            {meatFishProducts.map((p) => (
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
