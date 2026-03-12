import { useState } from 'react';
import { analyzeImage } from './services/roboflow';
import { Upload, ImageIcon, Loader2 } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    
    // Convert image to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(',')[1];
        const result = await analyzeImage(base64);
        setPredictions(result.predictions || []);
      } catch (err) {
        alert("Check your API key and console");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Roboflow Smart Assets
        </h1>
        <p className="text-slate-400 mt-2">AI-Powered Image Tagging</p>
      </header>

      <label className="flex flex-col items-center justify-center w-64 h-32 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors bg-slate-800/50">
        {loading ? <Loader2 className="animate-spin" /> : <Upload className="mb-2" />}
        <span className="text-sm">{loading ? 'Analyzing...' : 'Upload Image'}</span>
        <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
      </label>

      <div className="mt-12 flex flex-wrap gap-3 justify-center">
        {predictions.map((p, i) => (
          <span key={i} className="px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-300 text-sm font-medium">
            {p.class} ({Math.round(p.confidence * 100)}%)
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;