"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Home,
  SlidersHorizontal,
  Grid3x3,
  List,
  Star,
  Heart,
  Plus,
  ArrowUpDown,
  X,
} from "lucide-react";
import ProductGridCard from "./ProductGridCard";
import ProductListCard from "./ProductListCard";
import StarRating from "@/app/components/StarRating";

export default function SubcategoryPage({
  subcategory,
  category,
  categorySlug,
  products,
}) {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showInStock, setShowInStock] = useState(false);

  // Get unique brands
  const brands = [...new Set(products.map((p) => p.brand))];

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ৳50", value: "under-50", min: 0, max: 50 },
    { label: "৳50 - ৳100", value: "50-100", min: 50, max: 100 },
    { label: "৳100 - ৳200", value: "100-200", min: 100, max: 200 },
    { label: "Above ৳200", value: "above-200", min: 200, max: 999999 },
  ];

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const clearFilters = () => {
    setPriceRange("all");
    setSelectedBrands([]);
    setMinRating(0);
    setShowOnSale(false);
    setShowInStock(false);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const addToCart = (product) => {
    console.log("Added to cart:", product);
  };

  // Apply filters
  let filteredProducts = products.filter((p) => {
    if (selectedBrands.length && !selectedBrands.includes(p.brand))
      return false;

    const selectedRange = priceRanges.find((r) => r.value === priceRange);
    if (selectedRange && selectedRange.min !== undefined) {
      if (p.price < selectedRange.min || p.price > selectedRange.max)
        return false;
    }

    if (minRating > 0 && p.rating < minRating) return false;
    if (showOnSale && p.discount === 0) return false;
    if (showInStock && !p.inStock) return false;

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
  }

  const activeFiltersCount =
    selectedBrands.length +
    (priceRange !== "all" ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (showOnSale ? 1 : 0) +
    (showInStock ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/${category
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")}`}
              className="hover:text-emerald-600 transition-colors"
            >
              {category}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold">{subcategory}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {subcategory}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} available
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-64 bg-white lg:bg-transparent z-40 lg:z-0 shadow-2xl lg:shadow-none`}
          >
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden lg:sticky lg:top-40 h-full lg:h-auto flex flex-col lg:max-h-[calc(100vh-10rem)]">
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

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm text-gray-800 mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.value}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={priceRange === range.value}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
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

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm text-gray-800 mb-3">
                    Minimum Rating
                  </h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                        />
                        <div className="flex items-center gap-1">
                          <StarRating rating={rating} size={14} />
                          <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                            & Up
                          </span>
                        </div>
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
                  </select>
                  <ArrowUpDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>

                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-emerald-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
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
                <div className="text-6xl mb-4">🔍</div>
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
                    <ProductGridCard key={product.id} product={product} />
                  ) : (
                    <ProductListCard key={product.id} product={product} />
                  ),
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
