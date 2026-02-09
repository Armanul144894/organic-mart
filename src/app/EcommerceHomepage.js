"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight,
  Menu,
  Mail as MailIcon,
} from "lucide-react";
import CategorySlider from "./components/CategorySlider";
import HotDeals from "./components/HotDeals";
import WeeklyOffer from "./components/WeeklyOffer";
import FreshVegetable from "./components/FreshVegetable";
import FreshFruits from "./components/FreshFruits";
import PopularBrand from "./components/PopularBrand";
import HomeBanner from "./components/HomeBanner";
import HomeFeatures from "./components/HomeFeatures";
import Newsletter from "./components/Newsletter";
import products from "@/data/products";
import categories from "@/data/categories";
import DairyProducts from "./components/DairyProducts";
import Link from "next/link";
import MeatAndFish from "./components/MeatAndFish";
import { extractBrands } from "@/utils/extractData";
import BannerSection from "./components/BannerSection";
import CookingSpices from "./components/CookingSpices";

// ─── DATA ────────────────────────────────────────────────────────────────────
const bannerSlides = [
  {
    title: "Fresh Organic Vegetables",
    subtitle: "Farm to Your Doorstep",
    discount: "Up to 30% OFF",
    image:
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=1400&h=600&fit=crop",
  },
  {
    title: "Premium Dairy Products",
    subtitle: "Fresh & Healthy Every Day",
    discount: "Up to 25% OFF",
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1400&h=600&fit=crop",
  },
  {
    title: "Exotic Fresh Fruits",
    subtitle: "Seasonal Favourites",
    discount: "Up to 20% OFF",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&h=600&fit=crop",
  },
];

const allCategories = categories;

const allProducts = products;

const brands = extractBrands();
const brandsArray = Object.values(brands).sort(
  (a, b) => b.productCount - a.productCount,
);

// ─── STAR RENDERER ───────────────────────────────────────────────────────────

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────

