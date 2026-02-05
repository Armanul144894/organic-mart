'use client'
import { useState } from "react";
import {
    SlidersHorizontal,
    Grid3x3,
    List,
    X,
    Star,
    Heart,
    Plus,
    ArrowUpDown,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import products from "@/data/products";
import ProductCard from "./ProductCard";

// Helper to create slug from name
const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// ─── CATEGORY DATA ───────────────────────────────────────────────────────────
const categoryData = {
    vegetables: {
        id: "vegetables",
        name: "Fresh Vegetables",
        description: "Explore our wide range of fresh, organic vegetables delivered straight from the farm to your doorstep.",
        image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=1200&h=400&fit=crop",
        icon: "🥬",
    },
    fruits: {
        id: "fruits",
        name: "Fresh Fruits",
        description: "Hand-picked seasonal and exotic fruits bursting with natural sweetness and nutrition.",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=400&fit=crop",
        icon: "🍎",
    },
    dairy: {
        id: "dairy",
        name: "Dairy Products",
        description: "Premium quality dairy products from trusted farms, ensuring freshness and purity.",
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&h=400&fit=crop",
        icon: "🥛",
    },
    grains: {
        id: "grains",
        name: "Grains & Cereals",
        description: "Wholesome grains and cereals packed with nutrients for a healthy lifestyle.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&h=400&fit=crop",
        icon: "🌾",
    },
    bakery: {
        id: "bakery",
        name: "Bakery Products",
        description: "Fresh baked goods made daily with premium ingredients for your family.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=400&fit=crop",
        icon: "🥖",
    },
    meat: {
        id: "meat",
        name: "Meat & Fish",
        description: "Premium quality fresh meat and fish from trusted sources.",
        image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=1200&h=400&fit=crop",
        icon: "🍗",
    },
    beverages: {
        id: "beverages",
        name: "Beverages",
        description: "Refreshing drinks and beverages for every occasion.",
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&h=400&fit=crop",
        icon: "🥤",
    },
    snacks: {
        id: "snacks",
        name: "Snacks",
        description: "Delicious snacks for your cravings and quick bites.",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=1200&h=400&fit=crop",
        icon: "🍪",
    },
    "cooking-spices": {
        id: "cooking-spices",
        name: "Cooking & Spices",
        description: "Authentic spices and cooking essentials for perfect flavors.",
        image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=1200&h=400&fit=crop",
        icon: "🌶️",
    },
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


// ─── CATEGORY PAGE COMPONENT ─────────────────────────────────────────────────
export default function CategoryPage({ category: categoryName }) {
    // Find category key from name
    const categoryKey = Object.keys(categoryData).find(
        key => categoryData[key].name === categoryName
    );

    const category = categoryData[categoryKey] || categoryData.vegetables;

    // Filter products by category
    const categoryProducts = products.filter(
        p => p.category.toLowerCase() === categoryName.toLowerCase()
    );

    // Get unique brands for this category
    const brands = [...new Set(categoryProducts.map(p => p.brand))];

    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("featured");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [showOnSale, setShowOnSale] = useState(false);
    const [showInStock, setShowInStock] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Calculate price range
    const minPrice = Math.min(...categoryProducts.map(p => p.price));
    const maxPrice = Math.max(...categoryProducts.map(p => p.price));

    // Filter products
    let filteredProducts = categoryProducts.filter((p) => {
        if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
        if (showOnSale && p.discount === 0) return false;
        if (showInStock && p.inStock === 0) return false;
        return true;
    });

    // Sort products
    if (sortBy === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "discount") {
        filteredProducts.sort((a, b) => b.discount - a.discount);
    }

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setPriceRange([minPrice, maxPrice]);
        setShowOnSale(false);
        setShowInStock(false);
    };

    const activeFiltersCount =
        selectedBrands.length +
        (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0) +
        (showOnSale ? 1 : 0) +
        (showInStock ? 1 : 0);

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

                                {/* Brands */}
                                {brands.length > 1 && (
                                    <div className="mb-6">
                                        <h3 className="font-bold text-sm text-gray-800 mb-3">
                                            Brands
                                        </h3>
                                        <div className="space-y-2">
                                            {brands.map((brand) => (
                                                <label
                                                    key={brand}
                                                    className="flex items-center gap-2 cursor-pointer group"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBrands.includes(brand)}
                                                        onChange={() => toggleBrand(brand)}
                                                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                                    />
                                                    <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                                                        {brand}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h3 className="font-bold text-sm text-gray-800 mb-3">
                                        Price Range
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                placeholder="Min"
                                            />
                                            <span className="text-gray-400">-</span>
                                            <input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                placeholder="Max"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            ৳{minPrice} - ৳{maxPrice}
                                        </p>
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
                                        <option value="discount">Best Discount</option>
                                        <option value="name">Name A-Z</option>
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
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