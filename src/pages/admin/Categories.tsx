import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  };

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const slug = generateSlug(newName);
    
    const { data, error } = await supabase.from('categories').insert([{ name: newName, slug }]).select();
    if (!error && data) {
      setCategories([data[0], ...categories]);
      setNewName('');
    } else {
      alert(error?.message);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) {
      setIsEditing(null);
      return;
    }
    
    const slug = generateSlug(editName);
    const { error } = await supabase.from('categories').update({ name: editName, slug }).eq('id', id);
    
    if (!error) {
      setCategories(categories.map(c => c.id === id ? { ...c, name: editName, slug } : c));
      setIsEditing(null);
    } else {
      alert(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Products in this category will become uncategorized.')) return;
    
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      setCategories(categories.filter(c => c.id !== id));
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-plum-950">Categories</h1>
      </div>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-lavender-100 mb-8 flex gap-4 items-end">
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
        <button 
          type="submit" 
          disabled={!newName.trim()}
          className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add
        </button>
      </form>

      <div className="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-plum-900/60">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-plum-900/60">No categories found. Create one above.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-lavender-50/50 border-b border-lavender-100 text-sm">
              <tr>
                <th className="px-6 py-4 font-bold text-plum-950">Name</th>
                <th className="px-6 py-4 font-bold text-plum-950">Slug</th>
                <th className="px-6 py-4 font-bold text-plum-950 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lavender-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-lavender-50/30 transition-colors">
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
                  <td className="px-6 py-4 flex justify-end gap-2">
                    {isEditing === category.id ? (
                      <>
                        <button onClick={() => handleUpdate(category.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIsEditing(null)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => { setIsEditing(category.id); setEditName(category.name); }} 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(category.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
