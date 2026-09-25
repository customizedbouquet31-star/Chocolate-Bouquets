export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  is_new: boolean;
  is_bestseller: boolean;
  is_customizable: boolean;
  product_images?: ProductImage[]; // relation
  created_at?: string;
}

export interface Reel {
  id: string;
  instagram_url: string;
  thumbnail_url: string;
  description: string;
}
