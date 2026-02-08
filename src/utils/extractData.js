// utils/extractData.js

import products from "@/data/products";

// Helper to create slug
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Extract unique categories with their data
export function extractCategories() {
  const categoryMap = {};
  
  products.forEach(product => {
    const categorySlug = createSlug(product.category);
    
    if (!categoryMap[categorySlug]) {
      categoryMap[categorySlug] = {
        slug: categorySlug,
        name: product.category,
        productCount: 0,
        subcategories: new Set(),
      };
    }
    
    categoryMap[categorySlug].productCount++;
    
    if (product.subcategory) {
      categoryMap[categorySlug].subcategories.add(product.subcategory);
    }
  });
  
  // Convert Sets to Arrays
  Object.keys(categoryMap).forEach(slug => {
    categoryMap[slug].subcategories = Array.from(categoryMap[slug].subcategories);
  });
  
  return categoryMap;
}

// Extract unique subcategories with their data
export function extractSubcategories() {
  const subcategoryMap = {};
  
  products.forEach(product => {
    if (product.subcategory) {
      const subcategorySlug = createSlug(product.subcategory);
      
      if (!subcategoryMap[subcategorySlug]) {
        subcategoryMap[subcategorySlug] = {
          slug: subcategorySlug,
          name: product.subcategory,
          category: product.category,
          categorySlug: createSlug(product.category),
          productCount: 0,
        };
      }
      
      subcategoryMap[subcategorySlug].productCount++;
    }
  });
  
  return subcategoryMap;
}

// Extract unique brands with their data
export function extractBrands() {
  const brandMap = {};
  
  products.forEach(product => {
    const brandSlug = createSlug(product.brand);
    
    if (!brandMap[brandSlug]) {
      brandMap[brandSlug] = {
        slug: brandSlug,
        name: product.brand,
        productCount: 0,
        categories: new Set(),
      };
    }
    
    brandMap[brandSlug].productCount++;
    brandMap[brandSlug].categories.add(product.category);
  });
  
  // Convert Sets to Arrays and add colors
  const brandColors = {
    'pran-foods': '#10b981',
    'nestle': '#ef4444',
    'aci-limited': '#3b82f6',
    'arla-dairy': '#f59e0b',
    'fresh-foods': '#8b5cf6',
  };
  
  Object.keys(brandMap).forEach(slug => {
    brandMap[slug].categories = Array.from(brandMap[slug].categories);
    brandMap[slug].color = brandColors[slug] || '#10b981';
  });
  
  return brandMap;
}

// Get all data
export function getAllMappings() {
  return {
    categories: extractCategories(),
    subcategories: extractSubcategories(),
    brands: extractBrands(),
  };
}

// Print all mappings (for debugging)
export function printAllMappings() {
  const { categories, subcategories, brands } = getAllMappings();
  
  console.log('\n=== CATEGORIES ===');
  Object.entries(categories).forEach(([slug, data]) => {
    console.log(`${slug}: "${data.name}" (${data.productCount} products)`);
  });
  
  console.log('\n=== SUBCATEGORIES ===');
  Object.entries(subcategories).forEach(([slug, data]) => {
    console.log(`${slug}: "${data.name}" in ${data.category} (${data.productCount} products)`);
  });
  
  console.log('\n=== BRANDS ===');
  Object.entries(brands).forEach(([slug, data]) => {
    console.log(`${slug}: "${data.name}" (${data.productCount} products)`);
  });
}