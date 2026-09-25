import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category_id: string | null;
  is_new: boolean;
  is_bestseller: boolean;
  is_customizable: boolean;
}

interface Category {
  id: string;
  name: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category_id: '',
    is_new: false,
    is_bestseller: false,
    is_customizable: true,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [productsRes, categoriesRes] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('id, name').order('name')
    ]);

    if (productsRes.data) setProducts(productsRes.data);
    if (categoriesRes.data) setCategories(categoriesRes.data);
    setLoading(false);
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        original_price: product.original_price?.toString() || '',
        category_id: product.category_id || '',
        is_new: product.is_new,
        is_bestseller: product.is_bestseller,
        is_customizable: product.is_customizable,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        original_price: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        is_new: false,
        is_bestseller: false,
        is_customizable: true,
      });
    }
    setImageFiles([]);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      category_id: formData.category_id || null,
      is_new: formData.is_new,
      is_bestseller: formData.is_bestseller,
      is_customizable: formData.is_customizable,
    };

    let productId = editingId;

    if (editingId) {
      // Update
      const { error } = await supabase.from('products').update(productData).eq('id', editingId);
      if (error) alert(error.message);
    } else {
      // Insert
      const { data, error } = await supabase.from('products').insert([productData]).select();
      if (error) {
        alert(error.message);
        setUploading(false);
        return;
      }
      productId = data[0].id;
    }

    // Handle Image Uploads
    if (imageFiles.length > 0 && productId) {
      const uploadPromises = imageFiles.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Error uploading image: ' + uploadError.message);
        } else {
          const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(filePath);
          
          await supabase.from('product_images').insert([{
            product_id: productId,
            image_url: urlData.publicUrl,
            is_primary: index === 0 && !editingId // First image is primary only on insert, or they'd override the old primary if we just rely on index. Wait, actually if they edit, we probably just add these as secondary images, so index === 0 && !editingId is safer. Let's just do `!editingId && index === 0` for now.
          }]);
        }
      });
      await Promise.all(uploadPromises);
    }

    await fetchData();
    setUploading(false);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert(error.message);
    } else {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-plum-950">Products</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-plum-900/60">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-plum-900/60">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-lavender-50/50 border-b border-lavender-100 text-sm">
                <tr>
                  <th className="px-6 py-4 font-bold text-plum-950">Product Name</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Price</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Category</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Badges</th>
                  <th className="px-6 py-4 font-bold text-plum-950 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lavender-100">
                {products.map((product) => {
                  const categoryName = categories.find(c => c.id === product.category_id)?.name || 'Uncategorized';
                  
                  return (
                    <tr key={product.id} className="hover:bg-lavender-50/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-plum-950">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-plum-900">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4 text-plum-900/70 text-sm">
                        {categoryName}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {product.is_new && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">New</span>}
                        {product.is_bestseller && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded font-medium">Best</span>}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => handleOpenModal(product)} 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg inline-block"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg inline-block">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-lavender-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur">
              <h2 className="text-xl font-bold text-plum-950">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-lavender-50 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-plum-950 mb-2">Product Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-plum-950 mb-2">Price (₹)</label>
                  <input 
                    type="number" required min="0" step="0.01"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-plum-950 mb-2">Original Price (₹) (Optional)</label>
                  <input 
                    type="number" min="0" step="0.01"
                    value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-plum-950 mb-2">Category</label>
                  <select
                    required
                    value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-plum-950 mb-2">Description</label>
                  <textarea 
                    rows={4}
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>

                <div className="md:col-span-2 bg-lavender-50 p-4 rounded-xl border border-lavender-100 flex flex-col gap-3">
                  <label className="block text-sm font-bold text-plum-950">Product Images</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={e => setImageFiles(Array.from(e.target.files || []))}
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover"
                  />
                  <p className="text-xs text-plum-900/60">Select multiple images by holding Ctrl/Cmd. The first image selected will be the primary image. If editing, newly uploaded images will be added to the gallery.</p>
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.is_new} onChange={e => setFormData({...formData, is_new: e.target.checked})} className="rounded text-primary focus:ring-primary w-4 h-4 border-lavender-300" />
                    <span className="text-sm font-medium text-plum-900">Mark as New</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.is_bestseller} onChange={e => setFormData({...formData, is_bestseller: e.target.checked})} className="rounded text-primary focus:ring-primary w-4 h-4 border-lavender-300" />
                    <span className="text-sm font-medium text-plum-900">Bestseller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.is_customizable} onChange={e => setFormData({...formData, is_customizable: e.target.checked})} className="rounded text-primary focus:ring-primary w-4 h-4 border-lavender-300" />
                    <span className="text-sm font-medium text-plum-900">Customizable</span>
                  </label>
                </div>

              </div>

              <div className="pt-6 border-t border-lavender-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-plum-900 hover:bg-lavender-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {uploading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
