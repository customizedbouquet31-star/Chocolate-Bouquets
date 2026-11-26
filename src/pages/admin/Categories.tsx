import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { clearCache } from '../../lib/cache';
import { Plus, Pencil, Trash2, X, Check, ImagePlus, Upload, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
  created_at: string;
}

function getDefaultCategoryImage(slug: string): string {
  if (slug.includes('flower')) return '/categories/flower.webp';
  if (slug.includes('chocolate')) return '/categories/chocolate.webp';
  if (slug.includes('women')) return '/categories/womens.webp';
  if (slug.includes('men')) return '/categories/mens.webp';
  if (slug.includes('festiv')) return '/categories/festival.webp';
  if (slug.includes('theme')) return '/categories/theme.webp';
  if (slug.includes('polaroid')) return '/categories/polaroid.webp';
  if (slug.includes('card')) return '/categories/cards.webp';
  return '/logo.webp';
}

async function uploadCategoryImage(file: File, slug: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'webp';
  const filePath = `categories/${slug}-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(filePath);
  return urlData.publicUrl;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setCategories(data);
      }
      setLoading(false);
    }
    fetchCategories();
  }, []);

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const invalidateCategoryCache = () => {
    clearCache('mapped_categories');
    clearCache('all_categories');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    const slug = generateSlug(newName);

    try {
      let imageUrl: string | null = null;
      if (newImageFile) {
        imageUrl = await uploadCategoryImage(newImageFile, slug);
      }

      const payload: Record<string, string | null> = { name: newName.trim(), slug };
      if (imageUrl) payload.image_url = imageUrl;

      const { data, error } = await supabase.from('categories').insert([payload]).select();
      if (error) {
        alert(error.message);
      } else if (data) {
        setCategories([data[0], ...categories]);
        setNewName('');
        setNewImageFile(null);
        setNewImagePreview(null);
        invalidateCategoryCache();
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add category');
    } finally {
      setSaving(false);
    }
  };

  const handleQuickImageChange = async (category: Category, file: File) => {
    setUploadingId(category.id);
    try {
      const publicUrl = await uploadCategoryImage(file, category.slug);
      const { error } = await supabase
        .from('categories')
        .update({ image_url: publicUrl })
        .eq('id', category.id);

      if (error) {
        if (error.message.includes('image_url')) {
          alert('Please add the image_url column in Supabase SQL Editor:\nALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_url text;');
        } else {
          alert(error.message);
        }
      } else {
        setCategories(prev => prev.map(c => c.id === category.id ? { ...c, image_url: publicUrl } : c));
        invalidateCategoryCache();
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploadingId(null);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) {
      setIsEditing(null);
      return;
    }

    setSaving(true);
    const slug = generateSlug(editName);

    try {
      const updates: Record<string, string> = { name: editName.trim(), slug };
      if (editImageFile) {
        updates.image_url = await uploadCategoryImage(editImageFile, slug);
      }

      const { error } = await supabase.from('categories').update(updates).eq('id', id);
      if (error) {
        alert(error.message);
      } else {
        setCategories(categories.map(c => c.id === id ? { ...c, ...updates } : c));
        setIsEditing(null);
        setEditImageFile(null);
        setEditImagePreview(null);
        invalidateCategoryCache();
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Products in this category will become uncategorized.')) return;
    
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      setCategories(categories.filter(c => c.id !== id));
      invalidateCategoryCache();
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-plum-950">Categories</h1>
          <p className="text-sm text-plum-900/60 mt-1">Manage store categories and their homepage cover pictures.</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-lavender-100 mb-8 flex flex-col sm:flex-row gap-4 sm:items-end">
        <div className="flex-1">
          <label className="block text-sm font-bold text-plum-950 mb-2">Add New Category</label>
          <input 
            type="text" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="e.g. Flower Bouquets"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-plum-950 mb-2">Picture (Optional)</label>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-lavender-200 bg-lavender-50/60 hover:bg-lavender-100 text-sm font-semibold text-plum-950 transition-colors">
            {newImagePreview ? (
              <img src={newImagePreview} alt="Preview" className="w-5 h-5 rounded object-cover" />
            ) : (
              <ImagePlus className="w-4 h-4 text-primary" />
            )}
            <span>{newImageFile ? 'Change Pic' : 'Choose Pic'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setNewImageFile(file);
                  setNewImagePreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={!newName.trim() || saving}
          className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          Add
        </button>
      </form>

      <div className="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-plum-900/60">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-plum-900/60">No categories found. Create one above.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-lavender-50/50 border-b border-lavender-100 text-sm">
                <tr>
                  <th className="px-6 py-4 font-bold text-plum-950">Picture</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Name</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Slug</th>
                  <th className="px-6 py-4 font-bold text-plum-950 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lavender-100">
                {categories.map((category) => {
                  const displayImg =
                    (isEditing === category.id && editImagePreview) ||
                    category.image_url ||
                    getDefaultCategoryImage(category.slug);

                  return (
                    <tr key={category.id} className="hover:bg-lavender-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-16 rounded-xl overflow-hidden border border-lavender-200 bg-lavender-50 flex-shrink-0">
                            <img
                              src={displayImg}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                            {uploadingId === category.id && (
                              <div className="absolute inset-0 bg-plum-950/60 flex items-center justify-center">
                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                              </div>
                            )}
                          </div>
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lavender-50 hover:bg-lavender-100 text-xs font-bold text-plum-950 border border-lavender-200 transition-colors whitespace-nowrap">
                            <Upload className="w-3.5 h-3.5 text-primary" />
                            <span>Change Pic</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploadingId === category.id}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                if (isEditing === category.id) {
                                  setEditImageFile(file);
                                  setEditImagePreview(URL.createObjectURL(file));
                                } else {
                                  void handleQuickImageChange(category, file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isEditing === category.id ? (
                          <input 
                            type="text" 
                            autoFocus
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full max-w-xs"
                          />
                        ) : (
                          <span className="font-medium text-plum-950">{category.name}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-plum-900/60 text-sm font-mono">
                        {isEditing === category.id ? generateSlug(editName) : category.slug}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {isEditing === category.id ? (
                            <>
                              <button onClick={() => handleUpdate(category.id)} disabled={saving} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setIsEditing(null);
                                  setEditImageFile(null);
                                  setEditImagePreview(null);
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => {
                                  setIsEditing(category.id);
                                  setEditName(category.name);
                                  setEditImageFile(null);
                                  setEditImagePreview(null);
                                }} 
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Edit category name & picture"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(category.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete category">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
