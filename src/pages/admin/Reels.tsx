import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, X } from 'lucide-react';
import { InstagramIcon } from '../../components/icons/InstagramIcon';

interface Reel {
  id: string;
  instagram_url: string;
  thumbnail_url: string;
  description: string;
}

export default function Reels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('reels').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setReels(data);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      alert('Please select a video file.');
      return;
    }
    
    setUploading(true);

    try {
      // Upload Video
      const videoExt = videoFile.name.split('.').pop();
      const videoName = `reel-video-${Date.now()}.${videoExt}`;
      const { error: videoError } = await supabase.storage.from('reels-videos').upload(videoName, videoFile);
      if (videoError) throw new Error(`Storage Error: ${videoError.message}. Make sure the reels-videos bucket exists and has correct policies.`);
      const { data: videoData } = supabase.storage.from('reels-videos').getPublicUrl(videoName);

      // Insert into database (use empty string for thumbnail_url to satisfy NOT NULL)
      const { data, error } = await supabase.from('reels').insert([{
        instagram_url: videoData.publicUrl, // Repurposed for raw video URL
        thumbnail_url: '', 
        description: formData.description
      }]).select();

      if (error) throw new Error(`Database Error: ${error.message}`);
      
      if (data) {
        setReels([data[0], ...reels]);
        setShowModal(false);
        setFormData({ description: '' });
        setVideoFile(null);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reel?')) return;
    const { error } = await supabase.from('reels').delete().eq('id', id);
    if (!error) {
      setReels(reels.filter(r => r.id !== id));
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-plum-950 flex items-center gap-3">
          <InstagramIcon className="w-8 h-8 text-primary" /> Reels
        </h1>
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Reel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-plum-900/60">Loading reels...</div>
        ) : reels.length === 0 ? (
          <div className="col-span-full p-8 text-center text-plum-900/60 bg-white rounded-2xl border border-lavender-100">
            No reels found. Add one to show on the homepage.
          </div>
        ) : (
          reels.map((reel) => (
            <div key={reel.id} className="bg-white rounded-2xl border border-lavender-100 overflow-hidden shadow-sm group">
              <div className="aspect-[9/16] relative bg-lavender-50">
                {(reel.instagram_url.includes('supabase.co') || reel.instagram_url.endsWith('.mp4')) ? (
                  <video 
                    src={reel.instagram_url}
                    preload="metadata"
                    className="w-full h-full object-cover"
                  ></video>
                ) : (
                  <img src={reel.thumbnail_url || 'https://via.placeholder.com/300x500?text=Video+Reel'} alt="Reel thumbnail" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x500?text=Video+Reel'; }} />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => handleDelete(reel.id)} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-plum-900/60 mb-2 truncate" title={reel.instagram_url}>{reel.instagram_url}</p>
                <p className="text-sm font-medium text-plum-950 line-clamp-2">{reel.description || 'No description'}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-plum-950">Add New Reel</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-lavender-50 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-plum-950 mb-2">Video File (.mp4)</label>
                <input 
                  type="file" required accept="video/*"
                  onChange={e => setVideoFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 text-sm text-plum-900 border border-lavender-200 rounded-xl cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary-hover"
                />
                <p className="text-xs text-plum-900/60 mt-2">The browser will automatically use the first frame of the video as the thumbnail.</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-plum-950 mb-2">Description (Optional)</label>
                <textarea 
                  rows={2}
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-plum-900 hover:bg-lavender-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Save Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