// ─── SECTION TITLE ───────────────────────────────────────────────────────────
function SectionTitle({ icon, title, sub, viewAll }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          {icon && <span>{icon}</span>} {title}
        </h2>
        {sub && <p className="text-sm text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {viewAll && (
        <Link
          href={`${viewAll}`}
          className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
        >
          View All <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function EcommerceHomepage() {
  // ── hero swiper refs ──
  const heroSwiperRef = useRef(null);
  const [heroIdx, setHeroIdx] = useState(0);

  // ── product swiper refs ──
  const categorySwiperRef = useRef(null);
  const vegSwiperRef = useRef(null);
  const fruitSwiperRef = useRef(null);
  const dairySwiperRef = useRef(null);
  const meatFishSwiperRef = useRef(null);
  const brandSwiperRef = useRef(null);
  const cookingSwiperRef = useRef(null);

   function initAllSwipers() {
    // Hero
    if (heroSwiperRef.current && !heroSwiperRef.current.swiper) {
      initSwiper(heroSwiperRef.current, {
        autoplay: { delay: 5000, disableOnInteraction: false },
        loop: true,
        speed:3500,
        pagination: {
          el: heroSwiperRef.current.querySelector(".swiper-pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: heroSwiperRef.current.querySelector(".swiper-button-next"),
          prevEl: heroSwiperRef.current.querySelector(".swiper-button-prev"),
        },
        on: {
          slideChange(s) {
            setHeroIdx(s.realIndex);
          },
        },
      });
    }

    // Popular Category
    if (categorySwiperRef.current && !categorySwiperRef.current.swiper) {
      initSwiper(categorySwiperRef.current, {
        spaceBetween: 16,
        slidesPerView: 2,
        speed:2000,
        navigation: {
          nextEl: categorySwiperRef.current.querySelector(
            ".swiper-button-next",
          ),
          prevEl: categorySwiperRef.current.querySelector(
            ".swiper-button-prev",
          ),
        },
        breakpoints: {
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1440: {
            slidesPerView: 7,
          },
        },
      });
    }
    // Vegetable products
    if (vegSwiperRef.current && !vegSwiperRef.current.swiper) {
      initSwiper(vegSwiperRef.current, {
        spaceBetween: 16,
        slidesPerView: "auto",
        speed:2000,
        navigation: {
          nextEl: vegSwiperRef.current.querySelector(".swiper-button-next"),
          prevEl: vegSwiperRef.current.querySelector(".swiper-button-prev"),
        },
      });
    }
    // Fruit products
    if (fruitSwiperRef.current && !fruitSwiperRef.current.swiper) {
      initSwiper(fruitSwiperRef.current, {
        spaceBetween: 16,
        slidesPerView: "auto",
        speed:2000,
        navigation: {
          nextEl: fruitSwiperRef.current.querySelector(".swiper-button-next"),
          prevEl: fruitSwiperRef.current.querySelector(".swiper-button-prev"),
        },
      });
    }

    // Dairy products
    if (dairySwiperRef.current && !dairySwiperRef.current.swiper) {
      initSwiper(dairySwiperRef.current, {
        spaceBetween: 16,
        slidesPerView: "auto",
        speed:2000,
        navigation: {
          nextEl: dairySwiperRef.current.querySelector(".swiper-button-next"),
          prevEl: dairySwiperRef.current.querySelector(".swiper-button-prev"),
        },
      });
    }

    // Meat Fish products
    if (meatFishSwiperRef.current && !meatFishSwiperRef.current.swiper) {
      initSwiper(meatFishSwiperRef.current, {
        spaceBetween: 16,
        slidesPerView: "auto",
        speed:2000,
        navigation: {
          nextEl: meatFishSwiperRef.current.querySelector(
            ".swiper-button-next",
          ),
          prevEl: meatFishSwiperRef.current.querySelector(
            ".swiper-button-prev",
          ),
        },
      });
    }

    // Cooking products
    if (cookingSwiperRef.current && !cookingSwiperRef.current.swiper) {
      initSwiper(cookingSwiperRef.current, {
        spaceBetween: 16,
        slidesPerView: "auto",
        speed:2000,
        navigation: {
          nextEl: cookingSwiperRef.current.querySelector(
            ".swiper-button-next",
          ),
          prevEl: cookingSwiperRef.current.querySelector(
            ".swiper-button-prev",
          ),
        },
      });
    }

    // Brands
    if (brandSwiperRef.current && !brandSwiperRef.current.swiper) {
      initSwiper(brandSwiperRef.current, {
        spaceBetween: 20,
        slidesPerView: "auto",
        loop: true,
        autoplay: { delay: 500, pauseOnMouseEnter: true },
        speed: 1500,
      });
    }
  }
  
  // ── Swiper init helper ──
  const initSwiper = useCallback((container, options = {}) => {
    if (!container || !window.Swiper) return null;
    // destroy any previous instance
    if (container.swiper) container.swiper.destroy(true, true);
    return new window.Swiper(container, {
      ...options,
    });
  }, []);

  // ── load Swiper CSS + JS via CDN, then init all swipers ──
  useEffect(() => {
    // inject CSS
    if (!document.getElementById("swiper-css")) {
      const link = document.createElement("link");
      link.id = "swiper-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
      document.head.appendChild(link);
    }
    // inject JS
    if (!document.getElementById("swiper-js")) {
      const script = document.createElement("script");
      script.id = "swiper-js";
      script.src =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
      script.onload = () => initAllSwipers();
      document.head.appendChild(script);
    } else if (window.Swiper) {
      initAllSwipers();
    }
  });

 

  // filtered lists
  const vegProducts = allProducts.filter((p) => p.category === "Vegetables");
  const fruitProducts = allProducts.filter((p) => p.category === "Fruits");
  const dairyProducts = allProducts.filter((p) => p.category === "Dairy");
  const meatFishProducts = allProducts.filter(
    (p) => p.category === "Meat & Fish",
  );
  const cookingProducts = allProducts.filter(
    (p) => p.category === "Cooking & Spices",
  );
  const hotDeals = [...allProducts]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 10);

  // ── NAV LINKS ──
  const navLinks = [
    { label: "All Categories", icon: <Menu size={16} /> },
    { label: "🔥 Hot Deals" },
    { label: "🆕 New Arrivals" },
    { label: "🏆 Best Sellers" },
    { label: "💰 Weekly Offers" },
    { label: "🎁 Gift Cards" },
  ];

  // ─── RENDER ─────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* ═══════════ HEADER ═══════════ */}

      {/* ═══════════ HERO BANNER SWIPER ═══════════ */}
      <HomeBanner bannerSlides={bannerSlides} heroSwiperRef={heroSwiperRef} />

      {/* ═══════════ CATEGORIES ═══════════ */}
      <CategorySlider
        categories={allCategories}
        categorySwiperRef={categorySwiperRef}
      
      />

      {/* ═══════════ HOT DEALS GRID ═══════════ */}
      <HotDeals hotDeals={hotDeals} />

      {/* ═══════════ VEGETABLES SWIPER ═══════════ */}
      <FreshVegetable
        vegProducts={vegProducts}
        vegSwiperRef={vegSwiperRef}
      
      />

      {/* ═══════════ WEEKLY OFFERS ═══════════ */}
      <WeeklyOffer />

      {/* ═══════════ FRUITS SWIPER ═══════════ */}
      <FreshFruits
        fruitProducts={fruitProducts}
        fruitSwiperRef={fruitSwiperRef}
      
      />

      {/* ═══════════ FRUITS SWIPER ═══════════ */}
      <DairyProducts
        dairyProducts={dairyProducts}
        dairySwiperRef={dairySwiperRef}
      
      />

      {/* ═══════════ FRUITS SWIPER ═══════════ */}
      <MeatAndFish
        meatFishProducts={meatFishProducts}
        meatFishSwiperRef={meatFishSwiperRef}
      
      />

      <BannerSection />

      {/* ═══════════ BRANDS SWIPER ═══════════ */}
      <CookingSpices
        cookingProducts={cookingProducts}
        cookingSwiperRef={cookingSwiperRef}
      />

      {/* ═══════════ BRANDS SWIPER ═══════════ */}
      <PopularBrand
        brands={brandsArray}
        brandSwiperRef={brandSwiperRef}
      
      />


      {/* ═══════════ FEATURES ═══════════ */}
      <HomeFeatures />

      {/* ═══════════ NEWSLETTER ═══════════ */}
      <Newsletter />
    </div>
  );
}
