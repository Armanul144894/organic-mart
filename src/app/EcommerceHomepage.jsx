'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  User,
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Truck,
  CreditCard,
  RotateCcw,
  Tag,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Menu,
  X,
  Plus,
  Flame,
  Package,
  ShieldCheck,
  Mail as MailIcon,
} from "lucide-react";
import CategorySlider from "./components/CategorySlider";
import ProductCard from "./components/ProductCard";
import HotDeals from "./components/HotDeals";
import WeeklyOffer from "./components/WeeklyOffer";
import FreshVegetable from "./components/FreshVegetable";
import FreshFruits from "./components/FreshFruits";
import PopularBrand from "./components/PopularBrand";

// ─── DATA ────────────────────────────────────────────────────────────────────
const bannerSlides = [
  {
    title: "Fresh Organic Vegetables",
    subtitle: "Farm to Your Doorstep",
    discount: "Up to 30% OFF",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=1400&h=600&fit=crop",
  },
  {
    title: "Premium Dairy Products",
    subtitle: "Fresh & Healthy Every Day",
    discount: "Up to 25% OFF",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1400&h=600&fit=crop",
  },
  {
    title: "Exotic Fresh Fruits",
    subtitle: "Seasonal Favourites",
    discount: "Up to 20% OFF",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&h=600&fit=crop",
  },
];

