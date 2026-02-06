"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronRight,
    Grid3x3,
    List,
    Star,
    Heart,
    Plus,
    ArrowUpDown,
    SlidersHorizontal,
    X,
} from "lucide-react";
import products from "@/data/products";

// Helper function to create URL-friendly slug
function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Category banner data
const categoryBanners = {
    "Vegetables": {
        image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=1200&h=400&fit=crop",
        description: "Explore our wide range of fresh, organic vegetables delivered straight from the farm to your doorstep.",
    },
    "Fruits": {
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=400&fit=crop",
        description: "Hand-picked seasonal and exotic fruits bursting with natural sweetness and nutrition.",
    },
    "Dairy": {
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&h=400&fit=crop",
        description: "Premium quality dairy products from trusted farms, ensuring freshness and purity.",
    },
    "Grains": {
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&h=400&fit=crop",
        description: "Wholesome grains and cereals packed with nutrients for a healthy lifestyle.",
    },
    "Bakery": {
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=400&fit=crop",
        description: "Fresh baked goods made daily with premium ingredients for your family.",
    },
    "Meat & Fish": {
        image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=1200&h=400&fit=crop",
        description: "Premium quality fresh meat and fish from trusted sources.",
    },
    "Beverages": {
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&h=400&fit=crop",
        description: "Refreshing drinks and beverages for every occasion.",
    },
    "Snacks": {
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=1200&h=400&fit=crop",
        description: "Delicious snacks for your cravings and quick bites.",
    },
    "Cooking & Spices": {
        image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=1200&h=400&fit=crop",
        description: "Authentic spices and cooking essentials for perfect flavors.",
    },
};


// Category emoji map
const categoryEmojis = {
    Vegetables: "🥬",
    Fruits: "🍎",
    Dairy: "🥛",
    Grains: "🌾",
    Bakery: "🍞",
    "Meat & Fish": "🍖",
    Beverages: "🥤",
    Snacks: "🍪",
    "Cooking & Spices": "🌶️",
};

// Star Rating Component
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
                    style={
                        i === full && half
                            ? { clipPath: "inset(0 50% 0 0)", fill: "#fbbf24" }
                            : {}
                    }
                />
            ))}
        </div>
    );
}

