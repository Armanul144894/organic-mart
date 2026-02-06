// app/[id]/page.js
import { notFound } from "next/navigation";
import CategoryPage from "./components/CategoryPage";
import SubcategoryPage from "./components/SubcategoryPage";
import ProductPage from "./components/ProductPage";
import products from "@/data/products"; // Import your products data
import categories from "@/data/categories"; // Import your categories data

// Category mapping (lowercase category names with URL-friendly slugs)
const categoryMap = {
  vegetables: "Vegetables",
  fruits: "Fruits",
  dairy: "Dairy",
  grains: "Grains",
  bakery: "Bakery",
  "meat-and-fish": "Meat & Fish",
  meat: "Meat & Fish", // Alternative slug
  beverages: "Beverages",
  snacks: "Snacks",
  "cooking-and-spices": "Cooking & Spices",
};

// Subcategory mapping - maps URL slug to actual subcategory name
const subcategoryMap = {
  // Vegetables
  "leafy-greens": "Leafy Greens",
  "root-vegetables": "Root Vegetables",
  cruciferous: "Cruciferous",
  nightshades: "Nightshades",
  herbs: "Herbs",
  "exotic-vegetables": "Exotic Vegetables",
  
  // Fruits
  "tropical-fruits": "Tropical Fruits",
  "citrus-fruits": "Citrus Fruits",
  berries: "Berries",
  "stone-fruits": "Stone Fruits",
  melons: "Melons",
  "exotic-fruits": "Exotic Fruits",
  
  // Dairy
  "milk-and-cream": "Milk & Cream",
  cheese: "Cheese",
  yogurt: "Yogurt",
  "butter-and-ghee": "Butter & Ghee",
  eggs: "Eggs",
  "plant-based-dairy": "Plant-Based Dairy",
  
  // Bakery
  bread: "Bread",
  "cakes-and-pastries": "Cakes & Pastries",
  cookies: "Cookies",
  "buns-and-rolls": "Buns & Rolls",
  donuts: "Donuts",
  "specialty-breads": "Specialty Breads",
  
  // Meat & Fish
  chicken: "Chicken",
  beef: "Beef",
  mutton: "Mutton",
  "fresh-fish": "Fresh Fish",
  "frozen-fish": "Frozen Fish",
  seafood: "Seafood",
  
  // Beverages
  "tea-and-coffee": "Tea & Coffee",
  juices: "Juices",
  "soft-drinks": "Soft Drinks",
  "energy-drinks": "Energy Drinks",
  water: "Water",
  "health-drinks": "Health Drinks",
  
  // Snacks
  "chips-and-crisps": "Chips & Crisps",
  "biscuits-and-cookies": "Biscuits & Cookies",
  namkeen: "Namkeen",
  chocolates: "Chocolates",
  "nuts-and-seeds": "Nuts & Seeds",
  "healthy-snacks": "Healthy Snacks",
  
  // Grains
  rice: "Rice",
  "wheat-flour": "Wheat & Flour",
  "pulses-and-lentils": "Pulses & Lentils",
  "oats-and-cereals": "Oats & Cereals",
  "pasta-and-noodles": "Pasta & Noodles",
  "specialty-grains": "Specialty Grains",
  
  // Cooking & Spices
  "cooking-oil": "Cooking Oil",
  spices: "Spices",
  "salt-and-sugar": "Salt & Sugar",
  "sauces-and-condiments": "Sauces & Condiments",
  masalas: "Masalas",
  "vinegar-and-pickles": "Vinegar & Pickles",
};

// Helper function to create URL-friendly slug
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Check if slug exists in products
function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

// Get category by slug
function getCategoryBySlug(slug) {
  const categoryName = categoryMap[slug];
  if (!categoryName) return null;
  
  return categories.find((cat) => cat.name === categoryName);
}

// Get subcategory info
function getSubcategoryInfo(subcategorySlug) {
  const subcategoryName = subcategoryMap[subcategorySlug];
  if (!subcategoryName) return null;
  
  // Find which category this subcategory belongs to
  const category = categories.find((cat) =>
    cat.subcategories.includes(subcategoryName)
  );
  
  if (!category) return null;
  
  return {
    name: subcategoryName,
    category: category.name,
    categorySlug: createSlug(category.name),
  };
}

// Get products by subcategory
function getProductsBySubcategory(subcategoryName) {
  return products.filter((product) => product.subcategory === subcategoryName);
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

  // Check if it's a subcategory
  const subcategoryInfo = getSubcategoryInfo(id);
  if (subcategoryInfo) {
    const subcategoryProducts = getProductsBySubcategory(subcategoryInfo.name);
    return (
      <SubcategoryPage
        subcategory={subcategoryInfo.name}
        category={subcategoryInfo.category}
        categorySlug={subcategoryInfo.categorySlug}
        products={subcategoryProducts}
      />
    );
  }

  // Check if it's a category
  const categoryKey = id.toLowerCase();
  if (categoryMap[categoryKey]) {
    const category = getCategoryBySlug(categoryKey);
    return <CategoryPage category={categoryMap[categoryKey]} categoryData={category} />;
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

  // Generate params for all subcategories
  const subcategoryParams = Object.keys(subcategoryMap).map((subcategory) => ({
    id: subcategory,
  }));

  // Generate params for all products using their slugs
  const productParams = products.map((product) => ({
    id: product.slug,
  }));

  return [...categoryParams, ...subcategoryParams, ...productParams];
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
      openGraph: {
        title: product.name,
        description: product.description,
        images: [product.images[0]],
      },
    };
  }

  // Check if it's a subcategory
  const subcategoryInfo = getSubcategoryInfo(id);
  if (subcategoryInfo) {
    const productCount = getProductsBySubcategory(subcategoryInfo.name).length;
    return {
      title: `${subcategoryInfo.name} - ${subcategoryInfo.category} - OrganicMart`,
      description: `Browse ${productCount} fresh ${subcategoryInfo.name.toLowerCase()} products in our ${subcategoryInfo.category} category`,
    };
  }

  // Check if it's a category
  const categoryKey = id.toLowerCase();
  if (categoryMap[categoryKey]) {
    const categoryName = categoryMap[categoryKey];
    const categoryProducts = products.filter((p) => p.category === categoryName);
    return {
      title: `${categoryName} - OrganicMart`,
      description: `Browse our fresh ${categoryName} - ${categoryProducts.length} products available`,
    };
  }

  return {
    title: "Page Not Found - OrganicMart",
  };
}