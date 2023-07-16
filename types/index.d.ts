export type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
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
  store: {
    name: string;
    image: string | null;
  };
};
