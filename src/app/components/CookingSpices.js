import React from 'react'
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';

export default function CookingSpices({cookingProducts, cookingSwiperRef}) {
  return (
      <div>
        <section className="container mx-auto px-4 py-6">
          <SectionTitle
            icon="🌶️"
            title="Cooking & Spices"
            sub="Premium quality ingredients"
            viewAll="cooking-and-spices"
          />
          <div ref={cookingSwiperRef} className="swiper">
            <div className="swiper-wrapper">
              {cookingProducts.map((p) => (
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
