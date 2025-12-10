import { Product } from './types';

// Import images so Vite includes them in the build output
import p1 from './images/product1.jpeg';
import p2 from './images/product2.jpeg';
import p3 from './images/product3.jpeg';
import p4 from './images/product4.jpeg';
import p5 from './images/product5.jpeg';
import p6 from './images/product6.jpeg';
import p7 from './images/product 7.jpeg';

// Explicit product list generated from images/ directory
// Imported images ensure Vite copies/bundles them into `dist` during build
export const products: Product[] = [
  { id: 1, name: 'Kurthi — Product 1', price: '₹349', image: p1 },
  { id: 2, name: 'Kurthi — Product 2', price: '₹349', image: p2 },
  { id: 3, name: 'Kurthi — Product 3', price: '₹399', image: p3 },
  { id: 4, name: 'Kurthi — Product 4', price: '₹399', image: p4 },
  { id: 5, name: 'Kurthi — Product 5', price: '₹499', image: p5 },
  { id: 6, name: 'Kurthi — Product 6', price: '₹349', image: p6 },
  { id: 7, name: 'Kurthi — Product 7', price: '₹399', image: p7 }
];

export const getProductsForPage = (pageStr: string) => {
  const itemsPerPage = 9;
  let pageNum = 1;
  if (pageStr === 'page2') pageNum = 2;
  if (pageStr === 'page3') pageNum = 3;

  const start = (pageNum - 1) * itemsPerPage;
  return products.slice(start, start + itemsPerPage);
};