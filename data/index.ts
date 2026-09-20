/**
 * Joyory Beauty Match - Frontend Data Layer Export
 * References the existing product dataset from src/data/
 */

import { products as rawProducts } from '../src/data/products.js';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category:
    | 'cleanser'
    | 'serum'
    | 'moisturizer'
    | 'sunscreen'
    | 'shampoo'
    | 'conditioner'
    | 'hair serum'
    | 'body care';
  price: number;
  description: string;
  ingredients: string[];
  benefits: string[];
  skinOrHairType: string[];
  concerns: string[];
  tags: string[];
  rating: number;
  image: string;
}

export const products: Product[] = rawProducts as Product[];

export default products;
