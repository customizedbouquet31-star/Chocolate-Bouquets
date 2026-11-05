import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';


const ALL_COLLECTION_TABS = [
  { name: 'Chocolate Bouquets', slug: 'chocolate-bouquets', icon: '🍫' },
  { name: 'Flower Bouquets', slug: 'flower-bouquets', icon: '🌸' },
  { name: "Men's Hampers", slug: 'mens-hampers', icon: '🎁' },
  { name: "Women's Hampers", slug: 'womens-hampers', icon: '🎀' },
  { name: 'Polaroid Bouquets', slug: 'polaroid-photo-bouquets', icon: '📸' },
  { name: 'Theme Bouquets', slug: 'theme-bouquets', icon: '👑' },
  { name: 'Festive Finds', slug: 'festive-finds', icon: '🏮' },
  { name: 'Cards & Letters', slug: 'cards-letters', icon: '💌' },
];

export default function Collection() {
  const { categoryId } = useParams<{ categoryId: string }>(); // acts as slug
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [allCategoriesList, setAllCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [activeSection, setActiveSection] = useState<'all' | 'chocolate' | 'mens' | 'womens'>('all');
  const [activeFlowerSection, setActiveFlowerSection] = useState<'all' | 'artificial' | 'fresh'>('all');

  // Sub-sections for Chocolate Bouquets category
  const [chocolateBouquets, setChocolateBouquets] = useState<Product[]>([]);
  const [mensBouquets, setMensBouquets] = useState<Product[]>([]);
  const [womensBouquets, setWomensBouquets] = useState<Product[]>([]);

  // Sub-sections for Flower Bouquets category
  const [artificialFlowers, setArtificialFlowers] = useState<Product[]>([]);
  const [freshFlowers, setFreshFlowers] = useState<Product[]>([]);

  const isChocolateBouquets = categoryId === 'chocolate-bouquets';
  const isFlowerBouquets = categoryId === 'flower-bouquets';

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' }
  ];

  useEffect(() => {
    async function fetchCollection() {
      setLoading(true);

      // Fetch all categories for navigation
      const { data: allCategories } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
      if (allCategories) setAllCategoriesList(allCategories);


      if (isChocolateBouquets) {
        const chocCat = allCategories?.find(c => c.slug === 'chocolate-bouquets');
        const mensCat = allCategories?.find(c => c.slug.includes('men') && !c.slug.includes('women'));
        const womensCat = allCategories?.find(c => c.slug.includes('women'));

        setCategory(chocCat || { id: 'choc', name: 'Chocolate Bouquets', slug: 'chocolate-bouquets' });

        // Fetch all products with images
        const { data: allProds } = await supabase
          .from('products')
          .select('*, product_images(image_url, is_primary)')
          .order('created_at', { ascending: false });

        const dbProds = allProds || [];

        // Filter out old placeholder images that used the generic test image
        const isNotPlaceholder = (p: Product) => {
          const img = p.product_images?.[0]?.image_url || '';
          return !img.includes('images.unsplash.com/photo-1549465220-1a8b9238cd48');
        };

        const validDbProds = dbProds.filter(isNotPlaceholder);

        // Helper classification functions
        const isWomen = (p: Product) => {
          const text = `${p.name} ${p.description || ''}`.toLowerCase();
          return (
            (womensCat && p.category_id === womensCat.id) ||
            /\bwomen\b|\bwomens\b|\bwomen's\b|\bspa day\b|\bpamper\b|\bfor her\b/i.test(text)
          );
        };

        const isMen = (p: Product) => {
          if (isWomen(p)) return false;
          const text = `${p.name} ${p.description || ''}`.toLowerCase();
          return (
            (mensCat && p.category_id === mensCat.id) ||
            /\bmen\b|\bmens\b|\bmen's\b|\bgentleman\b|\bgentlemen\b|\bgentleman's\b|\bgrooming\b|\bfor him\b/i.test(text)
          );
        };

        // 1. Chocolate Bouquets section
        const dbChoc = validDbProds.filter(p => 
          !isWomen(p) && !isMen(p) && (
            (chocCat && p.category_id === chocCat.id) ||
            /\bchocolate\b|\bferrero\b|\bdairy milk\b|\bluxury bouquet\b/i.test(`${p.name} ${p.description || ''}`)
          )
        );
        setChocolateBouquets(dbChoc);

        // 2. Men's Bouquets section
        const dbMens = validDbProds.filter(p => isMen(p));
        setMensBouquets(dbMens);

        // 3. Women's Bouquets section
        const dbWomens = validDbProds.filter(p => isWomen(p));
        setWomensBouquets(dbWomens);

      } else if (isFlowerBouquets) {
        const flowerCat = allCategories?.find(c => c.slug === 'flower-bouquets');
        setCategory(flowerCat || { id: 'ca82cdd8-bfa1-4924-b435-5e0d219ff81a', name: 'Flower Bouquets', slug: 'flower-bouquets' });

        const { data: allProds } = await supabase
          .from('products')
          .select('*, product_images(image_url, is_primary)')
          .order('created_at', { ascending: false });

        const dbProds = allProds || [];
        const isNotPlaceholder = (p: Product) => {
          const img = p.product_images?.[0]?.image_url || '';
          return !img.includes('images.unsplash.com/photo-1549465220-1a8b9238cd48');
        };
        const validDbProds = dbProds.filter(isNotPlaceholder);
        const flowerDbProds = flowerCat ? validDbProds.filter(p => p.category_id === flowerCat.id) : [];

        const isArtificial = (p: Product) => {
          const text = `${p.name} ${p.description || ''}`.toLowerCase();
          return /\bartificial\b|\bsilk\b|\bforever\b|\bpreserved\b|\bdried\b|\bfaux\b|\bribbon\b/i.test(text);
        };

        // 1. Artificial section
        const dbArtificial = flowerDbProds.filter(p => isArtificial(p));
        setArtificialFlowers(dbArtificial);

        // 2. Fresh section
        const dbFresh = flowerDbProds.filter(p => !isArtificial(p));
        setFreshFlowers(dbFresh);

      } else {
        // Standard category fetch
        const { data: catData } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', categoryId)
          .single();
          
        const activeCat = catData || allCategories?.find(c => {
          const catClean = c.slug.toLowerCase().replace(/s$/, '').replace(/-/g, '');
          const queryClean = categoryId?.toLowerCase().replace(/s$/, '').replace(/-/g, '') || '';
          return catClean === queryClean || catClean.includes(queryClean) || queryClean.includes(catClean);
        });

        if (activeCat) {
          setCategory(activeCat);
          const { data: prodData } = await supabase
            .from('products')
            .select('*, product_images(image_url, is_primary)')
            .eq('category_id', activeCat.id)
            .order('created_at', { ascending: false });
            
          const dbProds = prodData || [];
          const isNotPlaceholder = (p: Product) => {
            const img = p.product_images?.[0]?.image_url || '';
            return !img.includes('images.unsplash.com/photo-1549465220-1a8b9238cd48');
          };
          const validDbProds = dbProds.filter(isNotPlaceholder);
          setProducts(validDbProds);
        } else {
          // Fallback if category slug doesn't exist in DB
          setProducts([]);
        }
      }

      setLoading(false);
    }

    if (categoryId) fetchCollection();
  }, [categoryId, isChocolateBouquets, isFlowerBouquets]);

  const title = category?.name || categoryId?.replace(/-/g, ' ');

  // Sort helper
  const sortProducts = (list: Product[]) => {
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  };

  const scrollToSection = (id: string, sectionKey: string) => {
    if (isChocolateBouquets) {
      setActiveSection(sectionKey as any);
    } else if (isFlowerBouquets) {
      setActiveFlowerSection(sectionKey as any);
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Collection Hero */}
      <section className="bg-lavender-50/50 pt-8 pb-6 md:pt-10 md:pb-8 border-b border-lavender-100 w-full">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 text-center">
          <h1 className="font-serif text-3xl md:text-5xl text-plum-950 mb-3 capitalize">
            {title}
          </h1>
          <p className="text-plum-900/70 max-w-3xl mx-auto text-base md:text-lg">
            {isChocolateBouquets
              ? "Discover our handcrafted chocolate bouquet collection, featuring signature cocoa arrangements, men's bouquets, and women's bouquets."
              : isFlowerBouquets
              ? "Discover our exquisite flower collection, featuring everlasting artificial arrangements and fragrant fresh floral bouquets."
              : `Explore our curated selection of ${title?.toLowerCase()} crafted with love and attention to detail.`}
          </p>

          {/* Horizontal Category Switcher Bar */}
          <div className="w-full mt-6 flex justify-center">
            <div className="flex items-center gap-2 overflow-x-auto max-w-5xl py-1 px-1 hide-scrollbar">
              {ALL_COLLECTION_TABS.map((cat) => {
                const isActive = categoryId === cat.slug || (categoryId?.replace(/-/g, '').slice(0, 7) === cat.slug.replace(/-/g, '').slice(0, 7));
                return (
                  <Link
                    key={cat.slug}
                    to={`/collection/${cat.slug}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-plum-950 text-white shadow-sm ring-2 ring-plum-950/20'
                        : 'bg-white/80 hover:bg-white text-plum-900/80 hover:text-plum-950 border border-lavender-200/60 shadow-xs'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout Container with Left Sidebar & Products */}
      <section className="pt-6 pb-16 md:pb-24 px-4 sm:px-6 md:px-10 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full items-start">
          
          {/* Left Sidebar: Navigation & Sort Buttons for all categories */}
          <aside className="w-full lg:w-64 xl:w-72 lg:sticky lg:top-24 flex-shrink-0 z-30">
            <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-lavender-100 shadow-sm flex flex-col gap-5">
              
              {/* Category / Sub-section Links */}
              <div>
                <h3 className="text-xs font-bold tracking-widest text-plum-900/50 uppercase mb-3">
                  {isChocolateBouquets ? "Browse Bouquets" : isFlowerBouquets ? "Browse Flowers" : "Categories"}
                </h3>

                {isChocolateBouquets ? (
                  <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar pb-1 lg:pb-0">
                    <button
                      onClick={() => scrollToSection('chocolate-bouquets-section', 'all')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink ${
                        activeSection === 'all'
                          ? 'bg-plum-950 text-white shadow-sm'
                          : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                      }`}
                    >
                      All Bouquets
                    </button>
                    <button
                      onClick={() => scrollToSection('chocolate-bouquets-section', 'chocolate')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink ${
                        activeSection === 'chocolate'
                          ? 'bg-plum-950 text-white shadow-sm'
                          : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                      }`}
                    >
                      Chocolate Bouquets
                    </button>
                    <button
                      onClick={() => scrollToSection('mens-bouquets-section', 'mens')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink ${
                        activeSection === 'mens'
                          ? 'bg-plum-950 text-white shadow-sm'
                          : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                      }`}
                    >
                      Men's Bouquets
                    </button>
                    <button
                      onClick={() => scrollToSection('womens-bouquets-section', 'womens')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink ${
                        activeSection === 'womens'
                          ? 'bg-plum-950 text-white shadow-sm'
                          : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                      }`}
                    >
                      Women's Bouquets
                    </button>

                    {/* Quick Hampers Jump Links */}
                    <div className="mt-2 pt-3 border-t border-lavender-100 flex flex-row lg:flex-col gap-1.5 flex-shrink-0">
                      <span className="text-[10px] font-bold tracking-widest text-plum-900/40 uppercase mb-1 hidden lg:block">Gift Hampers</span>
                      <Link
                        to="/collection/mens-hampers"
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-plum-900/80 bg-lavender-50/50 hover:bg-lavender-100/70 hover:text-plum-950 transition-all flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <span>🎁</span> Men's Hampers
                      </Link>
                      <Link
                        to="/collection/womens-hampers"
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-plum-900/80 bg-lavender-50/50 hover:bg-lavender-100/70 hover:text-plum-950 transition-all flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <span>🎀</span> Women's Hampers
                      </Link>
                    </div>
                  </div>
                ) : isFlowerBouquets ? (
                  <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar pb-1 lg:pb-0">
                    <button
                      onClick={() => scrollToSection('artificial-flowers-section', 'all')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink ${
                        activeFlowerSection === 'all'
                          ? 'bg-plum-950 text-white shadow-sm'
                          : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                      }`}
                    >
                      All Flowers
                    </button>
                    <button
                      onClick={() => scrollToSection('artificial-flowers-section', 'artificial')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink ${
                        activeFlowerSection === 'artificial'
                          ? 'bg-plum-950 text-white shadow-sm'
                          : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                      }`}
                    >
                      Artificial Flowers
                    </button>
                    <button
                      onClick={() => scrollToSection('fresh-flowers-section', 'fresh')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink ${
                        activeFlowerSection === 'fresh'
                          ? 'bg-plum-950 text-white shadow-sm'
                          : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                      }`}
                    >
                      Fresh Flowers
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible hide-scrollbar pb-1 lg:pb-0">
                    {allCategoriesList.map((cat) => (
                      <a
                        key={cat.id}
                        href={`/collection/${cat.slug}`}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink block ${
                          cat.slug === categoryId
                            ? 'bg-plum-950 text-white shadow-sm'
                            : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                        }`}
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort Buttons on Left Side */}
              <div className="pt-4 border-t border-lavender-100">
                <label className="text-xs font-bold tracking-widest text-plum-900/50 uppercase block mb-3">
                  Sort By
                </label>
                <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible hide-scrollbar pb-1 lg:pb-0">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all text-left flex-shrink-0 lg:flex-shrink flex items-center justify-between ${
                        sortBy === option.id
                          ? 'bg-plum-950 text-white shadow-sm'
                          : 'bg-lavender-50/70 text-plum-900/70 hover:bg-lavender-100 hover:text-plum-950'
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white hidden lg:inline-block"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Right Side: Products Display */}
          <div className="flex-1 min-w-0 w-full">
            {isChocolateBouquets ? (
              /* Three sections one by one for Chocolate Bouquets category */
              loading ? (
                <div className="py-20 text-center text-plum-900/60 font-medium">Loading bouquet collections...</div>
              ) : (
                <div className="flex flex-col gap-8 md:gap-12 w-full">
                  
                  {/* 1. SECTION: Chocolate Bouquets */}
                  <div id="chocolate-bouquets-section" className="scroll-mt-32 w-full">
                    <div className="text-center mb-5 pb-3 border-b border-lavender-100">
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-plum-950 tracking-wide">
                        Chocolate Bouquets
                      </h2>
                    </div>

                    <ProductGrid products={sortProducts(chocolateBouquets)} size="large" />
                  </div>

                  {/* 2. SECTION: Men's Bouquets */}
                  <div id="mens-bouquets-section" className="scroll-mt-32 w-full">
                    <div className="text-center mb-5 pb-3 border-b border-lavender-100">
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-plum-950 tracking-wide">
                        Men's Bouquets
                      </h2>
                    </div>

                    <ProductGrid products={sortProducts(mensBouquets)} size="large" />
                  </div>

                  {/* 3. SECTION: Women's Bouquets */}
                  <div id="womens-bouquets-section" className="scroll-mt-32 w-full">
                    <div className="text-center mb-5 pb-3 border-b border-lavender-100">
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-plum-950 tracking-wide">
                        Women's Bouquets
                      </h2>
                    </div>

                    <ProductGrid products={sortProducts(womensBouquets)} size="large" />
                  </div>

                </div>
              )
            ) : isFlowerBouquets ? (
              /* Two sections one by one for Flower Bouquets category: Artificial and Fresh */
              loading ? (
                <div className="py-20 text-center text-plum-900/60 font-medium">Loading flower collections...</div>
              ) : (
                <div className="flex flex-col gap-8 md:gap-12 w-full">
                  
                  {/* 1. SECTION: Artificial Flowers */}
                  <div id="artificial-flowers-section" className="scroll-mt-32 w-full">
                    <div className="text-center mb-5 pb-3 border-b border-lavender-100">
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-plum-950 tracking-wide">
                        Artificial Flowers
                      </h2>
                    </div>

                    <ProductGrid products={sortProducts(artificialFlowers)} size="large" />
                  </div>

                  {/* 2. SECTION: Fresh Flowers */}
                  <div id="fresh-flowers-section" className="scroll-mt-32 w-full">
                    <div className="text-center mb-5 pb-3 border-b border-lavender-100">
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-plum-950 tracking-wide">
                        Fresh Flowers
                      </h2>
                    </div>

                    <ProductGrid products={sortProducts(freshFlowers)} size="large" />
                  </div>

                </div>
              )
            ) : (
              /* Standard Single Category Display for other categories */
              <div className="w-full">
                <div className="text-center mb-8 pb-4 border-b border-lavender-100">
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-plum-950 tracking-wide capitalize">
                    {title}
                  </h2>
                </div>

                {loading ? (
                  <div className="py-20 text-center text-plum-900/60 font-medium">Loading products...</div>
                ) : (
                  <ProductGrid products={sortProducts(products)} size="large" />
                )}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
