'use client'
import { useMemo, useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import products from "@/data/products";
import Image from "next/image";
import RelatedProduct from "./RelatedProduct";

// ─── ALL PRODUCTS DATA ───────────────────────────────────────────────────────
const allProductsData = products;

// ─── CUSTOMER REVIEWS ────────────────────────────────────────────────────────
const customerReviews = [
  { id: 1, name: "Sarah Johnson", rating: 5, date: "2 days ago", comment: "Absolutely fresh and delicious! The quality is outstanding. Will definitely order again.", verified: true },
  { id: 2, name: "Ahmed Khan", rating: 4, date: "1 week ago", comment: "Good quality products. Fast delivery. Satisfied with my purchase.", verified: true },
  { id: 3, name: "Maria Garcia", rating: 5, date: "2 weeks ago", comment: "Best organic tomatoes I've ever bought! So flavorful and fresh.", verified: true },
];

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function StarRating({ rating, size = 16, showNumber = false }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
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
      {showNumber && (
        <span className="text-sm font-semibold text-gray-700">{rating}</span>
      )}
    </div>
  );
}

// ─── PRODUCT PAGE COMPONENT ──────────────────────────────────────────────────
export default function ProductPage({ productSlug }) {
  const product = allProductsData.find((p) => p.name.toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === productSlug);

  // If product not found, show 404
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Product not found</p>
          <Link
            href="/products"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const selectedProduct = useMemo(() => {
    return allProductsData.find(
      (p) =>
        p?.name
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === productSlug
    );
  }, [productSlug]);

  const category = selectedProduct?.category.toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");


  const relatedProducts = allProductsData.filter(
      (p) =>
        p?.name !== selectedProduct?.name && 
        p?.category
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === category
    );


  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const incrementQuantity = () => {
    if (quantity < product.stockCount) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.name} to cart`);
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  const handleShare = (platform) => {
    console.log(`Sharing on ${platform}`);
    alert(`Sharing on ${platform}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <Link
              href={`/${product.category.toLowerCase()}`}
              className="hover:text-emerald-600 transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-800 font-semibold truncate max-w-xs">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4 relative group">
              <Image  
              src={product.images[selectedImage]}
                alt={product.name}
                height={300}
                width={600}
                className="w-full md:h-[500px] aspect-square object-cover"/>
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
                  -{product.discount}% OFF
                </span>
              )}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  size={24}
                  className={
                    wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
                  }
                />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
                    selectedImage === idx
                      ? "border-emerald-600 shadow-md"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <Image src={img}
                    alt={`${product.name} ${idx + 1}`}
                    height={200}
                    width={200}
                    className="w-full aspect-square object-cover"/>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
              {/* Brand */}
              <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wide mb-2">
                {product.brand}
              </p>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-3">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} size={18} showNumber />
                <span className="text-sm text-gray-500">
                  ({product.reviews} reviews)
                </span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
                <span className="text-4xl font-extrabold text-emerald-600">
                  ৳{product.price}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ৳{product.oldPrice}
                    </span>
                    <span className="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-1 rounded-lg">
                      Save ৳{product.oldPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      product.inStock ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      product.inStock ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock
                      ? `In Stock (${product.stockCount} available)`
                      : "Out of Stock"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Weight: {product.weight}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="px-4 py-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setQuantity(
                          Math.min(Math.max(1, val), product.stockCount)
                        );
                      }}
                      className="w-16 text-center font-bold text-lg outline-none"
                    />
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stockCount}
                      className="px-4 py-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Total: ৳{product.price * quantity}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="px-6 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold rounded-xl transition-colors">
                  Buy Now
                </button>
              </div>

              {/* Share */}
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Share this product
                </p>
                <div className="flex gap-2">
                  {[
                    { icon: <Facebook size={18} />, name: "facebook" },
                    { icon: <Twitter size={18} />, name: "twitter" },
                    { icon: <Share2 size={18} />, name: "whatsapp" },
                    { icon: <LinkIcon size={18} />, name: "copy" },
                  ].map((social, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleShare(social.name)}
                      className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: <Truck size={24} />, text: "Free Delivery" },
                { icon: <RotateCcw size={24} />, text: "Easy Returns" },
                { icon: <ShieldCheck size={24} />, text: "Secure Payment" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-100 p-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-emerald-600 flex justify-center mb-2">
                    {feature.icon}
                  </div>
                  <p className="text-xs font-semibold text-gray-700">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-12">
          {/* Tab Headers */}
          <div className="border-b border-gray-100">
            <div className="flex gap-8 px-6">
              {[
                { id: "description", label: "Description" },
                { id: "features", label: "Features" },
                { id: "nutrition", label: "Nutrition Facts" },
                { id: "reviews", label: `Reviews (${customerReviews.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 font-semibold text-sm relative transition-colors ${
                    activeTab === tab.id
                      ? "text-emerald-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "features" && (
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "nutrition" && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(product.nutritionFacts).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-emerald-600 mb-1">
                      {value}
                    </p>
                    <p className="text-xs font-semibold text-gray-600 uppercase">
                      {key}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {customerReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800">
                            {review.name}
                          </h4>
                          {review.verified && (
                            <span className="bg-emerald-100 text-emerald-600 text-xs font-semibold px-2 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <StarRating rating={review.rating} size={14} />
                      </div>
                      <span className="text-sm text-gray-400">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProduct relatedProducts={relatedProducts}/>
      </div>
    </div>
  );
}