// Product Card Grid View
function ProductCardGrid({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <Link href={`/${product.slug}`}>
                <div className="relative overflow-hidden bg-gray-50" style={{ height: 220 }}>
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        height={200}
                        width={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.discount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                                -{product.discount}%
                            </span>
                        )}
                        {!product.inStock && (
                            <span className="bg-gray-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                                Out of Stock
                            </span>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full shadow hover:scale-110 transition-transform"
                    >
                        <Heart
                            size={16}
                            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
                        />
                    </button>
                </div>
            </Link>

            <div className="p-3.5 flex flex-col flex-1">
                <Link href={`/${product.slug}`}>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide truncate">
                        {product.brand}
                    </p>
                    <h3 className="text-sm font-bold text-gray-800 mt-0.5 line-clamp-2 leading-snug">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{product.weight}</p>

                    <div className="flex items-center gap-1.5 mt-2">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                </Link>

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
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart(product);
                        }}
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

// Product Card List View
function ProductCardList({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row h-full">
            <Link href={`/${product.slug}`}>
                <div className="relative overflow-hidden bg-gray-50 sm:w-64 flex-shrink-0" style={{ height: 200 }}>
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        height={200}
                        width={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.discount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                                -{product.discount}%
                            </span>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full shadow hover:scale-110 transition-transform"
                    >
                        <Heart
                            size={16}
                            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
                        />
                    </button>
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-1">
                <Link href={`/${product.slug}`}>
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                                {product.brand}
                            </p>
                            <h3 className="text-base font-bold text-gray-800 mt-1 leading-snug">
                                {product.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">{product.weight}</p>
                        </div>
                        {!product.inStock && (
                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <StarRating rating={product.rating} size={14} />
                        <span className="text-sm text-gray-500">
                            {product.rating} ({product.reviews} reviews)
                        </span>
                    </div>
                </Link>

                <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-emerald-600">
                            ৳{product.price}
                        </span>
                        {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                ৳{product.oldPrice}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart(product);
                        }}
                        disabled={!product.inStock}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${product.inStock
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg active:scale-95"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <Plus size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CategoryPage({ category, categoryData }) {
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("featured");
    const [wishlist, setWishlist] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showOnSale, setShowOnSale] = useState(false);
    const [showInStock, setShowInStock] = useState(false);

    // Calculate actual prices FIRST
const categoryProducts = products.filter((p) => p.category === category);
const minPrice = Math.min(...categoryProducts.map(p => p.price));
const maxPrice = Math.max(...categoryProducts.map(p => p.price));

// Then initialize state with actual values
const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

    // Get unique subcategories with product counts
    const subcategoriesWithCounts = categoryData?.subcategories.map((subcategory) => {
        const productsInSubcategory = categoryProducts.filter(
            (p) => p.subcategory === subcategory
        );
        return {
            name: subcategory,
            slug: createSlug(subcategory),
            count: productsInSubcategory.length,
        };
    }) || [];

    // Get unique brands
    const brands = [...new Set(categoryProducts.map((p) => p.brand))];

    const toggleSubcategory = (sub) => {
        setSelectedSubcategories((prev) =>
            prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
        );
    };

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedSubcategories([]);
        setSelectedBrands([]);
        setShowOnSale(false);
        setShowInStock(false);
        setPriceRange([minPrice, maxPrice]);
    };

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const addToCart = (product) => {
        console.log("Added to cart:", product);
    };

    // Apply filters
    let filteredProducts = categoryProducts.filter((p) => {
        if (selectedSubcategories.length && !selectedSubcategories.includes(p.subcategory))
            return false;
        if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
        if (showOnSale && p.discount === 0) return false;
        if (showInStock && p.inStock === 0) return false;
        return true;
    });

    // Apply sorting
    if (sortBy === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
        filteredProducts.sort((a, b) => b.id - a.id);
    } else if (sortBy === "discount") {
        filteredProducts.sort((a, b) => b.discount - a.discount);
    } else if (sortBy === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    const activeFiltersCount =
        selectedSubcategories.length +
        selectedBrands.length +
        (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0) +
        (showOnSale ? 1 : 0) +
        (showInStock ? 1 : 0);

    const banner = categoryBanners[category] || categoryBanners["Vegetables"];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="relative h-64 overflow-hidden">
                <Image src={banner.image}
                    alt={category}
                    height={200}
                    width={1600}
                    className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-center container mx-auto px-4">
                    <div className="max-w-2xl">
                        <span className="text-6xl mb-3 block">{categoryEmojis[category]}</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
                            {category}
                        </h1>
                        <p className="text-lg text-gray-200">{banner.description}</p>
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
                        <span className="text-gray-800 font-semibold">{category}</span>
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
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden lg:sticky lg:top-40 h-full lg:h-auto flex flex-col lg:max-h-[calc(100vh-6rem)]">
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
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="w-full mb-4 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X size={16} />
                                        Clear All Filters ({activeFiltersCount})
                                    </button>
                                )}

                                {/* Subcategories */}
                                {subcategoriesWithCounts.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="font-bold text-sm text-gray-800 mb-3">
                                            Subcategories
                                        </h3>
                                        <div className="space-y-2">
                                            {subcategoriesWithCounts.map((sub) => (
                                                <label
                                                    key={sub.name}
                                                    className="flex items-center justify-between gap-2 cursor-pointer group"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedSubcategories.includes(sub.name)}
                                                            onChange={() => toggleSubcategory(sub.name)}
                                                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                                        />
                                                        <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                                                            {sub.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-gray-400">({sub.count})</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Brands */}
                                {brands.length > 1 && (
                                    <div className="mb-6">
                                        <h3 className="font-bold text-sm text-gray-800 mb-3">Brands</h3>
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
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-semibold text-gray-700 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="newest">Newest First</option>
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

                        {/* Products Grid/List */}
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                                <div className="text-6xl mb-4">{categoryEmojis[category]}</div>
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
                            <div
                                className={
                                    viewMode === "grid"
                                        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
                                        : "flex flex-col gap-5"
                                }
                            >
                                {filteredProducts.map((product) =>
                                    viewMode === "grid" ? (
                                        <ProductCardGrid
                                            key={product.id}
                                            product={product}
                                            onAddToCart={addToCart}
                                            onToggleWishlist={toggleWishlist}
                                            isWishlisted={wishlist.includes(product.id)}
                                        />
                                    ) : (
                                        <ProductCardList
                                            key={product.id}
                                            product={product}
                                            onAddToCart={addToCart}
                                            onToggleWishlist={toggleWishlist}
                                            isWishlisted={wishlist.includes(product.id)}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
