--
-- SQL Migration: Clear placeholders and insert all 26 authentic handcrafted products & images
-- Run this in the Supabase Dashboard -> SQL Editor (https://supabase.com/dashboard/project/oibktybjnjxndffxzrqb/sql)
--

-- 1. Clean existing products and product images
DELETE FROM public.product_images;
DELETE FROM public.products;

-- 2. Insert all 26 authentic products
-- Product: Monochrome Striped Cadbury Crackle & Red Rose Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('6f51dbef-fcef-46a8-a615-5e78dc110925', '64e954cf-585b-4752-beae-82fec0119e1f', 'Monochrome Striped Cadbury Crackle & Red Rose Bouquet', 'Signature black-and-white striped luxury wrap loaded with Cadbury Dairy Milk Crackle bars, fresh scarlet roses, baby''s breath, and double satin gold-striped ribbon.', 999, 1299, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('c97f8598-62a3-4886-8160-702606d712c1', '6f51dbef-fcef-46a8-a615-5e78dc110925', '/products/reconstructed/chocolate_bouquet_1.jpg', true);

-- Product: Grand Cadbury Silk Symphony & Golden Butterfly Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('47448db6-5c41-4c6d-9d89-f9404f93ae53', '64e954cf-585b-4752-beae-82fec0119e1f', 'Grand Cadbury Silk Symphony & Golden Butterfly Bouquet', 'Opulent fan arrangement showcasing Cadbury Dairy Milk Silk bars (Ganache, Bubbly ''You are Special'', Mousse, Roast Almond, and Oreo) with 3D butterflies, pink roses, and purple satin ribbon.', 999, 1599, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('ea3428d4-1227-41dd-b55c-92efd27c40b6', '47448db6-5c41-4c6d-9d89-f9404f93ae53', '/products/reconstructed/chocolate_bouquet_2.jpg', true);

-- Product: Sweet Romance Heart Balloon, Perk & KitKat Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('13a6a7ca-4023-4d6d-b437-86174b5e2b51', '64e954cf-585b-4752-beae-82fec0119e1f', 'Sweet Romance Heart Balloon, Perk & KitKat Bouquet', 'Celebratory black and gold bouquet featuring a vibrant red metallic heart foil balloon, Nestle KitKat, Perk, 5-Star, Cadbury Silk, scarlet roses, and golden satin bow.', 999, 1699, false, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('67ad9912-f2a1-424b-8ace-4726823a001a', '13a6a7ca-4023-4d6d-b437-86174b5e2b51', '/products/reconstructed/chocolate_bouquet_3.jpg', true);

-- Product: Artisan Wafer Rolls & KitKat Cascade Fan
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('1d864d01-91e9-43ab-8a6f-5beb2256e1c3', '64e954cf-585b-4752-beae-82fec0119e1f', 'Artisan Wafer Rolls & KitKat Cascade Fan', 'Cascading chocolate presentation in rich chocolate-brown wrapping, accented with baby-blue ribbon, crispy chocolate rolls, Nestle KitKat, and velvet red roses.', 999, 1499, true, false, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('3f50b95f-4465-410b-9f12-b880ff56155c', '1d864d01-91e9-43ab-8a6f-5beb2256e1c3', '/products/reconstructed/chocolate_bouquet_4.jpg', true);

-- Product: Noir Scallop Tiered KitKat & White Rose Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('7d705b01-00cd-4a28-ab75-2af442736e9f', '64e954cf-585b-4752-beae-82fec0119e1f', 'Noir Scallop Tiered KitKat & White Rose Bouquet', 'Masculine black scalloped accordion cone bouquet layered with Nestle KitKat bars, crisp white roses, baby''s breath, and a bold hot-pink satin bow.', 999, 1399, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('0fc09e3b-78da-47d3-9cac-637dd5a649d7', '7d705b01-00cd-4a28-ab75-2af442736e9f', '/products/reconstructed/mens_choc_bouquet_1.jpg', true);

-- Product: Cadbury Silk Mousse & Roast Almond Fan Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('77c9dc23-9990-4e37-955e-d3aa26865d2a', '64e954cf-585b-4752-beae-82fec0119e1f', 'Cadbury Silk Mousse & Roast Almond Fan Bouquet', 'Grand multi-tier fan of Cadbury Silk favorites—Ganache, Bubbly, Mousse, Oreo, and Roast Almond—framed with white chrysanthemums, roses, and a sparkling white ribbon bow.', 999, 1799, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('2c8a3c8b-cbca-4650-aa09-10d008b03687', '77c9dc23-9990-4e37-955e-d3aa26865d2a', '/products/reconstructed/mens_choc_bouquet_2.jpg', true);

-- Product: Crown Gold & Noir Silk, KitKat & Milkybar Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('2aa11aa6-2cd2-4e02-985b-534e3ec8cfbc', '64e954cf-585b-4752-beae-82fec0119e1f', 'Crown Gold & Noir Silk, KitKat & Milkybar Bouquet', 'Regal black cone wrap with gold scalloped crown trim, double gold-pinstripe bow, tiered KitKat, creamy Milkybar, and Cadbury Silk bars with delicate blossom accents.', 999, 1599, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('f3b9c789-4888-4e9b-b4cb-58d76c9e082d', '2aa11aa6-2cd2-4e02-985b-534e3ec8cfbc', '/products/reconstructed/womens_choc_bouquet_1.jpg', true);

-- Product: Blush Valentine Milkybar & KitKat Rose Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('f1cbc01e-a34a-452d-b3e4-8096cb866506', '64e954cf-585b-4752-beae-82fec0119e1f', 'Blush Valentine Milkybar & KitKat Rose Bouquet', 'Romantic blush-pink accordion wrap with gold trim, Happy Valentine''s Day topper, Milkybar, Dairy Milk, KitKat fingers, ivory and pink roses, and satin bow.', 999, 1699, true, false, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('94df2eac-36a4-4894-989a-f1e390ad5f57', 'f1cbc01e-a34a-452d-b3e4-8096cb866506', '/products/reconstructed/womens_choc_bouquet_2.jpg', true);

-- Product: Forever Velvet Scarlet Rose & Chrysanthemum Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('158201dc-20d7-4441-b331-97cd38725647', 'ca82cdd8-bfa1-4924-b435-5e0d219ff81a', 'Forever Velvet Scarlet Rose & Chrysanthemum Bouquet', 'Timeless handcrafted arrangement of deep scarlet velvet roses, fluffy white chrysanthemums, and gypsophila in matte black & gold wrap with white satin bow.', 999, 1299, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('41572685-1d8d-4085-b1d4-0ccf7d9a69bd', '158201dc-20d7-4441-b331-97cd38725647', '/products/reconstructed/flower_bouquet_1.jpg', true);

-- Product: Velvet Scarlet Rose & Double Satin Harmony
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('553dfdcb-4158-4c32-a413-b6a5c9479661', 'ca82cdd8-bfa1-4924-b435-5e0d219ff81a', 'Velvet Scarlet Rose & Double Satin Harmony', 'Dense arrangement of rich artificial red roses with baby''s breath, double satin maroon ribbon and luxury frosted paper.', 999, 1499, true, true, false);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('08ea64cf-63bd-470a-8eb5-259bf1c6ac57', '553dfdcb-4158-4c32-a413-b6a5c9479661', '/products/reconstructed/flower_bouquet_2.jpg', true);

-- Product: Blush Pink Rose & Dairy Milk Bubbly Blossom
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('3ce9e09e-5fdb-4cd4-a9b9-3cbe41acbb98', 'ca82cdd8-bfa1-4924-b435-5e0d219ff81a', 'Blush Pink Rose & Dairy Milk Bubbly Blossom', 'Charming pastel presentation featuring soft blush pink roses, Cadbury Dairy Milk bars, Silk Bubbly, eucalyptus sprigs, and frosted pink wrap with satin bow.', 999, 1399, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('b9fd6417-7f5c-497d-ab66-c42528f47b3c', '3ce9e09e-5fdb-4cd4-a9b9-3cbe41acbb98', '/products/reconstructed/flower_bouquet_3.jpg', true);

-- Product: Fresh Violet & White Chrysanthemum Holi Celebration Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('be131aa7-df93-4652-a397-ae7a697478ed', 'ca82cdd8-bfa1-4924-b435-5e0d219ff81a', 'Fresh Violet & White Chrysanthemum Holi Celebration Bouquet', 'Vibrant fresh white and imperial purple chrysanthemums with lush greenery, custom celebration greeting card, and royal purple ribbon in translucent striped wrap.', 999, 1499, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('8b7fc7bb-681b-4063-acde-8ddc747d1be1', 'be131aa7-df93-4652-a397-ae7a697478ed', '/products/reconstructed/fresh_flowers_1.jpg', true);

-- Product: Pastel Pink Rose & Imperial Lily Welcome Presentation
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('90e9ad7f-e69c-417e-a6dd-a8156dfca704', 'ca82cdd8-bfa1-4924-b435-5e0d219ff81a', 'Pastel Pink Rose & Imperial Lily Welcome Presentation', 'Lush fresh hand-tied floral presentation of dewy pink roses, pristine white lilies, white carnations, fragrant eucalyptus, and personalized celebration greeting card.', 999, 1799, true, false, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('c69b35ef-e0dc-40ea-855c-69e0fda80d5a', '90e9ad7f-e69c-417e-a6dd-a8156dfca704', '/products/reconstructed/fresh_flowers_2.jpg', true);

-- Product: Memories in Bloom Polaroid & Dairy Milk Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('59e5ee9c-078b-494d-9caf-31e42b64bb42', '5b00a6c3-0c26-46c2-bfc1-199e4e9449cf', 'Memories in Bloom Polaroid & Dairy Milk Bouquet', 'Personalized keepsake bouquet customized with your printed mini Polaroid photos, Cadbury Dairy Milk chocolates, fresh red roses, baby''s breath, and baby-blue star ribbon.', 999, 1799, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('33311dcb-302f-4872-92a2-1cbd921d7c39', '59e5ee9c-078b-494d-9caf-31e42b64bb42', '/products/reconstructed/polaroid_bouquet_1.jpg', true);

-- Product: Golden Paperclip Polaroid & KitKat Keepsake Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('c973a761-ac51-42a2-88a2-2d9f550a9045', '5b00a6c3-0c26-46c2-bfc1-199e4e9449cf', 'Golden Paperclip Polaroid & KitKat Keepsake Bouquet', 'Artisan black and gold bouquet featuring mini Polaroid prints clipped with golden clips, Cadbury Dairy Milk, KitKat bars, red roses, white chrysanthemums, and glowing fairy wire.', 999, 1899, true, false, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('d5f73998-b35c-4813-b2dd-d9867e28d2af', 'c973a761-ac51-42a2-88a2-2d9f550a9045', '/products/reconstructed/polaroid_bouquet_2.jpg', true);

-- Product: Romantic Valentine Couple Polaroid & Heart Balloon Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('9be57bbf-dbc6-4067-8c8b-daea2dad5267', '5b00a6c3-0c26-46c2-bfc1-199e4e9449cf', 'Romantic Valentine Couple Polaroid & Heart Balloon Bouquet', 'Grand celebration bouquet with couple Polaroid prints, red heart foil balloon, Valentine topper, Munch Max, Dairy Milk, Milkybar, Crispello, pink roses, and fairy lights.', 999, 1999, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('0ff6dc06-093c-483a-ba2b-fd8ee17c0857', '9be57bbf-dbc6-4067-8c8b-daea2dad5267', '/products/reconstructed/polaroid_bouquet_3.jpg', true);

-- Product: Sweetheart Anniversary Heart Balloon & Chocolate Hamper
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('502e4376-2074-41b4-9cda-b28b2e464ebe', '0ce6156d-4127-4c6f-860d-5afbf6e9d646', 'Sweetheart Anniversary Heart Balloon & Chocolate Hamper', 'Celebratory gift hamper box topped with a glowing metallic pink ''Happy Anniversary'' heart balloon, Nestle KitKat bars, creamy Milkybar bars, and a lush bed of peach and pink roses.', 999, 2599, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('9acfa130-0052-4327-9309-7f2aa922bc8e', '502e4376-2074-41b4-9cda-b28b2e464ebe', '/products/reconstructed/mens_hamper_1.jpg', true);

-- Product: Anniversary Floral & Chocolate Deluxe Presentation Box
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('c763c2f4-375c-40bf-a93f-28eca468a964', '0ce6156d-4127-4c6f-860d-5afbf6e9d646', 'Anniversary Floral & Chocolate Deluxe Presentation Box', 'Flat-lay luxury celebration hamper presenting crisp Nestle KitKat bars, sweet Milkybars, tiered peach-pink roses, and ambient fairy wire inside a premium striped gift box.', 999, 2399, true, false, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('b2b22281-3d84-4f10-bd87-cdc2f81d9453', 'c763c2f4-375c-40bf-a93f-28eca468a964', '/products/reconstructed/mens_hamper_2.jpg', true);

-- Product: Happy Birthday Acrylic Tote with Red Teddy & Blue Tumbler
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('cab88424-347f-4155-83df-46759cf55c15', '9419808b-4314-456d-80fb-07875e50d122', 'Happy Birthday Acrylic Tote with Red Teddy & Blue Tumbler', 'Luxury clear acrylic tote with braided gold handle, black bow, glowing fairy lights, plush red teddy bear, insulated sky-blue tumbler bottle, Lotte Choco Pies, and golden calligraphy.', 999, 2699, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('78b23625-d0d3-4aea-8541-80186031f4c9', 'cab88424-347f-4155-83df-46759cf55c15', '/products/reconstructed/womens_hamper_1.jpg', true);

-- Product: Personalized Bridesmaid Acrylic Gift Tote with Pink Teddy
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('dc3d7f87-7fc8-445f-af51-584fa9a6a9ba', '9419808b-4314-456d-80fb-07875e50d122', 'Personalized Bridesmaid Acrylic Gift Tote with Pink Teddy', 'Bespoke bridesmaid celebration tote featuring personalized lettering, plush pink teddy bear, luxury satin scrunchie, travel tumbler, Dark Fantasy Choco Fills, and fairy lights.', 999, 2399, true, false, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('cca6c86d-3732-49f4-9695-71d8185930b1', 'dc3d7f87-7fc8-445f-af51-584fa9a6a9ba', '/products/reconstructed/womens_hamper_2.jpg', true);

-- Product: The Complete Bridesmaid Squad Acrylic Tote Set (5-Pack)
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('5eecb918-f2a2-40b1-abbc-5d8f4c3c76c9', '9419808b-4314-456d-80fb-07875e50d122', 'The Complete Bridesmaid Squad Acrylic Tote Set (5-Pack)', 'Exclusive multi-piece bridal party hamper collection featuring 5 customized transparent totes with color-coded teddy bears, satin scrunchies, beverage tumblers, and fairy illumination.', 999, 8499, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('60e2ff33-5dbb-4c6e-bbc9-7ef8f5998aa4', '5eecb918-f2a2-40b1-abbc-5d8f4c3c76c9', '/products/reconstructed/womens_hamper_3.jpg', true);

-- Product: Arabhe Fine Jewelry & Rose Romance Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('8d713bc6-2d71-4f6e-b67c-bc6915460704', '168b2dc7-de08-4c20-ae0d-e26b0e0767ab', 'Arabhe Fine Jewelry & Rose Romance Bouquet', 'Unique jewelry gift bouquet pairing delicate pink roses and baby''s breath with authentic Arabhe Jewels gold heart earrings, pearl necklace, and gold pendant chains.', 999, 2999, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('9d246b8c-1444-44a2-98b4-47080a5bd0df', '8d713bc6-2d71-4f6e-b67c-bc6915460704', '/products/reconstructed/theme_bouquet_1.jpg', true);

-- Product: Glamour Beauty Vanity & Chocolate Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('889f5f9d-9340-49ef-8246-b7195ae2a988', '168b2dc7-de08-4c20-ae0d-e26b0e0767ab', 'Glamour Beauty Vanity & Chocolate Bouquet', 'Ultimate cosmetics luxury bouquet combining Nykaa eyeshadow, Bella Vita Senorita perfume, Sugar makeup, press-on nails, Ferrero Rocher, Cadbury Silk, KitKat, and pink roses.', 999, 3299, true, false, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('8fd1b44c-9eb0-44df-94d1-b0a5a695ded4', '889f5f9d-9340-49ef-8246-b7195ae2a988', '/products/reconstructed/theme_bouquet_2.jpg', true);

-- Product: Royal Eid Mubarak Wooden Crate with Golden Canopy & Fairy Lights
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('f8293757-85dd-433d-bdee-4c43912946fc', 'deeb3f7c-401a-43c0-8098-86008c33786f', 'Royal Eid Mubarak Wooden Crate with Golden Canopy & Fairy Lights', 'Handcrafted natural wood celebration crate enveloped in a glittering golden mesh canopy, Eid Mubarak crescent moon, glowing fairy lights, silk peonies, and gourmet confections.', 999, 2099, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('26ab1b17-be15-44a7-83e7-e44039b46b92', 'f8293757-85dd-433d-bdee-4c43912946fc', '/products/reconstructed/festive_finds_1.jpg', true);

-- Product: Festive Treats & StudioWest Fragrance Gourmet Crates
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('0216f7bf-a9ea-4743-9bed-95cb0398c07c', 'deeb3f7c-401a-43c0-8098-86008c33786f', 'Festive Treats & StudioWest Fragrance Gourmet Crates', 'Dual wooden festive crates loaded with premium StudioWest fragrances, Cadbury Dairy Milk Bites, dry fruit tins, gold net canopies, and festive illuminations.', 999, 2599, true, false, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('10762348-6c56-4a15-8268-3fa166205521', '0216f7bf-a9ea-4743-9bed-95cb0398c07c', '/products/reconstructed/festive_finds_2.jpg', true);

-- Product: Gentleman Tuxedo Mickey & Minnie Rose Greeting Bouquet
INSERT INTO public.products (id, category_id, name, description, price, original_price, is_new, is_bestseller, is_customizable) VALUES ('e64ba891-ffa4-4feb-9959-485138504b04', '3faad705-d4a5-4c0e-955e-26a0ada9bf03', 'Gentleman Tuxedo Mickey & Minnie Rose Greeting Bouquet', 'Handcrafted tuxedo-style floral bouquet with a dapper bowtie wrap, scarlet roses, baby''s breath, and an adorable Mickey & Minnie greeting card keepsake.', 999, 1299, true, true, true);
INSERT INTO public.product_images (id, product_id, image_url, is_primary) VALUES ('e09e772e-9042-47c5-aea0-aa470bacf84d', 'e64ba891-ffa4-4feb-9959-485138504b04', '/products/reconstructed/cards_letters_1.jpg', true);
