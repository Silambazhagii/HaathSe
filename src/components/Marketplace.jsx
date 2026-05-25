import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, CheckCircle2, Sparkles, MapPin, ArrowRight, Play, Pause, Volume2 } from 'lucide-react';
import { products, artisans } from '../data/mockData';
import { t, translateField, speakText } from '../utils/translator';

export default function Marketplace({ onProductSelect, language, lowBandwidth }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [sortBy, setSortBy] = useState('authenticity');
  const [isLoading, setIsLoading] = useState(false);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);

  // Trigger simulated skeleton loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedState, sortBy]);

  const categories = ['All', 'Home Decor', 'Apparel'];
  const states = ['All', 'Rajasthan', 'Tamil Nadu', 'Chhattisgarh', 'Jammu & Kashmir'];

  // Handle play voice snippet from card
  const handlePlayVoice = (e, prod) => {
    e.stopPropagation(); // Prevent card click
    
    if (playingVoiceId === prod.id) {
      window.speechSynthesis.cancel();
      setPlayingVoiceId(null);
      return;
    }

    const artisan = artisans.find(a => a.id === prod.artisanId);
    if (!artisan) return;

    // Detect artisan dialect language
    const artisanLang = prod.id === "prod-1" ? "HI" : prod.id === "prod-2" ? "TA" : prod.id === "prod-3" ? "HI" : "EN";
    const voiceText = translateField(artisan, 'voiceTranscript', artisanLang);

    setPlayingVoiceId(prod.id);
    speakText(
      voiceText,
      artisanLang,
      () => setPlayingVoiceId(prod.id),
      () => setPlayingVoiceId(null)
    );
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const artisan = artisans.find((a) => a.id === prod.artisanId);
        
        // Search Filter (checks multi-language fields)
        const matchesSearch = 
          translateField(prod, 'name', language).toLowerCase().includes(searchQuery.toLowerCase()) ||
          translateField(prod, 'craft', language).toLowerCase().includes(searchQuery.toLowerCase()) ||
          artisan?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artisan?.village.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Category Filter
        const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;

        // State Filter
        const matchesState = selectedState === 'All' || artisan?.state === selectedState;

        return matchesSearch && matchesCategory && matchesState;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
        if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
        if (sortBy === 'authenticity') return b.kritiCamScore - a.kritiCamScore;
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedState, sortBy, language]);

  return (
    <div className="w-full space-y-12 font-sans">
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] uppercase tracking-widest text-terracotta font-semibold px-2.5 py-1 rounded bg-terracotta/10 border border-terracotta/20 inline-block">
          Luxury Wholesale Catalog
        </span>
        <h2 className="title-serif text-4xl md:text-5xl text-charcoal font-medium">
          {t("nav_marketplace", language)}
        </h2>
        <p className="text-xs text-charcoal-700/60 leading-relaxed font-sans font-light">
          Acquire verified, museum-grade heritage crafts directly from rural Indian artisan clusters. Every piece features a machine-audited provenance ledger ensuring fair-trade compensation.
        </p>
      </div>

      {/* Advanced Filtering controls */}
      <div className="bg-white p-6 rounded-3xl border border-gold-500/10 shadow-premium space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Live Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gold-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by craft, artisan name, village or material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-charcoal-50 rounded-full border border-gold-500/10 focus:outline-none focus:border-gold-500 text-xs text-charcoal placeholder-charcoal-700/40 font-sans font-light transition-colors"
            />
          </div>

          {/* Sorter Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-charcoal-700/60">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500" />
              <span>Sort by:</span>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-charcoal-50 rounded-full border border-gold-500/10 focus:outline-none focus:border-gold-500 text-xs text-charcoal font-sans font-medium cursor-pointer transition-colors"
            >
              <option value="authenticity">KritiCam Authenticity (High to Low)</option>
              <option value="price-asc">Wholesale Price (Low to High)</option>
              <option value="price-desc">Wholesale Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Categories and State Badges Filters */}
        <div className="flex flex-col gap-4 border-t border-gold-500/5 pt-4">
          
          {/* Categories Row */}
          <div className="flex flex-wrap items-center gap-2 text-left">
            <span className="text-[9px] uppercase tracking-wider text-charcoal-700/50 font-bold mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-ivory font-medium shadow-premium'
                    : 'bg-charcoal-50 text-charcoal-700/70 hover:bg-gold-100 hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* State Clusters Row */}
          <div className="flex flex-wrap items-center gap-2 text-left">
            <span className="text-[9px] uppercase tracking-wider text-charcoal-700/50 font-bold mr-2">State Cluster:</span>
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all ${
                  selectedState === st
                    ? 'bg-terracotta text-ivory font-medium shadow-premium'
                    : 'bg-charcoal-50 text-charcoal-700/70 hover:bg-gold-100 hover:text-charcoal'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Products / Skeletons */}
      {isLoading ? (
        // Premium Skeleton Grid Loader
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-3xl border border-gold-500/10 p-6 space-y-6 animate-pulse">
              <div className="aspect-[4/3] bg-charcoal-50 rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 bg-charcoal-50 rounded w-1/3" />
                <div className="h-6 bg-charcoal-50 rounded w-3/4" />
                <div className="h-8 bg-charcoal-50 rounded-full w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => {
            const artisan = artisans.find((a) => a.id === prod.artisanId);
            
            return (
              <div
                key={prod.id}
                onClick={() => onProductSelect(prod)}
                className="group cursor-pointer bg-white rounded-3xl border border-gold-500/10 shadow-premium overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury flex flex-col justify-between"
              >
                
                {/* Cinematic Image Container */}
                <div className="zoom-container aspect-[4/3] bg-charcoal-50 relative border-b border-gold-500/10">
                  {lowBandwidth ? (
                    // Low Bandwidth Placeholder Canvas/Pencil Stencil Outline representation
                    <div className="w-full h-full flex flex-col items-center justify-center bg-ivory p-6 border-2 border-dashed border-gold-500/30 text-charcoal/50">
                      <Sparkles className="w-8 h-8 text-gold-500 mb-2 animate-pulse-subtle" />
                      <p className="font-mono text-[9px] uppercase tracking-wider">Low-Bandwidth Mode Active</p>
                      <p className="font-semibold text-xs text-charcoal mt-1 text-center font-serif">
                        {translateField(prod, 'name', language)}
                      </p>
                      <p className="text-[10px] italic mt-1">Image stencil loaded</p>
                    </div>
                  ) : (
                    <img
                      src={prod.image}
                      alt={translateField(prod, 'name', language)}
                      className="zoom-image w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Floating AI Verification Badge */}
                  <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                    <span className="flex items-center gap-1 bg-charcoal/90 text-ivory text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-white/10 shadow-premium">
                      <Sparkles className="w-3 h-3 text-gold-400" />
                      {prod.kritiCamScore}% AI Audit
                    </span>
                  </div>

                  {/* AI Translated Tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="flex items-center gap-1 bg-white/95 text-charcoal text-[9px] uppercase tracking-widest font-semibold px-2 py-1.5 rounded-full shadow-premium border border-gold-500/10">
                      AI Translated ({language})
                    </span>
                  </div>

                  {/* Regional Label */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="flex items-center gap-1 bg-white/95 text-charcoal text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-md shadow-premium border border-gold-500/10">
                      <MapPin className="w-2.5 h-2.5 text-terracotta" />
                      {artisan?.village}
                    </span>
                  </div>

                  {/* Audio Preview trigger on Card image */}
                  <button
                    onClick={(e) => handlePlayVoice(e, prod)}
                    className={`absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow-premium transition-all duration-300 ${
                      playingVoiceId === prod.id 
                        ? 'bg-terracotta text-white' 
                        : 'bg-white/90 text-charcoal hover:bg-white hover:scale-105'
                    }`}
                    title="Listen to Artisan Voice Description"
                  >
                    {playingVoiceId === prod.id ? (
                      <Pause className="w-3.5 h-3.5 fill-white" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Card Details text info */}
                <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] uppercase tracking-widest text-gold-600 font-semibold">
                        {translateField(prod, 'craft', language)}
                      </p>
                      {prod.verifiedBadge && (
                        <span className="flex items-center gap-1 text-[9px] text-green-600 font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Fair-Trade
                        </span>
                      )}
                    </div>
                    
                    <h3 className="title-serif text-xl font-medium text-charcoal group-hover:text-terracotta transition-colors leading-tight">
                      {translateField(prod, 'name', language)}
                    </h3>
                  </div>

                  {/* Artisan Mini Profile */}
                  <div className="flex items-center gap-2.5 py-2 border-y border-gold-500/5">
                    <img
                      src={artisan?.avatar}
                      alt={artisan?.name}
                      className="w-7 h-7 rounded-full object-cover border border-gold-500/20"
                    />
                    <div>
                      <p className="text-[8px] uppercase tracking-wider text-charcoal/40 font-semibold leading-none">Artisan Partner</p>
                      <p className="text-xs text-charcoal font-semibold mt-0.5">{artisan?.name}</p>
                    </div>
                  </div>

                  {/* Pricing and Action Link */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[8px] uppercase tracking-wider text-charcoal/40 font-semibold leading-none">Wholesale Price</p>
                      <p className="text-lg font-bold text-charcoal font-mono">
                        ₹{prod.priceINR.toLocaleString()} <span className="text-xs text-charcoal/50 font-normal">(${prod.priceUSD})</span>
                      </p>
                    </div>
                    
                    <span className="w-8 h-8 rounded-full bg-charcoal-50 flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-ivory transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gold-500/10 shadow-premium space-y-4">
          <p className="text-xs text-charcoal-700/60 uppercase tracking-widest font-semibold">No products match your criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedState('All');
            }}
            className="px-5 py-2.5 rounded-full border border-gold-500/30 text-xs font-semibold text-charcoal hover:border-charcoal transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
