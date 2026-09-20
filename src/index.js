/**
 * Joyory Beauty Match - Core Recommendation Engine & Dataset
 *
 * Easy import entry point for frontend developers and microservices.
 */

export { products } from './data/products.js';
export { recommendProducts, scoreProduct } from './engine/recommendationEngine.js';
export { demoProfiles } from './demoProfiles.js';

import { products } from './data/products.js';
import { recommendProducts, scoreProduct } from './engine/recommendationEngine.js';
import { demoProfiles } from './demoProfiles.js';

export default {
  products,
  recommendProducts,
  scoreProduct,
  demoProfiles
};