const categories = [
  { id: 1, name: "Vegetables", emoji: "🥬", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=400&fit=crop", color: "from-emerald-500 to-emerald-700" },
  { id: 2, name: "Fruits", emoji: "🍎", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop", color: "from-amber-400 to-amber-600" },
  { id: 3, name: "Dairy", emoji: "🥛", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop", color: "from-sky-400 to-sky-600" },
  { id: 4, name: "Bakery", emoji: "🍞", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", color: "from-orange-400 to-orange-600" },
  { id: 5, name: "Meat & Fish", emoji: "🍖", image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=400&fit=crop", color: "from-red-400 to-red-600" },
  { id: 6, name: "Beverages", emoji: "🥤", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop", color: "from-violet-400 to-violet-600" },
  { id: 7, name: "Snacks", emoji: "🍪", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop", color: "from-pink-400 to-pink-600" },
  { id: 8, name: "Grains", emoji: "🌾", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", color: "from-yellow-500 to-yellow-700" },
  { id: 9, name: "Cooking & Spices", emoji: "🌶️", image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&h=400&fit=crop", color: "from-red-500 to-orange-500" },
];

const allProducts = [
  { id:1,  name:"Fresh Organic Tomatoes",   brand:"Fresh Foods", price:45,  oldPrice:60,  discount:25, rating:4.5, reviews:128, category:"Vegetables", image:"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop", weight:"1 kg" },
  { id:2,  name:"Fresh Organic Potatoes",   brand:"Fresh Foods", price:30,  oldPrice:40,  discount:25, rating:4.4, reviews:95,  category:"Vegetables", image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop", weight:"1 kg" },
  { id:3,  name:"Fresh Organic Carrots",    brand:"Fresh Foods", price:40,  oldPrice:50,  discount:20, rating:4.6, reviews:112, category:"Vegetables", image:"https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", weight:"500g" },
  { id:4,  name:"Fresh Cucumber",           brand:"Fresh Foods", price:25,  oldPrice:35,  discount:29, rating:4.4, reviews:87,  category:"Vegetables", image:"https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop", weight:"500g" },
  { id:5,  name:"Green Capsicum",           brand:"Fresh Foods", price:55,  oldPrice:70,  discount:21, rating:4.5, reviews:73,  category:"Vegetables", image:"https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop", weight:"500g" },
  { id:6,  name:"Red Onions",               brand:"Fresh Foods", price:35,  oldPrice:45,  discount:22, rating:4.3, reviews:156, category:"Vegetables", image:"https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=400&fit=crop", weight:"1 kg" },
  { id:7,  name:"Fresh Cauliflower",        brand:"Fresh Foods", price:40,  oldPrice:50,  discount:20, rating:4.5, reviews:68,  category:"Vegetables", image:"https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=400&h=400&fit=crop", weight:"1 piece" },
  { id:8,  name:"Fresh Broccoli",           brand:"Fresh Foods", price:85,  oldPrice:100, discount:15, rating:4.7, reviews:92,  category:"Vegetables", image:"https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop", weight:"500g" },
  { id:9,  name:"Fresh Spinach",            brand:"Fresh Foods", price:20,  oldPrice:30,  discount:33, rating:4.6, reviews:104, category:"Vegetables", image:"https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", weight:"250g" },
  { id:10, name:"Green Beans",              brand:"Fresh Foods", price:50,  oldPrice:65,  discount:23, rating:4.4, reviews:61,  category:"Vegetables", image:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop", weight:"500g" },
  { id:16, name:"Fresh Bananas",            brand:"Fresh Foods", price:60,  oldPrice:70,  discount:14, rating:4.6, reviews:145, category:"Fruits",     image:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop", weight:"1 dozen" },
  { id:17, name:"Fresh Red Apples",         brand:"Fresh Foods", price:180, oldPrice:200, discount:10, rating:4.7, reviews:167, category:"Fruits",     image:"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop", weight:"1 kg" },
  { id:18, name:"Fresh Strawberries",       brand:"Fresh Foods", price:220, oldPrice:250, discount:12, rating:4.8, reviews:203, category:"Fruits",     image:"https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", weight:"250g" },
  { id:19, name:"Fresh Oranges",            brand:"Fresh Foods", price:120, oldPrice:140, discount:14, rating:4.6, reviews:134, category:"Fruits",     image:"https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop", weight:"1 kg" },
  { id:20, name:"Fresh Mangoes",            brand:"Fresh Foods", price:150, oldPrice:180, discount:17, rating:4.9, reviews:289, category:"Fruits",     image:"https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop", weight:"1 kg" },
  { id:21, name:"Fresh Grapes",             brand:"Fresh Foods", price:200, oldPrice:230, discount:13, rating:4.7, reviews:156, category:"Fruits",     image:"https://images.unsplash.com/photo-1596363505729-4190a9506133?w=400&h=400&fit=crop", weight:"500g" },
  { id:22, name:"Fresh Watermelon",         brand:"Fresh Foods", price:40,  oldPrice:50,  discount:20, rating:4.5, reviews:178, category:"Fruits",     image:"https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=400&h=400&fit=crop", weight:"Per kg" },
  { id:23, name:"Fresh Pineapple",          brand:"Fresh Foods", price:80,  oldPrice:100, discount:20, rating:4.6, reviews:112, category:"Fruits",     image:"https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop", weight:"1 piece" },
  { id:31, name:"Fresh Full Cream Milk 1L", brand:"Arla Dairy",  price:65,  oldPrice:75,  discount:13, rating:4.7, reviews:187, category:"Dairy",      image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop", weight:"1 Liter" },
  { id:32, name:"Farm Fresh Eggs (12pcs)",  brand:"Fresh Foods", price:120, oldPrice:140, discount:14, rating:4.9, reviews:214, category:"Dairy",      image:"https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", weight:"12 pieces" },
  { id:33, name:"Greek Yogurt 500g",        brand:"Arla Dairy",  price:75,  oldPrice:85,  discount:12, rating:4.7, reviews:198, category:"Dairy",      image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop", weight:"500g" },
  { id:46, name:"Basmati Rice 5kg",         brand:"PRAN Foods",  price:450, oldPrice:500, discount:10, rating:4.8, reviews:312, category:"Grains",     image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", weight:"5 kg" },
  { id:47, name:"Whole Wheat Pasta 500g",   brand:"Nestle",      price:85,  oldPrice:95,  discount:11, rating:4.5, reviews:156, category:"Grains",     image:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop", weight:"500g" },
  { id:49, name:"Rolled Oats 500g",         brand:"Nestle",      price:180, oldPrice:200, discount:10, rating:4.7, reviews:198, category:"Grains",     image:"https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400&h=400&fit=crop", weight:"500g" },
  { id:82, name:"Biscuits Pack",            brand:"Nestle",      price:55,  oldPrice:65,  discount:15, rating:4.5, reviews:220, category:"Snacks",     image:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop", weight:"250g" },
  { id:83, name:"Potato Chips 100g",        brand:"PRAN Foods",  price:40,  oldPrice:50,  discount:20, rating:4.6, reviews:310, category:"Snacks",     image:"https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop", weight:"100g" },
  { id:84, name:"Chocolate Bar 50g",        brand:"Nestle",      price:65,  oldPrice:75,  discount:13, rating:4.8, reviews:420, category:"Snacks",     image:"https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=400&fit=crop", weight:"50g" },
  { id:64, name:"Chicken Breast 1kg",       brand:"Fresh Foods", price:280, oldPrice:320, discount:12, rating:4.8, reviews:120, category:"Meat",       image:"https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop", weight:"1kg" },
  { id:72, name:"Green Tea Bags",           brand:"ACI Limited", price:95,  oldPrice:110, discount:14, rating:4.7, reviews:140, category:"Beverages",  image:"https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop", weight:"100g" },
  { id:74, name:"Coffee Powder 200g",       brand:"Nestle",      price:280, oldPrice:320, discount:12, rating:4.8, reviews:210, category:"Beverages",  image:"https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop", weight:"200g" },
  { id:92, name:"Turmeric Powder 200g",     brand:"PRAN Foods",  price:90,  oldPrice:110, discount:18, rating:4.7, reviews:260, category:"Cooking & Spices", image:"https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&h=400&fit=crop", weight:"200g" },
  { id:98, name:"Mustard Oil 500ml",        brand:"PRAN Foods",  price:190, oldPrice:220, discount:14, rating:4.8, reviews:340, category:"Cooking & Spices", image:"https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop", weight:"500ml" },
];



const brands = [
  { id:1, name:"PRAN",  bg:"#10b981" },
  { id:2, name:"Nestle", bg:"#ef4444" },
  { id:3, name:"ACI",   bg:"#3b82f6" },
  { id:4, name:"Arla",  bg:"#f59e0b" },
  { id:5, name:"Fresh", bg:"#8b5cf6" },
  { id:6, name:"Coca",  bg:"#dc2626" },
  { id:7, name:"PRAN",  bg:"#10b981" },
  { id:8, name:"Nestle", bg:"#ef4444" },
];

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
        <a href="#" className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
          View All <ArrowRight size={15} />
        </a>
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
  const vegSwiperRef  = useRef(null);
  const fruitSwiperRef = useRef(null);
  const brandSwiperRef = useRef(null);

  // ── mobile menu ──
  const [menuOpen, setMenuOpen] = useState(false);

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
      link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
      document.head.appendChild(link);
    }
    // inject JS
    if (!document.getElementById("swiper-js")) {
      const script = document.createElement("script");
      script.id = "swiper-js";
      script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
      script.onload = () => initAllSwipers();
      document.head.appendChild(script);
    } else if (window.Swiper) {
      initAllSwipers();
    }
  });

  function initAllSwipers() {
    // Hero
    if (heroSwiperRef.current && !heroSwiperRef.current.swiper) {
      initSwiper(heroSwiperRef.current, {
        autoplay: { delay: 4500, disableOnInteraction: false },
        loop: true,
        pagination: { el: heroSwiperRef.current.querySelector(".swiper-pagination"), clickable: true },
        navigation: { nextEl: heroSwiperRef.current.querySelector(".swiper-button-next"), prevEl: heroSwiperRef.current.querySelector(".swiper-button-prev") },
        on: { slideChange(s) { setHeroIdx(s.realIndex); } },
      });
    }
    // Vegetable products
    if (vegSwiperRef.current && !vegSwiperRef.current.swiper) {
      initSwiper(vegSwiperRef.current, {
        spaceBetween: 16,
        slidesPerView: "auto",
        navigation: { nextEl: vegSwiperRef.current.querySelector(".swiper-button-next"), prevEl: vegSwiperRef.current.querySelector(".swiper-button-prev") },
      });
    }
    // Fruit products
    if (fruitSwiperRef.current && !fruitSwiperRef.current.swiper) {
      initSwiper(fruitSwiperRef.current, {
        spaceBetween: 16,
        slidesPerView: "auto",
        navigation: { nextEl: fruitSwiperRef.current.querySelector(".swiper-button-next"), prevEl: fruitSwiperRef.current.querySelector(".swiper-button-prev") },
      });
    }
    // Brands
    if (brandSwiperRef.current && !brandSwiperRef.current.swiper) {
      initSwiper(brandSwiperRef.current, {
        spaceBetween: 20,
        slidesPerView: "auto",
        loop: true,
        autoplay: { delay: 3000, pauseOnMouseEnter: true },
      });
    }
  }

  // filtered lists
  const vegProducts   = allProducts.filter(p => p.category === "Vegetables");
  const fruitProducts = allProducts.filter(p => p.category === "Fruits");
  const hotDeals      = [...allProducts].sort((a, b) => b.discount - a.discount).slice(0, 8);

  // ── NAV LINKS ──
  const navLinks = [
    { label: "All Categories", icon: <Menu size={16}/> },
    { label: "🔥 Hot Deals" },
    { label: "🆕 New Arrivals" },
    { label: "🏆 Best Sellers" },
    { label: "💰 Weekly Offers" },
    { label: "🎁 Gift Cards" },
  ];

  // ─── RENDER ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ═══════════ HEADER ═══════════ */}
      <header className="bg-white shadow-sm sticky top-0 z-50">

        {/* top-bar */}
        <div className="bg-emerald-600 text-white text-xs">
          <div className="container mx-auto px-4 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Phone size={12}/> +880-1234-567890</span>
              <span className="flex items-center gap-1"><Mail size={12}/> support@OrganicMart.com</span>
            </div>
            <div className="flex items-center gap-4 text-emerald-200">
              <a href="#" className="hover:text-white transition-colors">Track Order</a>
              <a href="#" className="hover:text-white transition-colors">Help</a>
              <span className="border-l border-emerald-400 h-3 mx-1"/>
              <a href="#" className="hover:text-white transition-colors font-semibold">EN</a>
            </div>
          </div>
        </div>

        {/* main header */}
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          {/* logo */}
          <a href="#" className="flex items-center gap-1.5 shrink-0">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-extrabold text-emerald-600" style={{ fontFamily: "'Playfair Display', serif" }}>OrganicMart</span>
          </a>

          {/* search */}
          <div className="flex-1 max-w-xl flex">
            <input
              type="text"
              placeholder="Search for products, brands and more…"
              className="flex-1 border border-gray-200 rounded-l-xl px-4 py-2 text-sm outline-none focus:border-emerald-400 transition-colors"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white px-4 rounded-r-xl flex items-center">
              <Search size={18}/>
            </button>
          </div>

          {/* actions */}
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            {[
              { icon: <User size={20}/>, label: "Account", badge: null },
              { icon: <Heart size={20}/>, label: "Wishlist", badge: 3 },
              { icon: <ShoppingCart size={20}/>, label: "Cart", badge: 5, primary: true },
            ].map((a, i) => (
              <button
                key={i}
                className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors ${a.primary ? "bg-emerald-600 text-white hover:bg-emerald-700" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {a.icon}
                <span className="text-xs font-semibold">{a.label}</span>
                {a.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center" style={{ width:18, height:18, fontSize:10 }}>
                    {a.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* mobile hamburger */}
          <button className="sm:hidden ml-auto text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>

        {/* nav bar */}
        <div className={`border-t border-gray-100 overflow-hidden ${menuOpen ? "block" : "hidden"} sm:block`}>
          <div className="container mx-auto px-4">
            <nav className="flex flex-wrap sm:flex-nowrap">
              {navLinks.map((n, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  {n.icon} {n.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ═══════════ HERO BANNER SWIPER ═══════════ */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10"/>
                {/* content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-10 max-w-lg">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                    <Flame size={12} fill="currentColor"/> {slide.discount}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {slide.title}
                  </h2>
                  <p className="text-emerald-300 text-sm mt-2 font-medium">{slide.subtitle}</p>
                  <button className="mt-5 w-fit bg-white text-emerald-700 font-bold text-sm px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
                    Shop Now <ArrowRight size={15}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* pagination */}
          <div className="swiper-pagination" style={{ paddingBottom: 8 }}/>
          {/* arrows */}
          <div className="swiper-button-prev !w-9 !h-9 !bg-white/90 !text-emerald-600 rounded-full shadow-md after:!text-sm"/>
          <div className="swiper-button-next !w-9 !h-9 !bg-white/90 !text-emerald-600 rounded-full shadow-md after:!text-sm"/>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <CategorySlider categories={categories} SectionTitle={SectionTitle}/>

      {/* ═══════════ HOT DEALS GRID ═══════════ */}
      <HotDeals hotDeals={hotDeals} SectionTitle={SectionTitle}/>

      {/* ═══════════ VEGETABLES SWIPER ═══════════ */}
      <FreshVegetable vegProducts={vegProducts} vegSwiperRef={vegSwiperRef} SectionTitle={SectionTitle}/>

      {/* ═══════════ WEEKLY OFFERS ═══════════ */}
      <WeeklyOffer SectionTitle={SectionTitle}/>

      {/* ═══════════ FRUITS SWIPER ═══════════ */}
      <FreshFruits fruitProducts={fruitProducts} fruitSwiperRef={fruitSwiperRef} SectionTitle={SectionTitle}/>
      

      {/* ═══════════ BRANDS SWIPER ═══════════ */}
      <PopularBrand brands={brands} brandSwiperRef={brandSwiperRef} SectionTitle={SectionTitle}/>
    

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Truck size={28} className="text-emerald-500"/>,     title: "Free Delivery",   desc: "On orders over ৳500" },
            { icon: <ShieldCheck size={28} className="text-sky-500"/>,   title: "Secure Payment",  desc: "100 % secure transactions" },
            { icon: <RotateCcw size={28} className="text-amber-500"/>,   title: "Easy Returns",    desc: "7-day return policy" },
            { icon: <Tag size={28} className="text-pink-500"/>,          title: "Special Offers",  desc: "Weekly deals & discounts" },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">{f.icon}</div>
              <h4 className="font-bold text-gray-800 text-sm">{f.title}</h4>
              <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ NEWSLETTER ═══════════ */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-white text-center sm:text-left">
            <h3 className="text-xl font-extrabold flex items-center gap-2 justify-center sm:justify-start">
              <MailIcon size={22}/> Subscribe to Our Newsletter
            </h3>
            <p className="text-emerald-200 text-sm mt-1">Get the latest offers and updates delivered to your inbox.</p>
          </div>
          <div className="flex w-full sm:w-auto max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-l-xl px-4 py-2.5 text-sm outline-none"
            />
            <button className="bg-white text-emerald-700 font-bold text-sm px-5 rounded-r-xl hover:bg-gray-100 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>

 
    </div>
  );
}