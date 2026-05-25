import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomMap from './components/CustomMap';
import WhatsAppMock from './components/WhatsAppMock';
import AIPipeline from './components/AIPipeline';
import Marketplace from './components/Marketplace';
import ProductDetail from './components/ProductDetail';
import ImpactDashboard from './components/ImpactDashboard';
<<<<<<< HEAD
import BackendStatus from './components/BackendStatus';
import { products, artisans } from './data/mockData';
import { mapBackendProductToUI } from './services/kriticamApi';
import { Sparkles, ArrowRight, UploadCloud, Fingerprint, FileText, CheckCircle2, Star, Quote } from 'lucide-react';
=======
import AIAssistant from './components/AIAssistant';
import { products } from './data/mockData';
import { t, translateField } from './utils/translator';
import { Sparkles, ArrowRight, UploadCloud, Fingerprint, FileText, CheckCircle2, Quote } from 'lucide-react';
import { useEffect } from 'react';

// Premium interactive counter component
const AnimatedCounter = ({ value, duration = 1800, prefix = "", suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const targetValue = value * Math.pow(10, decimals);
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = progress * targetValue;
      setCount(current / Math.pow(10, decimals));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, decimals, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString(undefined, { 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
      })}
      {suffix}
    </span>
  );
};
>>>>>>> d1704c7 (updated)

