import React, { useState } from 'react';
import { Shuffle, Sparkles, Upload, X, Plus } from 'lucide-react';

const OutfitGenerator = () => {
  const [outfits, setOutfits] = useState({
    hauts: [],
    bas: [],
    chaussures: [],
    accessoires: []
  });

  const [currentOutfit, setCurrentOutfit] = useState({
    haut: null,
    bas: null,
    chaussure: null,
    accessoire: null
  });

  const [showUpload, setShowUpload] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleImageUpload = (category, e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newItem = {
          id: Date.now() + Math.random(),
          name: file.name.split('.')[0],
          image: event.target.result
        };
        
        setOutfits(prev => ({
          ...prev,
          [category]: [...prev[category], newItem]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteItem = (category, id) => {
    setOutfits(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const generateRandomOutfit = () => {
    if (outfits.hauts.length === 0 || outfits.bas.length === 0 || 
        outfits.chaussures.length === 0 || outfits.accessoires.length === 0) {
      alert('Veuillez ajouter au moins un vêtement dans chaque catégorie !');
      return;
    }

    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentOutfit({
        haut: outfits.hauts[Math.floor(Math.random() * outfits.hauts.length)],
        bas: outfits.bas[Math.floor(Math.random() * outfits.bas.length)],
        chaussure: outfits.chaussures[Math.floor(Math.random() * outfits.chaussures.length)],
        accessoire: outfits.accessoires[Math.floor(Math.random() * outfits.accessoires.length)]
      });
      setIsAnimating(false);
      setShowUpload(false);
    }, 300);
  };

  const CategoryUpload = ({ category, label, emoji }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">{emoji}</span>
        <h3 className="text-xl font-bold text-gray-800">{label}</h3>
        <span className="ml-auto bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
          {outfits[category].length}
        </span>
      </div>
      
      <label className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all mb-4">
        <Plus className="w-5 h-5" />
        <span className="font-semibold">Ajouter des photos</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleImageUpload(category, e)}
        />
      </label>

      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
        {outfits[category].map(item => (
          <div key={item.id} className="relative group">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              onClick={() => deleteItem(category, item.id)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const OutfitDisplay = ({ item, label }) => {
    if (!item) return null;
    
    return (
      <div className="bg-white rounded-2xl p-4 shadow-xl transform transition-all duration-300">
        <p className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-2 text-center">
          {label}
        </p>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover rounded-xl mb-3"
        />
        <p className="text-lg font-semibold text-gray-800 text-center">{item.name}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white animate-pulse" />
            <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
              Mon Générateur de Tenues
            </h1>
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white animate-pulse" />
          </div>
          <p className="text-white text-base md:text-lg font-medium">
            Uploadez vos vêtements et créez des looks uniques !
          </p>
        </div>

        {showUpload && (
          <div className="mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-6 h-6" />
                <h2 className="text-xl font-bold">Étape 1 : Ajoutez vos vêtements</h2>
              </div>
              <p className="text-sm">Téléchargez des photos de vos vêtements dans chaque catégorie</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <CategoryUpload category="hauts" label="Hauts" emoji="👕" />
              <CategoryUpload category="bas" label="Bas" emoji="👖" />
              <CategoryUpload category="chaussures" label="Chaussures" emoji="👟" />
              <CategoryUpload category="accessoires" label="Accessoires" emoji="✨" />
            </div>
          </div>
        )}

        {!showUpload && currentOutfit.haut && (
          <div className={`mb-8 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mb-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                ✨ Votre tenue du jour
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OutfitDisplay item={currentOutfit.haut} label="Haut" />
              <OutfitDisplay item={currentOutfit.bas} label="Bas" />
              <OutfitDisplay item={currentOutfit.chaussure} label="Chaussures" />
              <OutfitDisplay item={currentOutfit.accessoire} label="Accessoire" />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={generateRandomOutfit}
            disabled={isAnimating}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shuffle className="w-6 h-6" />
            Générer une tenue
          </button>

          {!showUpload && (
            <button
              onClick={() => setShowUpload(true)}
              className="bg-white bg-opacity-80 text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Upload className="w-6 h-6" />
              Gérer mes vêtements
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitGenerator;