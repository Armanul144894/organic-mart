'use client'
import { Heart, Mail, Menu, Phone, Search, ShoppingCart, User, X } from "lucide-react";
import React, { useState } from "react";

export default function Header() {
      // ── mobile menu ──
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: "All Categories", icon: <Menu size={16} /> },
    { label: "🔥 Hot Deals" },
    { label: "🆕 New Arrivals" },
    { label: "🏆 Best Sellers" },
    { label: "💰 Weekly Offers" },
    { label: "🎁 Gift Cards" },
  ];
  return (
    <div className="" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* top-bar */}
        <div className="bg-emerald-600 text-white text-xs">
          <div className="container mx-auto px-4 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone size={12} /> +880-1234-567890
              </span>
              <span className="flex items-center gap-1">
                <Mail size={12} /> support@OrganicMart.com
              </span>
            </div>
            <div className="flex items-center gap-4 text-emerald-200">
              <a href="#" className="hover:text-white transition-colors">
                Track Order
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Help
              </a>
              <span className="border-l border-emerald-400 h-3 mx-1" />
              <a
                href="#"
                className="hover:text-white transition-colors font-semibold"
              >
                EN
              </a>
            </div>
          </div>
        </div>

        {/* main header */}
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          {/* logo */}
          <a href="#" className="flex items-center gap-1.5 shrink-0">
            <span className="text-2xl">🌱</span>
            <span
              className="text-xl font-extrabold text-emerald-600"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              OrganicMart
            </span>
          </a>

          {/* search */}
          <div className="flex-1 max-w-xl flex">
            <input
              type="text"
              placeholder="Search for products, brands and more…"
              className="flex-1 border border-gray-200 rounded-l-xl px-4 py-2 text-sm outline-none focus:border-emerald-400 transition-colors"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white px-4 rounded-r-xl flex items-center">
              <Search size={18} />
            </button>
          </div>

          {/* actions */}
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            {[
              { icon: <User size={20} />, label: "Account", badge: null },
              { icon: <Heart size={20} />, label: "Wishlist", badge: 3 },
              {
                icon: <ShoppingCart size={20} />,
                label: "Cart",
                badge: 5,
                primary: true,
              },
            ].map((a, i) => (
              <button
                key={i}
                className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors ${a.primary ? "bg-emerald-600 text-white hover:bg-emerald-700" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {a.icon}
                <span className="text-xs font-semibold">{a.label}</span>
                {a.badge && (
                  <span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center"
                    style={{ width: 18, height: 18, fontSize: 10 }}
                  >
                    {a.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* mobile hamburger */}
          <button
            className="sm:hidden ml-auto text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* nav bar */}
        <div
          className={`border-t border-gray-100 overflow-hidden ${menuOpen ? "block" : "hidden"} sm:block`}
        >
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
    </div>
  );
}
