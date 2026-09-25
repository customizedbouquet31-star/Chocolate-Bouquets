-- Supabase Schema for The Chocolate Bouquet X Hamper

-- 1. Categories Table
CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Products Table
CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    original_price numeric,
    is_new boolean DEFAULT false,
    is_bestseller boolean DEFAULT false,
    is_customizable boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Product Images Table
CREATE TABLE public.product_images (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
    image_url text NOT NULL,
    is_primary boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Reels Table
CREATE TABLE public.reels (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    instagram_url text NOT NULL,
    thumbnail_url text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Orders Table
CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name text NOT NULL,
    customer_phone text NOT NULL,
    customer_email text,
    delivery_address text NOT NULL,
    total_amount numeric NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Order Items Table
CREATE TABLE public.order_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    quantity integer NOT NULL DEFAULT 1,
    price_at_time numeric NOT NULL,
    customization_details text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create Policies for Public Read Access
CREATE POLICY "Public profiles are viewable by everyone." ON public.categories FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (true);
CREATE POLICY "Product images are viewable by everyone." ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Reels are viewable by everyone." ON public.reels FOR SELECT USING (true);

-- Create Policies for Authenticated Admin Access
-- Note: In a real app, you might want a specific 'admin' role check, but for simplicity, 
-- we allow all authenticated users (admins) to perform CRUD operations.
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert products" ON public.products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert product images" ON public.product_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update product images" ON public.product_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete product images" ON public.product_images FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert reels" ON public.reels FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update reels" ON public.reels FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete reels" ON public.reels FOR DELETE USING (auth.role() = 'authenticated');

-- Orders policies (Customers can insert, Admins can view/update)
CREATE POLICY "Anyone can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view orders" ON public.orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view order items" ON public.order_items FOR SELECT USING (auth.role() = 'authenticated');

-- Storage Bucket for Product Images
-- NOTE: You will need to create a storage bucket named 'product-images' manually in the Supabase Dashboard
-- and set it to 'Public'.
