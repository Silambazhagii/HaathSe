import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Award, ShieldCheck, MapPin, Truck, Trees, Heart, Landmark, Check, Volume2, VolumeX } from 'lucide-react';
import { artisans } from '../data/mockData';
import { t, translateField, speakText } from '../utils/translator';

export default function ProductDetail({ product, onBackClick, language, lowBandwidth }) {
  const artisan = artisans.find(a => a.id === product.artisanId) || artisans[0];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isNarratingStory, setIsNarratingStory] = useState(false);
  const [isVerifyingCert, setIsVerifyingCert] = useState(false);
  const [certVerified, setCertVerified] = useState(false);

  // Auto-stop any voice playbacks when navigating away
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Listen to original artisan dialect audio note
  const toggleDialectAudio = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    
    setIsNarratingStory(false);
    setIsPlayingAudio(true);
    
    // Dialect is recorded in original regional accent
    const artisanLang = product.id === "prod-1" ? "HI" : product.id === "prod-2" ? "TA" : product.id === "prod-3" ? "HI" : "EN";
    const voiceText = translateField(artisan, 'voiceTranscript', artisanLang);

    speakText(
      voiceText, 
      artisanLang, 
      () => setIsPlayingAudio(true), 
      () => setIsPlayingAudio(false)
    );
  };

  // Narrate translated English/Hindi catalog narrative
  const toggleStoryNarration = () => {
    if (isNarratingStory) {
      window.speechSynthesis.cancel();
      setIsNarratingStory(false);
      return;
    }

    setIsPlayingAudio(false);
    setIsNarratingStory(true);
    
    const storyText = translateField(product, 'story', language);
    speakText(
      storyText,
      language,
      () => setIsNarratingStory(true),
      () => setIsNarratingStory(false)
    );
  };

  const handleVerifyCert = () => {
    if (certVerified) return;
    setIsVerifyingCert(true);
    setTimeout(() => {
      setIsVerifyingCert(false);
      setCertVerified(true);
    }, 2000);
  };

  const timelineMilestones = [
    { year: "14th Century", titleKey: "timeline_milestone_1", descKey: "timeline_milestone_1_desc" },
    { year: "1972", titleKey: "timeline_milestone_2", descKey: "timeline_milestone_2_desc" },
    { year: "2008", titleKey: "timeline_milestone_3", descKey: "timeline_milestone_3_desc" },
    { year: "Present", titleKey: "timeline_milestone_4", descKey: "timeline_milestone_4_desc" }
  ];

  // Helper translations for static timeline keys
  const getTimelineText = (key) => {
    const dict = {
      timeline_milestone_1: { EN: "Royal Origin", HI: "शाही उत्पत्ति", TA: "அரச தோற்றம்" },
      timeline_milestone_1_desc: { EN: "Craft introduced to the region under royal patronage.", HI: "शाही संरक्षण में क्षेत्र में कला पेश की गई।", TA: "அரச ஆதரவின் கீழ் இப்பகுதியில் கைவினை அறிமுகப்படுத்தப்பட்டது." },
      timeline_milestone_2: { EN: "Family Guild Founded", HI: "पारिवारिक गिल्ड की स्थापना", TA: "குடும்பக் குழு நிறுவப்பட்டது" },
      timeline_milestone_2_desc: { EN: "Artisan's grandparents set up the family weaving loom guild.", HI: "कलाकार के दादा-दादी ने पारिवारिक बुनाई करघा गिल्ड की स्थापना की।", TA: "கைவினைஞரின் தாத்தா பாட்டி குடும்ப நெசவு தறியை அமைத்தனர்." },
      timeline_milestone_3: { EN: "Mastery Handover", HI: "मास्टरी हैंडओवर", TA: "தேர்ச்சி ஒப்படைப்பு" },
      timeline_milestone_3_desc: { EN: "Passed down to the current master after a 10-year apprenticeship.", HI: "10 साल की शिक्षुता के बाद वर्तमान मास्टर को सौंप दिया गया।", TA: "10 வருட பயிற்சிக்குப் பின் தற்போதைய கைவினைஞருக்கு ஒப்படைக்கப்பட்டது." },
      timeline_milestone_4: { EN: "HaathSe Digitalization", HI: "हाथसे डिजिटलीकरण", TA: "ஹாத்ஸே டிஜிட்டல் மயமாக்கல்" },
      timeline_milestone_4_desc: { EN: "First global direct listing registered via KritiCam AI.", HI: "कृति कैम एआई के माध्यम से पहला वैश्विक प्रत्यक्ष पंजीकरण दर्ज किया गया।", TA: "கிருடிகேம் AI மூலம் பதிவு செய்யப்பட்ட முதல் உலகளாவிய நேரடி பட்டியல்." }
    };
    if (!dict[key]) return key;
    return dict[key][language] || dict[key]['EN'] || key;
  };

  return (
    <div className="w-full space-y-16 animate-fade-in text-left font-sans">
      
      {/* Back button header */}
      <div className="flex items-center justify-between border-b border-gold-500/10 pb-6">
        <button 
          onClick={onBackClick}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-charcoal-700/80 hover:text-charcoal transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </button>

        <div className="flex items-center gap-2 text-[9px] text-gold-600 uppercase tracking-widest font-bold border border-gold-500/20 px-3 py-1 rounded-full bg-white shadow-premium">
          <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
          KritiCam Verified Provenance
        </div>
      </div>

      {/* Editorial layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Large Media display */}
        <div className="lg:col-span-7 bg-charcoal-50 rounded-3xl overflow-hidden shadow-luxury border border-gold-500/10 relative aspect-[4/3] lg:aspect-[16/11]">
          {lowBandwidth ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-ivory p-8 border-2 border-dashed border-gold-500/30 text-charcoal">
              <Award className="w-12 h-12 text-gold-500 mb-3" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold-600 font-bold">Pencil Stencils Active</p>
              <h3 className="title-serif text-2xl text-charcoal mt-2 text-center">
                {translateField(product, 'name', language)}
              </h3>
              <p className="text-xs text-charcoal-700/50 mt-1">Image disabled in low-bandwidth mode</p>
            </div>
          ) : (
            <img 
              src={product.image} 
              alt={translateField(product, 'name', language)} 
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
            <span className="bg-white/95 text-charcoal text-[9px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full shadow-premium border border-gold-500/10 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-terracotta" />
              {artisan.village}, {artisan.state}
            </span>
          </div>
        </div>

        {/* Purchase Options */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-2">
              {translateField(product, 'craft', language)}
            </p>
            <h2 className="title-serif text-4xl md:text-5xl text-charcoal leading-tight font-medium">
              {translateField(product, 'name', language)}
            </h2>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gold-500/10 shadow-premium flex justify-between items-center">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-charcoal/40 font-semibold mb-0.5">Wholesale B2B Pricing</p>
              <p className="text-3xl font-bold text-charcoal font-mono">
                ₹{product.priceINR.toLocaleString()}
                <span className="text-sm font-normal text-charcoal/50 ml-1">(${product.priceUSD} USD)</span>
              </p>
            </div>
            
            <button className="px-6 py-3.5 bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-charcoal/90 transition-all duration-300 shadow-premium border border-white/10">
              Acquire Lot
            </button>
          </div>

          {/* Geometry Scan stats */}
          <div className="space-y-4">
            <h4 className="text-[9px] uppercase tracking-widest text-gold-600 font-bold">Materials & Chemistry Analysis</h4>
            
            <div className="p-5 bg-charcoal-50 rounded-2xl border border-gold-500/10 text-xs text-charcoal-700 space-y-3 font-sans font-light">
              <div className="flex justify-between items-start gap-4">
                <span className="font-semibold text-charcoal-800 text-[9px] uppercase tracking-wider">Materials Used:</span>
                <span className="text-right">{translateField(product, 'materials', language)}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="font-semibold text-charcoal-800 text-[9px] uppercase tracking-wider">Dimensions:</span>
                <span className="text-right font-mono">{product.dimensions}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="font-semibold text-charcoal-800 text-[9px] uppercase tracking-wider">Net Weight:</span>
                <span className="text-right font-mono">{product.weight}</span>
              </div>
              <div className="pt-3 border-t border-gold-500/10 text-[11px] text-terracotta leading-relaxed italic">
                <strong>KritiCam Material Scan:</strong> {translateField(product, 'materialsAnalysis', language)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storytelling & Voice player Section (National Geographic style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gold-500/10 items-center">
        
        {/* Story copy & Narration */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">Artisan Story & Heritage</span>
            
            {/* Speak written story narrative */}
            <button
              onClick={toggleStoryNarration}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 ${
                isNarratingStory 
                  ? 'bg-terracotta text-white border-terracotta animate-pulse' 
                  : 'bg-white border-gold-500/25 text-charcoal hover:border-charcoal'
              }`}
            >
              {isNarratingStory ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold-500" />}
              <span>{isNarratingStory ? 'Pause Read' : 'Read Narrative'}</span>
            </button>
          </div>
          
          <h3 className="title-serif text-3xl font-medium text-charcoal leading-snug">
            {language === 'HI' 
              ? `"हमारे पूर्वजों की प्रार्थनाओं का भार प्रत्येक धागे, तांबे की सिलवट और कोबाल्ट स्ट्रोक में समाया हुआ है।"`
              : `"Every thread, copper fold, and cobalt stroke holds the weight of our ancestors' prayers."`}
          </h3>
          
          <p className="text-xs text-charcoal-700/80 leading-relaxed font-sans font-light whitespace-pre-line">
            {translateField(product, 'story', language)}
          </p>

          {/* Original Voice clip translation box */}
          <div className="p-5 bg-[#ECE7DE] rounded-3xl border border-gold-500/15 flex flex-col md:flex-row gap-5 items-center">
            <button 
              onClick={toggleDialectAudio}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-premium flex-shrink-0 ${
                isPlayingAudio ? 'bg-terracotta text-white' : 'bg-charcoal text-ivory hover:bg-charcoal/90'
              }`}
            >
              {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-ivory ml-0.5" />}
            </button>
            <div className="flex-1 text-center md:text-left space-y-1.5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[9px] uppercase tracking-widest text-charcoal font-bold">Listen to the Artisan's Original Voice Note</p>
                <span className="text-[8px] px-2 py-0.5 rounded bg-charcoal/10 text-charcoal/70 font-semibold uppercase">Dialect Audio</span>
              </div>
              <p className="text-xs text-charcoal/80 font-light italic leading-relaxed">
                "{translateField(artisan, 'voiceTranscript', language)}"
              </p>
            </div>
          </div>
        </div>

        {/* Timelines */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gold-500/10 shadow-premium space-y-6">
          <h4 className="text-[10px] uppercase tracking-widest text-gold-600 font-bold mb-2">Historical Timeline</h4>
          
          <div className="space-y-6 relative pl-6">
            <div className="absolute left-[7px] top-1.5 bottom-1.5 w-0.5 bg-gold-500/20" />
            
            {timelineMilestones.map((item, index) => (
              <div key={index} className="relative text-left">
                <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-terracotta border-2 border-white" />
                <h5 className="text-[10px] uppercase tracking-widest text-terracotta font-bold mb-0.5">
                  {item.year} - {getTimelineText(item.titleKey)}
                </h5>
                <p className="text-xs text-charcoal/60 leading-relaxed font-sans font-light">
                  {getTimelineText(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wage transparency splits */}
      <div className="bg-charcoal rounded-3xl p-6 md:p-8 border border-white/5 text-ivory space-y-8">
        <div className="text-left">
          <span className="text-[9px] uppercase tracking-widest text-gold-400 font-semibold px-2 py-1 rounded bg-white/5 border border-white/10 inline-block mb-3">
            Fair Price Protocol
          </span>
          <h3 className="title-serif text-3xl font-medium text-white">
            Ethical Revenue Split
          </h3>
          <p className="text-xs text-ivory/50 font-sans font-light leading-relaxed max-w-xl">
            We ensure maximum payouts are routed directly to the weavers and potters. Transparency builds trust. The breakdown of your purchase price is modeled below:
          </p>
        </div>

        {/* Stacked split graph */}
        <div className="space-y-6">
          <div className="w-full h-8 bg-white/10 rounded-full flex overflow-hidden border border-white/5 shadow-inner">
            <div className="h-full bg-terracotta" style={{ width: '62%' }} title="Artisan Wages" />
            <div className="h-full bg-gold-500" style={{ width: '18%' }} title="Raw Materials" />
            <div className="h-full bg-emerald-600" style={{ width: '10%' }} title="Village Fund" />
            <div className="h-full bg-indigo-600" style={{ width: '6%' }} title="Logistics" />
            <div className="h-full bg-white/30" style={{ width: '4%' }} title="Platform Fee" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
              <span className="w-3 h-3 bg-terracotta rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Artisan Wage (62%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.artisanWage.toLocaleString()}</p>
            </div>
            
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
              <span className="w-3 h-3 bg-gold-500 rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Materials (18%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.rawMaterials.toLocaleString()}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
              <span className="w-3 h-3 bg-emerald-600 rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Village Fund (10%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.villageDevelopmentFund.toLocaleString()}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
              <span className="w-3 h-3 bg-indigo-600 rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Logistics & Ins. (6%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.shippingInsurance.toLocaleString()}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left col-span-2 md:col-span-1">
              <span className="w-3 h-3 bg-white/30 rounded-full inline-block mr-1.5" />
              <span className="text-[10px] uppercase tracking-wider text-ivory/50">Platform Fee (4%)</span>
              <p className="text-lg font-bold font-mono text-white mt-1">₹{product.fairPriceBreakdown.platformFee.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain verify certificate widget */}
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

        {/* Verification Check buttons */}
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
          
          <p className="text-[8px] uppercase tracking-wider text-charcoal/40 font-semibold">
            SECURED DIRECT VIA ETHEREUM SMART CONTRACT
          </p>
        </div>
      </div>
    </div>
  );
}
