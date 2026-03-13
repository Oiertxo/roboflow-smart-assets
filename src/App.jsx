import { useState, useEffect, useMemo } from 'react';
import { analyzeImage } from './services/roboflow';
import { Upload, Search, Trash2, ImageIcon, Loader2 } from 'lucide-react';

function App() {
  // Inicializar desde localStorage si existe
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('roboflow-assets');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // Guardar en localStorage automáticamente cuando cambien los assets
  useEffect(() => {
    localStorage.setItem('roboflow-assets', JSON.stringify(assets));
  }, [assets]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(',')[1];
        const result = await analyzeImage(base64);
        
        // FIX: Use Set to ensure unique tags per image
        const uniqueTags = [...new Set(result.predictions.map(p => p.class.toLowerCase()))];
        
        const newAsset = {
          id: Date.now(),
          url: reader.result,
          tags: uniqueTags, // Clean data
          timestamp: new Date().toLocaleDateString()
        };

        setAssets(prev => [newAsset, ...prev]);
      } catch (err) {
        alert("Error analyzing image");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const allTags = useMemo(() => {
    const rawTags = assets.flatMap(asset => asset.tags);
    const uniqueNormalizedTags = [...new Set(rawTags.map(t => t.toLowerCase()))];
    return uniqueNormalizedTags.sort((a, b) => a.localeCompare(b));
  }, [assets]);

  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredAssets = assets.filter(asset => 
    selectedTags.length === 0 || selectedTags.some(tag => asset.tags.includes(tag))
  );

  const deleteAsset = (id) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">SMART ASSETS <span className="text-cyan-500">PRO</span></h1>
            <p className="text-slate-500 text-sm">Multi-tag Intelligent Search</p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            {/* Desplegable para añadir etiquetas al filtro múltiple */}
            <select 
              onChange={(e) => {
                if(e.target.value) toggleTag(e.target.value);
                e.target.value = ""; // Reset dropdown after selection
              }}
              className="w-full md:w-64 bg-slate-900/50 border border-slate-800 rounded-full px-6 py-2.5 text-sm font-bold text-cyan-500 outline-none cursor-pointer hover:bg-slate-800 transition-all appearance-none"
            >
              <option value="">+ Add filter tag...</option>
              {allTags.filter(t => !selectedTags.includes(t)).map(tag => (
                <option key={tag} value={tag} className="bg-slate-900 text-white uppercase">{tag.toUpperCase()}</option>
              ))}
            </select>

            {selectedTags.length > 0 && (
              <button 
                onClick={() => setSelectedTags([])}
                className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                CLEAR ALL
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Filter Chips (Multi-selection) */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button 
            onClick={() => setSelectedTags([])}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedTags.length === 0 ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            ALL ASSETS
          </button>
          {allTags.map(tag => (
            <button 
              key={`filter-tag-${tag}`} // Prefixed key for extra safety
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase flex items-center gap-2 transition-all ${selectedTags.includes(tag) ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              {tag}
              {selectedTags.includes(tag) && <span className="text-[10px] ml-1">✕</span>}
            </button>
          ))}
        </div>

        {/* Grid / Canvas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Upload Card */}
          <label className="group relative aspect-square bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all order-first">
            {loading ? (
              <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            ) : (
              <>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="text-cyan-500 w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-400">Add New Asset</span>
              </>
            )}
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
          </label>

          {/* Asset Cards */}
          {filteredAssets.map(asset => (
            <div key={asset.id} className="group relative aspect-square bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all">
              <img src={asset.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {asset.tags.map(t => (
                    <span key={t} className="bg-cyan-500 text-[10px] text-black font-black px-2 py-0.5 rounded uppercase">{t}</span>
                  ))}
                </div>
                <button 
                  onClick={() => deleteAsset(asset.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;