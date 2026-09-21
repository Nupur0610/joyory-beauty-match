export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image?: string;
  role?: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Cash on Delivery';
  estimatedDelivery: string;
}

const ORDER_STORAGE_KEY = 'joyory_latest_order';
const CART_STORAGE_KEY = 'joyory_cart_items';

export const DEFAULT_SAMPLE_ITEMS: OrderItem[] = [
  {
    id: 'prod-sr-01',
    name: '2% Salicylic Acid + LHA Anti-Acne Serum',
    brand: 'Minimalist',
    price: 549,
    quantity: 1,
    role: 'Active Blemish Treatment',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prod-sn-01',
    name: 'Matte Finish Ultra-Light Sunscreen Gel SPF 50',
    brand: 'Joyory',
    price: 549,
    quantity: 1,
    role: 'UV Defense & Oil Control',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prod-cl-01',
    name: 'Clarifying Salicylic Gel Cleanser',
    brand: 'Joyory',
    price: 449,
    quantity: 1,
    role: 'Gentle Pore Cleansing',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
  },
];

// Order Helpers
export function saveOrderToStorage(order: OrderRecord): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    } catch (e) {
      console.error('Failed to save order to localStorage:', e);
    }
  }
}

export function getOrderFromStorage(): OrderRecord | null {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(ORDER_STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as OrderRecord;
      }
    } catch (e) {
      console.error('Failed to retrieve order from localStorage:', e);
    }
  }
  return null;
}

// Cart Helpers
export function getCartFromStorage(): OrderItem[] {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to retrieve cart from localStorage:', e);
    }
  }
  return [];
}

export function saveCartToStorage(items: OrderItem[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event('joyory_cart_updated'));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }
}

export function addToCart(item: OrderItem, replaceAll = false): void {
  if (replaceAll) {
    saveCartToStorage([{ ...item, quantity: item.quantity || 1 }]);
    return;
  }
  const current = getCartFromStorage();
  const existingIdx = current.findIndex(
    (i) => i.id === item.id || (i.name === item.name && i.brand === item.brand)
  );
  if (existingIdx >= 0) {
    current[existingIdx].quantity += item.quantity || 1;
  } else {
    current.push({ ...item, quantity: item.quantity || 1 });
  }
  saveCartToStorage(current);
}

export function addMultipleToCart(items: OrderItem[], replaceAll = false): void {
  if (replaceAll) {
    saveCartToStorage(items.map((i) => ({ ...i, quantity: i.quantity || 1 })));
    return;
  }
  const current = getCartFromStorage();
  items.forEach((item) => {
    const existingIdx = current.findIndex(
      (i) => i.id === item.id || (i.name === item.name && i.brand === item.brand)
    );
    if (existingIdx >= 0) {
      current[existingIdx].quantity += item.quantity || 1;
    } else {
      current.push({ ...item, quantity: item.quantity || 1 });
    }
  });
  saveCartToStorage(current);
}

export function removeFromCart(itemId: string): void {
  const current = getCartFromStorage();
  const updated = current.filter((i) => i.id !== itemId);
  saveCartToStorage(updated);
}

export function updateCartQuantity(itemId: string, quantity: number): void {
  const current = getCartFromStorage();
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }
  const item = current.find((i) => i.id === itemId);
  if (item) {
    item.quantity = quantity;
    saveCartToStorage(current);
  }
}

export function clearCart(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      window.dispatchEvent(new Event('joyory_cart_updated'));
    } catch (e) {
      console.error('Failed to clear cart:', e);
    }
  }
}
