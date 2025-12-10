import { Product } from './types';

// Helper to generate products
const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Model No. ${i + 1} - Elegant Design`,
    price: `₹${(Math.floor(Math.random() * 15) + 5) * 100 + 90}`, // Random price 590 - 2090
    image: `images/model${(i % 5) + 1}.jpg` // Cycles through 5 placeholder names
  }));
};

export const products: Product[] = generateProducts(30);

export const getProductsForPage = (pageStr: string) => {
  const itemsPerPage = 9;
  let pageNum = 1;
  if (pageStr === 'page2') pageNum = 2;
  if (pageStr === 'page3') pageNum = 3;

  const start = (pageNum - 1) * itemsPerPage;
  return products.slice(start, start + itemsPerPage);
};