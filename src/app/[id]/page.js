// app/[id]/page.js
// Handles both category and product pages with clean URLs
// Examples:
//   /vegetables → Category Page
//   /123 → Product Page

import { notFound } from "next/navigation";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";

// Category mapping (lowercase category names)
const categoryMap = {
  vegetables: "vegetables",
  fruits: "fruits",
  dairy: "dairy",
  grains: "grains",
};

// Check if ID is a number (product)
function isProductId(id) {
  return typeof id === "string" && /^\d+$/.test(id);
}

export default async function Page({ params }) {
  const {id} = await params;

  console.log("PARAMS:", id);

  // Guard: if id is missing
  if (!id || typeof id !== "string") {
    notFound();
  }

  // Product page
  if (isProductId(id)) {
    return <ProductPage productId={Number(id)} />;
  }

  // Category page
  const categoryKey = id.toLowerCase();
  if (categoryMap[categoryKey]) {
    return <CategoryPage categoryId={categoryMap[categoryKey]} />;
  }

  // Not found
  notFound();
}

/* --------------------------------------------------
   Static Params (SSG)
-------------------------------------------------- */
export async function generateStaticParams() {
  const categoryParams = Object.keys(categoryMap).map((category) => ({
    id: category,
  }));

  const productParams = [1, 2, 3, 4, 5, 11, 19, 23].map((id) => ({
    id: id.toString(),
  }));

  return [...categoryParams, ...productParams];
}

/* --------------------------------------------------
   Metadata
-------------------------------------------------- */
export async function generateMetadata({ params }) {
  const {id} = await params;

  if (!id || typeof id !== "string") {
    return {
      title: "Page Not Found - OrganicMart",
    };
  }

  if (isProductId(id)) {
    return {
      title: `Product ${id} - OrganicMart`,
      description: `View details for product ${id}`,
    };
  }

  const categoryKey = id.toLowerCase();
  if (categoryMap[categoryKey]) {
    const categoryName =
      categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

    return {
      title: `${categoryName} - OrganicMart`,
      description: `Browse our fresh ${categoryName}`,
    };
  }

  return {
    title: "Page Not Found - OrganicMart",
  };
}
