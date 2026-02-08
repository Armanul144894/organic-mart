import React from "react";
import Category from "./Category";
export const metadata = {
  title: "Popular Categories - OrganicMart",
  description: "Shop from OrganicMart",
};
export default function page() {
    
  return (
    <div className="min-h-screen bg-gray-50">
      <Category />
    </div>
  );
}
