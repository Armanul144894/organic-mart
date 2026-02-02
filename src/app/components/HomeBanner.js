import { ArrowRight, Flame } from 'lucide-react'
import React from 'react'

export default function HomeBanner({ heroSwiperRef, bannerSlides }) {
    return (
        <div>
            <section className="container mx-auto px-4 pt-5 pb-2">
                <div ref={heroSwiperRef} className="swiper rounded-2xl overflow-hidden" style={{ height: 380 }}>
                    <div className="swiper-wrapper">
                        {bannerSlides.map((slide, i) => (
                            <div
                                key={i}
                                className="swiper-slide relative"
                                style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                            >
                                {/* dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />
                                {/* content */}
                                <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-14 max-w-lg">
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                                        <Flame size={12} fill="currentColor" /> {slide.discount}
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {slide.title}
                                    </h2>
                                    <p className="text-emerald-300 text-sm mt-2 font-medium">{slide.subtitle}</p>
                                    <button className="mt-5 w-fit bg-white text-emerald-700 font-bold text-sm px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
                                        Shop Now <ArrowRight size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* pagination */}
                    <div className="swiper-pagination" style={{ paddingBottom: 8 }} />
                    {/* arrows */}
                    <div className="swiper-button-prev !w-9 !h-9 !bg-white/90 !text-emerald-600 rounded-full shadow-md after:!text-sm" />
                    <div className="swiper-button-next !w-9 !h-9 !bg-white/90 !text-emerald-600 rounded-full shadow-md after:!text-sm" />
                </div>
            </section>
        </div>

    )
}
