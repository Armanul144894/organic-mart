import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 mt-4">
        <div className="container mx-auto px-4 pt-12 pb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* about */}
            <div>
              <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <span className="text-xl">🌱</span> OrganicMart
              </h4>
              <p className="text-xs leading-relaxed">
                Your trusted online grocery store delivering fresh products to
                your doorstep since 2020.
              </p>
              <div className="flex gap-2.5 mt-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            {/* quick links */}
            <div>
              <h4 className="text-white font-bold text-base mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs">
                {[
                  "About Us",
                  "Contact Us",
                  "Track Order",
                  "Privacy Policy",
                  "Terms & Conditions",
                ].map((l, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* categories */}
            <div>
              <h4 className="text-white font-bold text-base mb-4">
                Categories
              </h4>
              <ul className="space-y-2 text-xs">
                {[
                  "Vegetables",
                  "Fruits",
                  "Dairy Products",
                  "Bakery Items",
                  "Beverages",
                  "Snacks",
                ].map((l, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* contact */}
            <div>
              <h4 className="text-white font-bold text-base mb-4">
                Contact Info
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-start gap-2">
                  <MapPin
                    size={13}
                    className="text-emerald-400 mt-0.5 shrink-0"
                  />{" "}
                  123 Market Street, Dhaka, Bangladesh
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={13} className="text-emerald-400 shrink-0" />{" "}
                  +880-1234-567890
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={13} className="text-emerald-400 shrink-0" />{" "}
                  support@OrganicMart.com
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={13} className="text-emerald-400 shrink-0" />{" "}
                  Mon–Sat: 8 AM – 10 PM
                </li>
              </ul>
            </div>
          </div>

          {/* bottom bar */}
          <div className="border-t border-gray-800 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>© 2024 OrganicMart. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <span>We Accept:</span>
              {["VISA", "MC", "bKash"].map((m, i) => (
                <span
                  key={i}
                  className="bg-gray-700 text-gray-300 font-bold text-[10px] px-2.5 py-1 rounded"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
