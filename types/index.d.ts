export type User =
  | {
      id: string;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      favoriteIds?: string[] | null | undefined;
    }
  | null
  | undefined;

export type Store =
  | {
      id?: string | null | undefined;
      name?: string | null | undefined;
      image?: string | null | undefined;
    }
  | null
  | undefined;

export type ProductData = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: number;
  store: {
    id: string;
    name: string;
    image: string | null;
  };
};

export interface CartItem {
  id: string;
  quantity: number;
  total: number;
  productId: string;
  cartId: string;
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
  };
}
export interface Cart {
  userId: string;
  items: CartItem[];
}
