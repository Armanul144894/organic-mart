"use client";
import { useState, useEffect } from "react";
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
  Award,
  Package,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import ProductGridCard from "./ProductGridCard";
import ProductListCard from "./ProductListCard";

// Helper to create slug from name

// ─── BRAND PAGE COMPONENT ─────────────────────────────────────────────────────
export default function BrandPage({ brand, products: brandProducts }) {
  // Calculate price range from products
  const minPrice = Math.min(...brandProducts.map((p) => p.price));
  const maxPrice = Math.max(...brandProducts.map((p) => p.price));

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // Get unique categories for this brand
  const categories = [...new Set(brandProducts.map((p) => p.category))];

  // Calculate stats
  const totalProducts = brandProducts.length;
  const averageRating = (
    brandProducts.reduce((acc, p) => acc + p.rating, 0) / totalProducts
  ).toFixed(1);
  const onSaleCount = brandProducts.filter((p) => p.discount > 0).length;

  // Update price range when products change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Filter products
  let filteredProducts = brandProducts.filter((p) => {
    if (selectedCategories.length && !selectedCategories.includes(p.category))
      return false;
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
  } else if (sortBy === "discount") {
    filteredProducts.sort((a, b) => b.discount - a.discount);
  } else if (sortBy === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setShowOnSale(false);
    setShowInStock(false);
  };

  const activeFiltersCount =
    selectedCategories.length +
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0) +
    (showOnSale ? 1 : 0) +
    (showInStock ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div
        className="relative h-72 overflow-hidden"
        style={{ backgroundColor: brand.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Award size={20} className="text-white" />
              <span className="text-white font-semibold text-sm">
                Official Brand Store
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              {brand.name}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Discover {totalProducts} premium products from one of the most
              trusted brands
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Package className="text-white" size={20} />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {totalProducts}
                  </p>
                  <p className="text-xs text-white/80">Products</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Star className="text-yellow-300 fill-yellow-300" size={20} />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {averageRating}
                  </p>
                  <p className="text-xs text-white/80">Avg Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <TrendingUp className="text-white" size={20} />
                <div>
                  <p className="text-2xl font-bold text-white">{onSaleCount}</p>
                  <p className="text-xs text-white/80">On Sale</p>
                </div>
              </div>
            </div>
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
            <Link
              href="/brands"
              className="hover:text-emerald-600 transition-colors"
            >
              Brands
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-800 font-semibold">{brand.name}</span>
          </div>
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
                    Clear Filters ({activeFiltersCount})
                  </button>
                )}

                {/* Categories */}
                {categories.length > 1 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-sm text-gray-800 mb-3">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                            {category}
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
                        onChange={(e) =>
                          setPriceRange([+e.target.value, priceRange[1]])
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Min"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], +e.target.value])
                        }
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
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
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
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <ProductGridCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {filteredProducts.map((product) => (
                  <ProductListCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
