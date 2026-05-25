import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Award, HelpCircle, ShieldCheck, MapPin, Truck, Trees, Heart, Landmark, Check } from 'lucide-react';
import { artisans } from '../data/mockData';

export default function ProductDetail({ product, onBackClick }) {
  const artisan = artisans.find(a => a.id === product.artisanId) || artisans[0];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isVerifyingCert, setIsVerifyingCert] = useState(false);
  const [certVerified, setCertVerified] = useState(false);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleVerifyCert = () => {
    if (certVerified) return;
    setIsVerifyingCert(true);
    setTimeout(() => {
      setIsVerifyingCert(false);
      setCertVerified(true);
    }, 2000);
  };

  // Mock timeline milestones based on selected artisan
  const timelineMilestones = [
    { year: "14th Century", title: "Royal Origin", desc: "Craft introduced to the region under royal patronage." },
    { year: "1972", title: "Family Guild Founded", desc: "Artisan's grandparents set up the family weaving loom guild." },
    { year: "2008", title: "Mastery Handover", desc: "Passed down to the current master after a 10-year apprenticeship." },
    { year: "Present", title: "HaathSe Digitalization", desc: "First global direct listing registered via KritiCam AI." }
  ];

  return (
    <div className="w-full space-y-16 animate-fade-in text-left">
      
      {/* Back Button & Navigation */}
      <div className="flex items-center justify-between border-b border-gold-500/10 pb-6">
        <button 
          onClick={onBackClick}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-charcoal-700/80 hover:text-charcoal transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </button>

        <div className="flex items-center gap-2 text-[10px] text-gold-600 uppercase tracking-widest font-bold border border-gold-500/20 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          KritiCam Verified Listing
        </div>
      </div>

      {/* Hero Showcase Section (Apple-style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Immersive Image Display */}
        <div className="lg:col-span-7 bg-charcoal-50 rounded-3xl overflow-hidden shadow-luxury border border-gold-500/10 relative aspect-[4/3] lg:aspect-[16/11]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <span className="bg-white/95 text-charcoal text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full shadow-premium border border-gold-500/10 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-terracotta" />
              {artisan.village}, {artisan.state}
            </span>
          </div>
        </div>

        {/* High-end Purchase & Core Details */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-2">{product.craft}</p>
            <h2 className="title-serif text-4xl md:text-5xl text-charcoal leading-tight font-medium">
              {product.name}
            </h2>
          </div>

          {/* Pricing Summary */}
          <div className="p-6 bg-white rounded-2xl border border-gold-500/10 shadow-premium flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-charcoal/40 font-semibold mb-0.5">Wholesale B2B Pricing</p>
              <p className="text-3xl font-bold text-charcoal font-mono">
                ₹{product.priceINR.toLocaleString()}
                <span className="text-sm font-normal text-charcoal/50 ml-1">(${product.priceUSD} USD)</span>
              </p>
            </div>
            
            <button className="px-6 py-3.5 bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-charcoal/90 transition-all duration-300 shadow-premium">
              Acquire Lot
            </button>
          </div>

          {/* Materials Analysis list */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">Materials & Geometry Audit</h4>
            
            <div className="p-5 bg-charcoal-50 rounded-2xl border border-gold-500/10 text-xs text-charcoal-700 space-y-3 font-sans font-light">
              <div className="flex justify-between items-start gap-4">
                <span className="font-semibold text-charcoal-800 text-[10px] uppercase tracking-wider">Materials Used:</span>
                <span className="text-right">{product.materials}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="font-semibold text-charcoal-800 text-[10px] uppercase tracking-wider">Dimensions:</span>
                <span className="text-right">{product.dimensions}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="font-semibold text-charcoal-800 text-[10px] uppercase tracking-wider">Craft Weight:</span>
                <span className="text-right">{product.weight}</span>
              </div>
              <div className="pt-3 border-t border-gold-500/10 text-[11px] text-terracotta leading-relaxed italic">
                <strong>KritiCam Material Scan:</strong> {product.materialsAnalysis}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storytelling & Voice player Section (National Geographic) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gold-500/10 items-center">
        
        {/* Artisan Story Narratives */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block">Artisan Story & Heritage</span>
          <h3 className="title-serif text-3xl font-medium text-charcoal leading-snug">
            "Every thread, copper fold, and cobalt stroke holds the weight of our ancestors' prayers."
          </h3>
          <p className="text-xs text-charcoal-700/80 leading-relaxed font-sans font-light">
            {product.story}
          </p>

          {/* Voice Player card */}
          <div className="p-5 bg-[#ECE7DE] rounded-2xl border border-gold-500/15 flex flex-col md:flex-row gap-5 items-center">
            <button 
              onClick={toggleAudio}
              className="w-12 h-12 rounded-full bg-charcoal text-ivory flex items-center justify-center hover:bg-charcoal/90 transition-colors shadow-premium flex-shrink-0"
            >
              {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-ivory ml-0.5" />}
            </button>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-between gap-4 mb-2">
                <p className="text-[10px] uppercase tracking-widest text-charcoal font-semibold">Listen to the Artisan's Voice (Dialect)</p>
                <span className="text-[9px] px-2 py-0.5 rounded bg-charcoal/10 text-charcoal/70 uppercase">Whisper Voice note</span>
              </div>
              <p className="text-xs text-charcoal/80 font-light italic leading-relaxed">
                "{artisan.voiceTranscript}"
              </p>
            </div>
          </div>
        </div>

        {/* Historical Timeline Milestone List */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gold-500/10 shadow-premium space-y-6">
          <h4 className="text-[10px] uppercase tracking-widest text-gold-600 font-bold mb-4">Historical Timeline</h4>
          
          <div className="space-y-6 relative pl-6">
            <div className="absolute left-[7px] top-1.5 bottom-1.5 w-0.5 bg-gold-500/20" />
            
            {timelineMilestones.map((item, index) => (
              <div key={index} className="relative">
                <span className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-terracotta border border-white" />
                <h5 className="text-[10px] uppercase tracking-widest text-terracotta font-semibold mb-0.5">{item.year} - {item.title}</h5>
                <p className="text-xs text-charcoal/60 leading-relaxed font-sans font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split-Price transparency graph */}
      <div className="bg-charcoal rounded-3xl p-6 md:p-8 border border-white/5 text-ivory space-y-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold px-2 py-1 rounded bg-white/5 border border-white/10 inline-block mb-3">
            Fair Price Protocol
          </span>
          <h3 className="title-serif text-3xl font-medium text-white">
            Ethical Revenue Split
          </h3>
          <p className="text-xs text-ivory/50 font-sans font-light leading-relaxed max-w-xl">
            We ensure maximum payouts are routed directly to the weavers and potters. Transparency build trust. The breakdown of your purchase price is modeled below:
          </p>
        </div>

        {/* Visual Bar Splits */}
        <div className="space-y-6">
          {/* Stacked Progress Bar */}
          <div className="w-full h-8 bg-white/10 rounded-full flex overflow-hidden border border-white/5 shadow-inner">
            <div className="h-full bg-terracotta" style={{ width: '62%' }} title="Artisan Wages" />
            <div className="h-full bg-gold-500" style={{ width: '18%' }} title="Raw Materials" />
            <div className="h-full bg-emerald-600" style={{ width: '10%' }} title="Village Fund" />
            <div className="h-full bg-indigo-600" style={{ width: '6%' }} title="Logistics" />
            <div className="h-full bg-white/30" style={{ width: '4%' }} title="Platform Fee" />
          </div>

          {/* Bar Legends details */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="w-3 h-3 bg-terracotta rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Artisan Wage (62%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.artisanWage.toLocaleString()}</p>
            </div>
            
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="w-3 h-3 bg-gold-500 rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Materials (18%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.rawMaterials.toLocaleString()}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="w-3 h-3 bg-emerald-600 rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Village Fund (10%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.villageDevelopmentFund.toLocaleString()}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="w-3 h-3 bg-indigo-600 rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Logistics & Ins. (6%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.shippingInsurance.toLocaleString()}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 col-span-2 md:col-span-1">
              <span className="w-3 h-3 bg-white/30 rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Platform Fee (4%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.platformFee.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cryptographic blockchain certificate verification widget */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gold-500/10 shadow-premium flex flex-col md:flex-row gap-8 items-center justify-between terracotta-glow">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="p-1 rounded bg-gold-100 text-gold-600">
              <Award className="w-4 h-4" />
            </span>
            <h4 className="text-xs uppercase tracking-widest text-gold-600 font-bold">Immutable Provenance Certificate</h4>
          </div>
          
          <h3 className="title-serif text-2xl font-medium text-charcoal">
            Blockchain Authenticity Registry
          </h3>
          
          <div className="font-mono text-[10px] text-charcoal/50 space-y-1">
            <p><strong>Ledger Contract:</strong> 0x47e1...78f579</p>
            <p><strong>Block Height:</strong> #HAATH-88402-METADATA</p>
            <p><strong>Registry Certificate URI:</strong> <span className="underline hover:text-gold-500 cursor-pointer">{product.provenanceCertUrl}</span></p>
          </div>
        </div>

        {/* Verify Action Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleVerifyCert}
            disabled={isVerifyingCert || certVerified}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-full border transition-all duration-300 shadow-premium ${
              certVerified 
                ? 'bg-green-600 text-white border-green-500 flex items-center gap-1.5' 
                : 'bg-charcoal text-ivory border-charcoal hover:bg-charcoal/90'
            }`}
          >
            {isVerifyingCert ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Querying Blockchain Ledger...
              </span>
            ) : certVerified ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Registry Match Confirmed
              </span>
            ) : (
              'Verify Ledger Integrity'
            )}
          </button>
          
          <p className="text-[9px] uppercase tracking-wider text-charcoal/40 font-semibold">
            SECURED DIRECT VIA ETHEREUM SMART CONTRACT
          </p>
        </div>
      </div>

      {/* Sustainable standards checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gold-500/10">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
            <Trees className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-charcoal font-semibold mb-1">Carbon-Neutral Process</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed font-sans font-light">
              Crafted manually using solar sun-drying or local firewood kilns. Net-zero logistics offset for international shipping.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-terracotta/10 text-terracotta">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-charcoal font-semibold mb-1">Supporting Artisanal Families</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed font-sans font-light">
              Guarantees double the average regional wages, feeding directly back into local village schools and healthcare funds.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-gold-100 text-gold-600">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-charcoal font-semibold mb-1">Heritage Preservation</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed font-sans font-light">
              Maintains classical motifs dating back hundreds of years, preventing cultural appropriation and commercial erosion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
