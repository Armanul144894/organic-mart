// app/[id]/page.js
import { notFound } from "next/navigation";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import products from "@/data/products"; // Import your products data

// Category mapping (lowercase category names)
const categoryMap = {
  vegetables: "Vegetables",
  fruits: "Fruits",
  dairy: "Dairy",
  grains: "Grains",
  bakery: "Bakery",
  "meat-and-fish": "Meat",
  beverages: "Beverages",
  snacks: "Snacks",
  "cooking-and-spices": "Cooking & Spices",
};

// Check if slug exists in products
function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export default async function Page({ params }) {
  const { id } = await params;
  
  console.log("PARAMS:", id);

  // Guard: if id is missing
  if (!id || typeof id !== "string") {
    notFound();
  }

  // Check if it's a product slug
  const product = getProductBySlug(id);
  if (product) {
    return <ProductPage productSlug={id} />;
  }

  // Check if it's a category
  const categoryKey = id.toLowerCase();
  if (categoryMap[categoryKey]) {
    return <CategoryPage category={categoryMap[categoryKey]} />;
  }

  // Not found
  notFound();
}

/* -------------------------------------------------- 
   Static Params (SSG) 
-------------------------------------------------- */
export async function generateStaticParams() {
  // Generate params for all categories
  const categoryParams = Object.keys(categoryMap).map((category) => ({
    id: category,
  }));

  // Generate params for all products using their slugs
  const productParams = products.map((product) => ({
    id: product.slug,
  }));

  return [...categoryParams, ...productParams];
}

/* -------------------------------------------------- 
   Metadata 
-------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return {
      title: "Page Not Found - OrganicMart",
    };
  }

  // Check if it's a product
  const product = getProductBySlug(id);
  if (product) {
    return {
      title: `${product.name} - OrganicMart`,
      description: product.description,
    };
  }

  // Check if it's a category
  const categoryKey = id.toLowerCase();
  if (categoryMap[categoryKey]) {
    const categoryName = categoryMap[categoryKey];
    return {
      title: `${categoryName} - OrganicMart`,
      description: `Browse our fresh ${categoryName}`,
    };
  }

  return {
    title: "Page Not Found - OrganicMart",
  };
}