export default function App() {
  const [activeScreen, setActiveScreen] = useState('landing'); // 'landing', 'whatsapp', 'pipeline', 'marketplace', 'product-detail', 'dashboard'
  const [activeProduct, setActiveProduct] = useState(products[0]);
<<<<<<< HEAD
=======
  
  // Dynamic Catalog State - starts with default 4 products
  const [productList, setProductList] = useState(products.slice(0, 4));
  
  // Accessibility Lifted States
  const [language, setLanguage] = useState('EN'); 
  const [ruralMode, setRuralMode] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [largeText, setLargeText] = useState(false);
>>>>>>> d1704c7 (updated)

  // Navigate to pipeline with uploaded product from WhatsApp simulator
  // Accepts both mock products AND live backend responses (mapped to UI schema)
  const handleWhatsAppUploadComplete = (product) => {
    // If the product came from the live API, map it to UI schema first
    const uiProduct = product.isLiveItem ? product : product;
    setActiveProduct(uiProduct);
    setActiveScreen('pipeline');
  };

<<<<<<< HEAD
  // Pipeline verification completed
  const handlePipelineComplete = (nextAction) => {
=======
  const handlePipelineComplete = (nextAction, product) => {
    if (product) {
      setProductList(prev => {
        // Prepend new craft if not already present
        if (prev.some(p => p.id === product.id)) return prev;
        return [product, ...prev];
      });
    }
>>>>>>> d1704c7 (updated)
    if (nextAction === 'view-marketplace') {
      setActiveScreen('marketplace');
    }
  };

  const handleProductSelect = (product) => {
    setActiveProduct(product);
    setActiveScreen('product-detail');
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between">
      
      {/* Global Navigation Header */}
<<<<<<< HEAD
      <Navbar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
=======
      <Navbar 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen} 
        language={language}
        setLanguage={setLanguage}
        ruralMode={ruralMode}
        lowBandwidth={lowBandwidth}
        largeText={largeText}
      />
>>>>>>> d1704c7 (updated)

      {/* Main Screen Layout Routing */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20">
        
        {/* LANDING PAGE SCREEN */}
        {activeScreen === 'landing' && (
          <div className="space-y-24">
            
            {/* Cinematic Luxury Hero Section */}
            <section className="relative grid-bg py-16 md:py-24 text-center space-y-8 overflow-hidden rounded-3xl border border-gold-500/10">
<<<<<<< HEAD
              
              {/* Soft decorative background glow circles */}
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gold-400/5 filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-terracotta-500/5 filter blur-3xl pointer-events-none" />
=======
              <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gold-400/10 filter blur-3xl pointer-events-none animate-blob-1" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-terracotta-500/10 filter blur-3xl pointer-events-none animate-blob-2" />
>>>>>>> d1704c7 (updated)

              <div className="space-y-4 max-w-3xl mx-auto px-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-100 border border-gold-500/20 text-[10px] tracking-widest text-gold-600 font-bold uppercase animate-pulse-subtle">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                  Preserving Heritage via AI Provenance
                </span>
                
                <h1 className="title-serif text-5xl md:text-7xl font-light text-charcoal tracking-tight leading-[1.05]">
                  From Rural Hands <br />
                  <span className="italic font-normal text-terracotta">to Global Galleries</span>
                </h1>
                
                <p className="text-xs md:text-sm text-charcoal-700/60 leading-relaxed font-sans max-w-xl mx-auto font-light pt-2">
                  HaathSe empowers traditional Indian artisans to sell globally using zero-literacy WhatsApp onboarding, computer vision material analysis, and blockchain provenance storytelling.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-4">
                <button
                  onClick={() => setActiveScreen('marketplace')}
                  className="px-7 py-3.5 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-charcoal/90 transition-all duration-300 shadow-premium flex items-center gap-2"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveScreen('whatsapp')}
                  className="px-7 py-3.5 rounded-full border border-gold-500/30 text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-gold-100 hover:border-gold-500 transition-all duration-300 bg-white"
                >
                  Onboard Artisan
                </button>
              </div>

              {/* Key Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-5xl mx-auto px-6 border-t border-gold-500/10">
                <div className="text-center">
                  <p className="text-3xl font-bold font-mono text-charcoal">
                    <AnimatedCounter value={1240} suffix="+" />
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal-700/50 mt-1 font-semibold">Weavers & Potters</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-mono text-charcoal">
                    <AnimatedCounter value={4.28} prefix="₹" suffix=" Cr" decimals={2} />
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal-700/50 mt-1 font-semibold">Wholesale Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-mono text-terracotta">
                    <AnimatedCounter value={154} prefix="+" suffix="%" />
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal-700/50 mt-1 font-semibold">Artisan Income Rise</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-mono text-charcoal">
                    <AnimatedCounter value={98.1} suffix="%" decimals={1} />
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal-700/50 mt-1 font-semibold">Audit Integrity</p>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="title-serif text-3xl md:text-4xl text-charcoal font-medium">The Zero-Touch Onboarding Pipeline</h2>
                <p className="text-xs text-charcoal-700/60 mt-2 font-sans font-light">
                  Bridging the digital divide by removing apps and text forms. A single chat initiates global distribution.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gold-500/10 shadow-premium space-y-4 text-left relative overflow-hidden group">
                  <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mb-6 border border-gold-500/15">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <h3 className="title-serif text-2xl text-charcoal font-medium">1. WhatsApp Upload</h3>
                  <p className="text-xs text-charcoal-700/60 leading-relaxed font-sans font-light">
                    Artisans upload a close-up photo/video of their craft and speak about its history in their local dialect.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gold-500/10 shadow-premium space-y-4 text-left relative overflow-hidden group">
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta mb-6 border border-terracotta/15">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <h3 className="title-serif text-2xl text-charcoal font-medium">2. AI Material Scan</h3>
                  <p className="text-xs text-charcoal-700/60 leading-relaxed font-sans font-light">
                    KritiCam AI extracts frames, audits weaving density or metal ratios, and transcribes local speech dialects.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gold-500/10 shadow-premium space-y-4 text-left relative overflow-hidden group">
                  <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mb-6 border border-gold-500/15">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="title-serif text-2xl text-charcoal font-medium">3. Global B2B Listing</h3>
                  <p className="text-xs text-charcoal-700/60 leading-relaxed font-sans font-light">
                    An immutable provenance ledger certificate is hashed, and a luxury wholesale catalog listing is published.
                  </p>
                </div>
              </div>
            </section>

            {/* Showcase Section */}
            <section className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="text-left">
                  <h2 className="title-serif text-3xl md:text-4xl text-charcoal font-medium">Live Curations</h2>
                  <p className="text-xs text-charcoal-700/60 mt-1 font-sans font-light">Explore a preview of newly audited handcrafted pieces.</p>
                </div>
                <button
                  onClick={() => setActiveScreen('marketplace')}
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-terracotta hover:text-terracotta-600 transition-colors"
                >
                  View Full Exhibition
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mini Catalog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {productList.slice(0, 4).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleProductSelect(prod)}
                    className="group cursor-pointer bg-white rounded-2xl border border-gold-500/10 shadow-premium overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] bg-charcoal-50 overflow-hidden relative">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-3 left-3 bg-charcoal/90 text-ivory text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                        {prod.kritiCamScore}% AI Audit
                      </div>
                    </div>
                    <div className="p-4 space-y-3 text-left">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-gold-600 font-semibold">{prod.craft}</p>
                        <h4 className="text-sm font-semibold text-charcoal truncate mt-0.5">{prod.name}</h4>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gold-500/5">
                        <p className="text-xs font-bold text-charcoal font-mono">₹{prod.priceINR.toLocaleString()}</p>
                        <span className="text-[10px] text-terracotta font-semibold flex items-center gap-0.5">
                          View Story <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Georeference Map Visual Section */}
            <section className="space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="title-serif text-3xl md:text-4xl text-charcoal font-medium">Global Craft Georeferencing</h2>
                <p className="text-xs text-charcoal-700/60 mt-2 font-sans font-light">
                  Tracing supply origins back to physical villages. Click pins on our georeference map to examine active guilds.
                </p>
              </div>
              
              {/* Map Component integration */}
              <CustomMap />
            </section>

            {/* Testimonials */}
            <section className="py-12 bg-charcoal text-ivory rounded-3xl border border-white/5 relative overflow-hidden shadow-luxury">
              <div className="absolute inset-0 opacity-[0.02] bg-grid" />
              <div className="max-w-4xl mx-auto px-6 space-y-8 text-center relative z-10">
                <div className="flex justify-center text-gold-400">
                  <Quote className="w-12 h-12 opacity-30" />
                </div>
                
                <h3 className="title-serif text-2xl md:text-3xl font-light leading-relaxed italic text-white/95">
                  "Before HaathSe, we had to travel 120km to Jaipur to show our blue pottery vases to wholesalers who paid us cents. Now, from my village, a single WhatsApp voice message lists my work globally for fair prices."
                </h3>
                
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-wider uppercase text-gold-400">Ram Swaroop</p>
                  <p className="text-[10px] text-ivory/50">Master Artisan • Kot Jewar, Rajasthan</p>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* WHATSAPP SIMULATOR SCREEN */}
        {activeScreen === 'whatsapp' && (
          <WhatsAppMock onUploadComplete={handleWhatsAppUploadComplete} />
        )}

        {/* AI PIPELINE VISUALIZATION SCREEN */}
        {activeScreen === 'pipeline' && (
          <AIPipeline activeProduct={activeProduct} onPipelineComplete={handlePipelineComplete} />
        )}

        {/* B2B MARKETPLACE SCREEN */}
        {activeScreen === 'marketplace' && (
<<<<<<< HEAD
          <Marketplace onProductSelect={handleProductSelect} />
=======
          <Marketplace onProductSelect={handleProductSelect} language={language} lowBandwidth={lowBandwidth} products={productList} />
>>>>>>> d1704c7 (updated)
        )}

        {/* PRODUCT DETAIL Storytelling SCREEN */}
        {activeScreen === 'product-detail' && (
          <ProductDetail product={activeProduct} onBackClick={() => setActiveScreen('marketplace')} />
        )}

        {/* ANALYTICS IMPACT DASHBOARD SCREEN */}
        {activeScreen === 'dashboard' && (
          <ImpactDashboard />
        )}

      </main>

      {/* Global Footer */}
      <Footer setActiveScreen={setActiveScreen} />

      {/* Live Backend Status Badge — visible to judges during demo */}
      <BackendStatus />
    </div>
  );
}
