'use client'
import { useMemo, useState } from "react";
import {
    SlidersHorizontal,
    Grid3x3,
    List,
    X,
    Star,
    Heart,
    ShoppingCart,
    Plus,
    ArrowUpDown,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import products from "@/data/products";

 const allProducts = products;

  // Group products by category
//   const productsByCategory = allProducts.reduce((acc, product) => {
//     if (!acc[product.category]) {
//       acc[product.category] = [];
//     }
//     acc[product.category].push(product);
//     return acc;
//   }, {});

// ─── CATEGORY DATA ───────────────────────────────────────────────────────────
const categoryData = {
    vegetables: {
        id: "vegetables",
        name: "Fresh Vegetables",
        description: "Explore our wide range of fresh, organic vegetables delivered straight from the farm to your doorstep.",
        image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=1200&h=400&fit=crop",
        icon: "🥬",
        subcategories: ["Leafy Greens", "Root Vegetables", "Cruciferous", "Nightshades", "Herbs"],
    },
    fruits: {
        id: "fruits",
        name: "Fresh Fruits",
        description: "Hand-picked seasonal and exotic fruits bursting with natural sweetness and nutrition.",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=400&fit=crop",
        icon: "🍎",
        subcategories: ["Tropical Fruits", "Citrus Fruits", "Berries", "Stone Fruits", "Melons"],
    },
    dairy: {
        id: "dairy",
        name: "Dairy Products",
        description: "Premium quality dairy products from trusted farms, ensuring freshness and purity.",
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&h=400&fit=crop",
        icon: "🥛",
        subcategories: ["Milk & Cream", "Cheese", "Yogurt", "Butter & Ghee", "Eggs"],
    },
    grains: {
        id: "grains",
        name: "Grains & Cereals",
        description: "Wholesome grains and cereals packed with nutrients for a healthy lifestyle.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&h=400&fit=crop",
        icon: "🌾",
        subcategories: ["Rice", "Wheat & Flour", "Pulses & Lentils", "Oats & Cereals", "Pasta & Noodles"],
    },
};



// ─── PRODUCTS BY CATEGORY ────────────────────────────────────────────────────
const productsByCategory = {
    vegetables: [
        { id: 1, name: "Fresh Organic Tomatoes", brand: "Fresh Foods", price: 45, oldPrice: 60, discount: 25, rating: 4.5, reviews: 128, subcategory: "Nightshades", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop", weight: "1 kg", inStock: true, featured: true },
        { id: 2, name: "Fresh Organic Potatoes", brand: "Fresh Foods", price: 30, oldPrice: 40, discount: 25, rating: 4.4, reviews: 95, subcategory: "Root Vegetables", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop", weight: "1 kg", inStock: true, featured: false },
        { id: 3, name: "Fresh Organic Carrots", brand: "Fresh Foods", price: 40, oldPrice: 50, discount: 20, rating: 4.6, reviews: 112, subcategory: "Root Vegetables", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", weight: "500g", inStock: true, featured: true },
        { id: 4, name: "Fresh Cucumber", brand: "Fresh Foods", price: 25, oldPrice: 35, discount: 29, rating: 4.4, reviews: 87, subcategory: "Nightshades", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop", weight: "500g", inStock: true, featured: false },
        { id: 5, name: "Green Capsicum", brand: "Fresh Foods", price: 55, oldPrice: 70, discount: 21, rating: 4.5, reviews: 73, subcategory: "Nightshades", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop", weight: "500g", inStock: true, featured: false },
        { id: 6, name: "Red Onions", brand: "Fresh Foods", price: 35, oldPrice: 45, discount: 22, rating: 4.3, reviews: 156, subcategory: "Root Vegetables", image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=400&fit=crop", weight: "1 kg", inStock: true, featured: false },
        { id: 7, name: "Fresh Cauliflower", brand: "Fresh Foods", price: 40, oldPrice: 50, discount: 20, rating: 4.5, reviews: 68, subcategory: "Cruciferous", image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=400&h=400&fit=crop", weight: "1 piece", inStock: false, featured: false },
        { id: 8, name: "Fresh Broccoli", brand: "Fresh Foods", price: 85, oldPrice: 100, discount: 15, rating: 4.7, reviews: 92, subcategory: "Cruciferous", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop", weight: "500g", inStock: true, featured: true },
        { id: 9, name: "Fresh Spinach", brand: "Fresh Foods", price: 20, oldPrice: 30, discount: 33, rating: 4.6, reviews: 104, subcategory: "Leafy Greens", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", weight: "250g", inStock: true, featured: false },
    ],
    fruits: [
        { id: 11, name: "Fresh Bananas", brand: "Fresh Foods", price: 60, oldPrice: 70, discount: 14, rating: 4.6, reviews: 145, subcategory: "Tropical Fruits", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop", weight: "1 dozen", inStock: true, featured: true },
        { id: 12, name: "Fresh Red Apples", brand: "Fresh Foods", price: 180, oldPrice: 200, discount: 10, rating: 4.7, reviews: 167, subcategory: "Stone Fruits", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop", weight: "1 kg", inStock: true, featured: true },
        { id: 13, name: "Fresh Strawberries", brand: "Fresh Foods", price: 220, oldPrice: 250, discount: 12, rating: 4.8, reviews: 203, subcategory: "Berries", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", weight: "250g", inStock: true, featured: true },
        { id: 14, name: "Fresh Oranges", brand: "Fresh Foods", price: 120, oldPrice: 140, discount: 14, rating: 4.6, reviews: 134, subcategory: "Citrus Fruits", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop", weight: "1 kg", inStock: true, featured: false },
        { id: 15, name: "Fresh Mangoes", brand: "Fresh Foods", price: 150, oldPrice: 180, discount: 17, rating: 4.9, reviews: 289, subcategory: "Tropical Fruits", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop", weight: "1 kg", inStock: true, featured: true },
        { id: 16, name: "Fresh Grapes", brand: "Fresh Foods", price: 200, oldPrice: 230, discount: 13, rating: 4.7, reviews: 156, subcategory: "Berries", image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=400&h=400&fit=crop", weight: "500g", inStock: true, featured: false },
    ],
    dairy: [
        { id: 19, name: "Fresh Full Cream Milk 1L", brand: "Arla Dairy", price: 65, oldPrice: 75, discount: 13, rating: 4.7, reviews: 187, subcategory: "Milk & Cream", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop", weight: "1 Liter", inStock: true, featured: false },
        { id: 20, name: "Farm Fresh Eggs (12pcs)", brand: "Fresh Foods", price: 120, oldPrice: 140, discount: 14, rating: 4.9, reviews: 214, subcategory: "Eggs", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", weight: "12 pieces", inStock: true, featured: true },
        { id: 21, name: "Greek Yogurt 500g", brand: "Arla Dairy", price: 75, oldPrice: 85, discount: 12, rating: 4.7, reviews: 198, subcategory: "Yogurt", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop", weight: "500g", inStock: true, featured: false },
        { id: 22, name: "Cheddar Cheese Block", brand: "Arla Dairy", price: 350, oldPrice: 400, discount: 12, rating: 4.8, reviews: 145, subcategory: "Cheese", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop", weight: "250g", inStock: true, featured: true },
    ],
    grains: [
        { id: 23, name: "Basmati Rice 5kg", brand: "PRAN Foods", price: 450, oldPrice: 500, discount: 10, rating: 4.8, reviews: 312, subcategory: "Rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", weight: "5 kg", inStock: true, featured: true },
        { id: 24, name: "Whole Wheat Pasta 500g", brand: "Nestle", price: 85, oldPrice: 95, discount: 11, rating: 4.5, reviews: 156, subcategory: "Pasta & Noodles", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop", weight: "500g", inStock: true, featured: false },
        { id: 25, name: "Rolled Oats 500g", brand: "Nestle", price: 180, oldPrice: 200, discount: 10, rating: 4.7, reviews: 198, subcategory: "Oats & Cereals", image: "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400&h=400&fit=crop", weight: "500g", inStock: true, featured: false },
    ],
};

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function StarRating({ rating, size = 13 }) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={
                        i < full
                            ? "fill-amber-400 text-amber-400"
                            : i === full && half
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                    }
                />
            ))}
        </div>
    );
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
function ProductCard({ product, categoryId }) {
    const [wishlisted, setWishlisted] = useState(false);

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            {/* Image */}
            <Link
                href={`/${product.id}`}
                className="relative overflow-hidden bg-gray-50 block"
                style={{ height: 220 }}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.discount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                            -{product.discount}%
                        </span>
                    )}
                    {product.featured && (
                        <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                            Featured
                        </span>
                    )}
                    {!product.inStock && (
                        <span className="bg-gray-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                            Out of Stock
                        </span>
                    )}
                </div>
                {/* Wishlist */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setWishlisted(!wishlisted);
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full shadow hover:scale-110 transition-transform"
                >
                    <Heart
                        size={16}
                        className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
                    />
                </button>
            </Link>

            {/* Body */}
            <div className="p-3.5 flex flex-col flex-1">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide truncate">
                    {product.brand}
                </p>
                <h3 className="text-sm font-bold text-gray-800 mt-0.5 line-clamp-2 leading-snug">
                    <Link href={`/${product.id}`} className="hover:text-emerald-600 transition-colors">
                        {product.name}
                    </Link>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{product.weight}</p>

                <div className="flex items-center gap-1.5 mt-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {/* Price + Add */}
                <div className="flex items-center justify-between mt-auto pt-3">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-emerald-600">
                            ৳{product.price}
                        </span>
                        {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                ৳{product.oldPrice}
                            </span>
                        )}
                    </div>
                    <button
                        disabled={!product.inStock}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${product.inStock
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg active:scale-90"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── CATEGORY PAGE COMPONENT ─────────────────────────────────────────────────
export default function CategoryPage({ categoryId = "vegetables" }) {
    const category = categoryData[categoryId];
    const products = productsByCategory[categoryId] || [];

    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("featured");
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [showOnSale, setShowOnSale] = useState(false);
    const [showInStock, setShowInStock] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Filter products
    let filteredProducts = products.filter((p) => {
        if (selectedSubcategories.length && !selectedSubcategories.includes(p.subcategory))
            return false;
        if (showOnSale && p.discount === 0) return false;
        if (showInStock && !p.inStock) return false;
        return true;
    });

    // Sort products
    if (sortBy === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "featured") {
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    const toggleSubcategory = (sub) => {
        setSelectedSubcategories((prev) =>
            prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
        );
    };

    const clearFilters = () => {
        setSelectedSubcategories([]);
        setShowOnSale(false);
        setShowInStock(false);
    };

    const activeFiltersCount =
        selectedSubcategories.length + (showOnSale ? 1 : 0) + (showInStock ? 1 : 0);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-center container mx-auto px-4">
                    <div className="max-w-2xl">
                        <span className="text-6xl mb-3 block">{category.icon}</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
                            {category.name}
                        </h1>
                        <p className="text-lg text-gray-200">{category.description}</p>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <Link href="/products" className="hover:text-emerald-600 transition-colors">
                            Shop
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-800 font-semibold">{category.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <aside
                        className={`${showFilters ? "block" : "hidden"
                            } lg:block fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-64 bg-white lg:bg-transparent z-40 lg:z-0 shadow-2xl lg:shadow-none`}
                    >
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden lg:sticky lg:top-20 h-full lg:h-auto flex flex-col lg:max-h-[calc(100vh-6rem)]">
                            {/* Mobile header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden flex-shrink-0">
                                <h2 className="font-bold text-lg">Filters</h2>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-4 overflow-y-auto flex-1">
                                {/* Clear Filters */}
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="w-full mb-4 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X size={16} />
                                        Clear Filters ({activeFiltersCount})
                                    </button>
                                )}

                                {/* Subcategories */}
                                <div className="mb-6">
                                    <h3 className="font-bold text-sm text-gray-800 mb-3">
                                        Subcategories
                                    </h3>
                                    <div className="space-y-2">
                                        {category.subcategories.map((sub) => (
                                            <label
                                                key={sub}
                                                className="flex items-center gap-2 cursor-pointer group"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSubcategories.includes(sub)}
                                                    onChange={() => toggleSubcategory(sub)}
                                                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                                />
                                                <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                                                    {sub}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Filters */}
                                <div className="mb-6">
                                    <h3 className="font-bold text-sm text-gray-800 mb-3">
                                        Quick Filters
                                    </h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={showOnSale}
                                                onChange={(e) => setShowOnSale(e.target.checked)}
                                                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                                                On Sale
                                            </span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={showInStock}
                                                onChange={(e) => setShowInStock(e.target.checked)}
                                                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                                                In Stock Only
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile filter backdrop */}
                    {showFilters && (
                        <div
                            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                            onClick={() => setShowFilters(false)}
                        />
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors"
                                >
                                    <SlidersHorizontal size={18} />
                                    Filters
                                    {activeFiltersCount > 0 && (
                                        <span className="bg-white text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>
                                <p className="text-sm text-gray-600">
                                    <span className="font-bold text-gray-800">
                                        {filteredProducts.length}
                                    </span>{" "}
                                    products found
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Sort */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-semibold text-gray-700 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                    </select>
                                    <ArrowUpDown
                                        size={16}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                    />
                                </div>

                                {/* View Toggle */}
                                <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                                                ? "bg-white text-emerald-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        <Grid3x3 size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-md transition-colors ${viewMode === "list"
                                                ? "bg-white text-emerald-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                                <div className="text-6xl mb-4">{category.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Try adjusting your filters to see more results
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        categoryId={categoryId}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}