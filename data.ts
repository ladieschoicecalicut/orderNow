import { Product } from './types';

// Explicit product list generated from images/ directory
// If image contains a visible price this should be set manually; default price is ₹399
export const products: Product[] = [
  { id: 1, name: 'Kurthi — Product 1', price: '₹399', image: 'images/product1.jpeg' },
  { id: 2, name: 'Kurthi — Product 2', price: '₹399', image: 'images/product2.jpeg' },
  { id: 3, name: 'Kurthi — Product 3', price: '₹399', image: 'images/product3.jpeg' },
  { id: 4, name: 'Kurthi — Product 4', price: '₹399', image: 'images/product4.jpeg' },
  { id: 5, name: 'Kurthi — Product 5', price: '₹399', image: 'images/product5.jpeg' },
  { id: 6, name: 'Kurthi — Product 6', price: '₹399', image: 'images/product6.jpeg' },
  { id: 7, name: 'Kurthi — Product 7', price: '₹399', image: 'images/product 7.jpeg' }
];

export const getProductsForPage = (pageStr: string) => {
  const itemsPerPage = 9;
  let pageNum = 1;
  if (pageStr === 'page2') pageNum = 2;
  if (pageStr === 'page3') pageNum = 3;

  const start = (pageNum - 1) * itemsPerPage;
  return products.slice(start, start + itemsPerPage);
};