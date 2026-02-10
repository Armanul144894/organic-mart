"use client";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Sparkles,
  Package,
  MapPin,
  Settings,
} from "lucide-react";
import Link from "next/link";
import CartOffcanvas from "./CartOffcanvas";
import categories from "@/data/categories";
import SignInModal from "./SignInModal";
import Image from "next/image";

function UserDropdown({ user, onSignOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItems = [
    { href: "#", icon: User, label: "My Account" },
    { href: "#", icon: Package, label: "My Orders" },
    { href: "#", icon: Heart, label: "Wishlist" },
    { href: "#", icon: MapPin, label: "Addresses" },
    { href: "#", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all text-gray-600 hover:bg-gray-100 hover:text-emerald-600"
      >
        {/* Avatar or icon */}
        <div className="relative">
          {user.avatar ? (
            <Image
              src={user.avatar}
              height={40}
              width={40}
              alt={user.name}
              className="w-6 h-6 rounded-full object-cover ring-2 ring-emerald-400 ring-offset-1"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold leading-none">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {/* Online dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
        </div>
        <span className="text-xs font-semibold flex items-center gap-0.5">
          Account{" "}
          <ChevronDown
            size={10}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          style={{ animation: "dropDown 0.18s cubic-bezier(0.34,1.56,0.64,1)" }}
        >
          {/* User info header */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-5 py-4">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-11 h-11 rounded-xl object-cover shadow-md"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-bold text-white text-sm">{user.name}</p>
                <p className="text-emerald-100 text-xs">{user.phone}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Sparkles size={10} className="text-yellow-300" />
                  <span className="text-yellow-200 text-xs font-semibold">
                    Gold Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="p-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors group"
              >
                <item.icon
                  size={17}
                  className="text-gray-400 group-hover:text-emerald-500 transition-colors"
                />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="px-2 pb-2 border-t border-gray-100 pt-2 mt-0">
            <button
              onClick={() => {
                onSignOut();
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes dropDown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

// ─── CATEGORY DATA WITH SUBCATEGORIES ────────────────────────────────────────
const categoryData = categories;

export default function Header({ cartCount = 3 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Called when sign-in succeeds
  const handleSignInSuccess = (userData) => {
    setUser({
      name: "Rahim Ahmed", // In real app, fetch from API
      phone: userData.phone,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    });
    setSignInOpen(false);
  };

  const handleSignOut = () => setUser(null);

  const navLinks = [
    { label: "🔥 Hot Deals", href: "/products" },
    { label: "🆕 New Arrivals", href: "/products" },
    { label: "🏆 Best Sellers", href: "/products" },
    { label: "💰 Weekly Offers", href: "/products" },
    { label: "🎁 Gift Cards", href: "/products" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        {/* ═══════════ TOP BAR ═══════════ */}
        <div className="bg-emerald-600 text-white text-xs">
          <div className="container mx-auto px-4 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone size={12} /> +880-1234-567890
              </span>
              <span className="hidden md:flex items-center gap-1">
                <Mail size={12} /> support@organicmart.com
              </span>
            </div>
            <div className="flex items-center gap-4 text-emerald-200">
              <Link href="#" className="hover:text-white transition-colors">
                Track Order
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Help
              </Link>
              <span className="border-l border-emerald-400 h-3 mx-1" />
              <Link
                href="#"
                className="hover:text-white transition-colors font-semibold"
              >
                EN
              </Link>
            </div>
          </div>
        </div>

        {/* ═══════════ MAIN HEADER ═══════════ */}
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          {/* logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="text-2xl">🌱</span>
            <span
              className="text-xl font-extrabold text-emerald-600"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              OrganicMart
            </span>
          </Link>

          {/* search - hidden on mobile */}
          <div className="flex-1 max-w-xl hidden lg:flex">
            <input
              type="text"
              placeholder="Search for products, brands and more…"
              className="flex-1 border border-gray-200 rounded-l-xl px-4 py-2 text-sm outline-none focus:border-emerald-400 transition-colors"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white px-4 rounded-r-xl flex items-center">
              <Search size={18} />
            </button>
          </div>

          {/* actions - hidden on small screens */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            {/* ── ACCOUNT BUTTON ── */}
            {user ? (
              // Signed in → show dropdown
              <UserDropdown user={user} onSignOut={handleSignOut} />
            ) : (
              // Signed out → open modal
              <button
                onClick={() => setSignInOpen(true)}
                className="relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors text-gray-600 hover:bg-gray-100 hover:text-emerald-600"
              >
                <User size={20} />
                <span className="text-xs font-semibold hidden sm:block">
                  Account
                </span>
              </button>
            )}

            <button
              className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors 
                   text-gray-600 hover:bg-gray-100`}
            >
              <Heart size={20} />
              <span className="text-xs font-semibold">Wishlist</span>
              <span
                className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                style={{ width: 18, height: 18, fontSize: 10 }}
              >
                3
              </span>
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-xs font-semibold">Cart</span>
            </button>
          </div>

          {/* mobile hamburger */}
          <button
            className="lg:hidden ml-auto text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ═══════════ DESKTOP NAVIGATION ═══════════ */}
        <div className="border-t border-gray-100 hidden lg:block">
          <div className="container mx-auto px-4">
            <nav className="flex items-center">
              {/* All Categories with Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setShowCategoryMenu(true)}
                onMouseLeave={() => setShowCategoryMenu(false)}
              >
                <button className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <Menu size={16} /> All Categories
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showCategoryMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                {showCategoryMenu && (
                  <div className="absolute left-0 top-full w-[700px] lg:w-[980px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4 z-50">
                    {categoryData.map((cat) => (
                      <div key={cat.id} className="group">
                        <Link
                          href={`/${cat.name
                            .toLowerCase()
                            .replace(/&/g, "and")
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, "")}`}
                          onClick={() => setShowCategoryMenu(false)}
                          className="flex items-center gap-2 font-bold text-gray-800 text-sm mb-2 hover:text-emerald-600 transition-colors"
                        >
                          <span className="text-lg">{cat.emoji}</span>
                          {cat.name}
                        </Link>
                        <ul className="space-y-1.5 pl-8">
                          {cat.subcategories.map((sub, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/${sub
                                  .toLowerCase()
                                  .replace(/&/g, "and")
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/(^-|-$)/g, "")}`}
                                onClick={() => setShowCategoryMenu(false)}
                                className="text-xs text-gray-500 hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Nav Links */}
              {navLinks.map((n, i) => (
                <Link
                  key={i}
                  href={n.href}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ═══════════ MOBILE SEARCH (visible when menu closed) ═══════════ */}
        {!menuOpen && (
          <div className="lg:hidden container mx-auto border-t border-gray-100 px-4 py-2">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products…"
                className="flex-1 border border-gray-200 rounded-l-xl px-4 py-2 text-sm outline-none focus:border-emerald-400 transition-colors"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white px-4 rounded-r-xl flex items-center">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════ MOBILE OFFCANVAS MENU ═══════════ */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* Offcanvas Panel */}
          <div className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl overflow-y-auto lg:hidden animate-slide-in">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <span className="text-lg font-bold">OrganicMart</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* User Actions */}
            <div className="grid grid-cols-3 gap-2 p-4 border-b border-gray-100">
              {/* Sign in row for mobile */}
              <button
                  onClick={() => {
                    setSignInOpen(true);
                    setMenuOpen(false);
                  }}
                  className="relative text-white flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <Phone size={16} /> Sign In
                </button>

              
              
              <button className="relative text-white flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-50 transition-colors">
                <Heart size={20} />
                <span className="text-xs font-semibold text-gray-50">
                  Wishlist
                </span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <button
                onClick={() => setIsOpen(true) || setMenuOpen(false)}
                className="relative text-white flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <ShoppingCart size={20} />
                <span className="text-xs font-semibold text-gray-50">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Categories with Subcategories */}
            <div className="p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Shop by Category
              </h3>
              <div className="space-y-1">
                {categoryData.map((cat) => (
                  <div key={cat.id}>
                    <button
                      onClick={() =>
                        setActiveMobileCategory(
                          activeMobileCategory === cat.id ? null : cat.id,
                        )
                      }
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                    >
                      <Link
                        href={`/${cat.name
                          .toLowerCase()
                          .replace(/&/g, "and")
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{cat.emoji}</span>
                          {cat.name}
                        </span>
                      </Link>
                      <ChevronRight
                        size={16}
                        className={`transition-transform ${activeMobileCategory === cat.id ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Subcategories */}
                    {activeMobileCategory === cat.id && (
                      <div className="pl-10 pr-3 py-2 space-y-1.5 animate-slide-down">
                        {cat.subcategories.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={`/${sub
                              .toLowerCase()
                              .replace(/&/g, "and")
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/(^-|-$)/g, "")}`}
                            onClick={() => setMenuOpen(false)}
                            className="block text-xs text-gray-500 hover:text-emerald-600 py-1 transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Quick Links
              </h3>
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Contact Us
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-emerald-600" />
                  +880-1234-567890
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-emerald-600" />
                  support@organicmart.com
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <CartOffcanvas isOpen={isOpen} setIsOpen={setIsOpen} />

      <SignInModal
        signInOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSuccess={handleSignInSuccess}
      />
    </>
  );
}
