import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Mic, CheckCheck, Sparkles, Languages, Volume2, ArrowRight, Play, Square, Loader2, Zap } from 'lucide-react';
import { artisans, products } from '../data/mockData';
import { uploadCraftImage, mapBackendProductToUI } from '../services/kriticamApi';

export default function WhatsAppMock({ onUploadComplete }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "नमस्ते! हाथसे डिजिटल असिस्टेंट में आपका स्वागत है। अपनी कलाकृति बेचने के लिए फोटो भेजें या नीचे माइक दबाकर बोलें।",
      textEn: "Namaste! Welcome to HaathSe Assistant. Upload a photo of your craft or hold the mic button to speak.",
      time: "12:30 PM"
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedProduct, setUploadedProduct] = useState(null);
  const [language, setLanguage] = useState('HI'); // 'HI' or 'EN'
  const [isLiveUploading, setIsLiveUploading] = useState(false); // Real API upload state
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Simulated recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

<<<<<<< HEAD
  // Simulate Artisan uploading Blue Pottery (Vase)
=======
  // Simulate dialect speech playback
  const handlePlayVoice = (msg) => {
    if (playingVoiceId === msg.id) {
      window.speechSynthesis.cancel();
      setPlayingVoiceId(null);
      return;
    }
    
    setPlayingVoiceId(msg.id);
    speakText(
      msg.transcriptRaw,
      msg.artisanLang, 
      () => setPlayingVoiceId(msg.id),
      () => setPlayingVoiceId(null)
    );
  };

  // Play standard message or AI message text aloud
  const handlePlayTextMsg = (msg) => {
    if (playingVoiceId === msg.id) {
      window.speechSynthesis.cancel();
      setPlayingVoiceId(null);
      return;
    }

    const textToSpeak = msg.sender === 'system'
      ? (language === 'HI' ? msg.textHI : msg.textEN) 
      : msg.text;

    setPlayingVoiceId(msg.id);
    speakText(
      textToSpeak,
      language,
      () => setPlayingVoiceId(msg.id),
      () => setPlayingVoiceId(null)
    );
  };

  // Simulate Artisan uploading selected craft
>>>>>>> d1704c7 (updated)
  const triggerSimulation = (selectedProdId) => {
    const prod = products.find(p => p.id === selectedProdId) || products[0];
    const artisan = artisans.find(a => a.id === prod.artisanId);
    setUploadedProduct(prod);

    // 1. Artisan uploads image
    addMessage({
      id: Date.now() + 1,
      sender: "artisan",
      mediaUrl: prod.image,
      caption: `भेजा गया फोटो: ${prod.craft}`,
      captionEn: `Sent photo: ${prod.craft}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // 2. Start recording voice note after 1.5s
    setTimeout(() => {
      setIsRecording(true);
      // Let it record for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
<<<<<<< HEAD
=======
        
        // Detect artisan's default regional language
        const artisanLang = 
          prod.id === "prod-1" ? "HI" : 
          prod.id === "prod-2" ? "TA" : 
          prod.id === "prod-3" ? "HI" : 
          prod.id === "prod-5" ? "KN" : "EN";
        const voiceText = translateField(artisan, 'voiceTranscript', artisanLang);

>>>>>>> d1704c7 (updated)
        // Add voice message
        addMessage({
          id: Date.now() + 2,
          sender: "artisan",
          isVoiceNote: true,
          voiceDuration: "0:04",
          transcript: artisan.voiceTranscript,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        // 3. AI responds (Typing indicator starts)
        setTimeout(() => {
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
<<<<<<< HEAD
            // AI Response with detected details
=======
            
            // Build AI translated responses containing regional specifications
            const craftText = translateField(prod, 'craft', language);
            const statusText = translateField(prod, 'authenticityStatus', language);

            const aiResponseDict = {
              EN: `KritiCam AI identified your craft: ${craftText}! ✨\n\n• Artisan: ${artisan.name}\n• Location: ${artisan.village}, ${artisan.state}\n• Estimated Value: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• Integrity: ${prod.kritiCamScore}%\n• Status: ${statusText}\n\nWhisper AI translated the dialect voice note. Listing details generated. Ready to publish?`,
              HI: `KritiCam AI ने कलाकृति पहचान ली है: ${craftText}! ✨\n\n• कारीगर: ${artisan.name}\n• स्थान: ${artisan.village}, ${artisan.state}\n• अनुमानित मूल्य: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• शुद्धता: ${prod.kritiCamScore}%\n• स्थिति: ${statusText}\n\nविस्पर एआई ने आपकी बोली का अनुवाद कर दिया है। उत्पाद सूची तैयार है। क्या आप इसे प्रकाशित करना चाहते हैं?`,
              TA: `கிருடிகேம் AI உங்கள் தயாரிப்பை அடையாளம் கண்டுள்ளது: ${craftText}! ✨\n\n• கைவினைஞர்: ${artisan.name}\n• இடம்: ${artisan.village}, ${artisan.state}\n• மதிப்பு: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• நம்பகத்தன்மை: ${prod.kritiCamScore}%\n• நிலை: ${statusText}\n\nவிஸ்பர் AI உங்கள் வட்டாரப் பேச்சு மொழியை மொழிபெயர்த்துள்ளது. விவரங்கள் தயாராக உள்ளன. வெளியிடலாமா?`,
              BN: `কৃতি ক্যাম AI আপনার শিল্প সনাক্ত করেছে: ${craftText}! ✨\n\n• কারিগর: ${artisan.name}\n• স্থান: ${artisan.village}, ${artisan.state}\n• আনুমানিক মূল্য: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• শুদ্ধতা: ${prod.kritiCamScore}%\n• অবস্থা: ${statusText}\n\nহুইস্পার এআই উপভাষার ভয়েস নোট অনুবাদ করেছে। বিবরণ প্রস্তুত। প্রকাশ করতে চান?`,
              KN: `ಕೃಟಿಕಾಮ್ ಎಐ ನಿಮ್ಮ ಕಲಾಕೃತಿಯನ್ನು ಗುರುತಿಸಿದೆ: ${craftText}! ✨\n\n• ಕುಶಲಕರ್ಮಿ: ${artisan.name}\n• ಸ್ಥಳ: ${artisan.village}, ${artisan.state}\n• ಅಂದಾಜು ಮೌಲ್ಯ: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• ನಿಖರತೆ: ${prod.kritiCamScore}%\n• ಸ್ಥಿತಿ: ${statusText}\n\nವಿಸ್ಪರ್ ಎಐ ಪ್ರಾದೇಶಿಕ ಧ್ವನಿಯನ್ನು ಭಾಷಾಂತರಿಸಿದೆ. ವಿವರಗಳು ಸಿದ್ಧವಾಗಿವೆ. ಪ್ರಕಟಿಸಲು ಸಿದ್ಧವೇ?`,
              MR: `क्रिटिकॅम एआय ने तुमची कलाकृती ओळखली आहे: ${craftText}! ✨\n\n• कारागीर: ${artisan.name}\n• ठिकाण: ${artisan.village}, ${artisan.state}\n• अंदाजे किंमत: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• शुद्धता: ${prod.kritiCamScore}%\n• स्थिती: ${statusText}\n\nविस्पर एआय ने बोली भाषेचे भाषांतर केले आहे. उत्पादन सूची तयार आहे. प्रकाशित करू इच्छिता?`,
              TE: `కృతిక్యామ్ AI మీ కళను గుర్తించింది: ${craftText}! ✨\n\n• కళాకారుడు: ${artisan.name}\n• ప్రాంతం: ${artisan.village}, ${artisan.state}\n• అంచనా విలువ: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• ఖచ్చితత్వం: ${prod.kritiCamScore}%\n• స్థితి: ${statusText}\n\nవిస్పర్ AI మీ స్థానిక సంభాషణను అనువదించింది. వివరాలు సిద్ధంగా ఉన్నాయి. ప్రచురించడానికి సిద్ధమా?`
            };

            const aiResponseText = aiResponseDict[language] || aiResponseDict['EN'];

>>>>>>> d1704c7 (updated)
            addMessage({
              id: Date.now() + 3,
              sender: "ai",
              text: `KritiCam AI ने कलाकृति पहचान ली है: ${prod.craft}! ✨\n\n• कारीगर: ${artisan.name}\n• स्थान: ${artisan.village}, ${artisan.state}\n• अनुमानित मूल्य: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• शुद्धता स्कोर: ${prod.kritiCamScore}%\n\nविवरण और डिजिटल प्रमाण-पत्र तैयार है। क्या आप इसे बाजार में प्रकाशित करना चाहते हैं?`,
              textEn: `KritiCam AI identified your craft: ${prod.craft}! ✨\n\n• Artisan: ${artisan.name}\n• Location: ${artisan.village}, ${artisan.state}\n• Estimated Value: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• Authenticity: ${prod.kritiCamScore}%\n\nListing & digital provenance certificate generated. Ready to list on the global market?`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              showActionBtn: true
            });
          }, 3500);

        }, 1500);

      }, 3500);
    }, 1500);
  };

  const handlePublishClick = () => {
    if (onUploadComplete && uploadedProduct) {
      onUploadComplete(uploadedProduct);
    }
  };

  // ─── REAL BACKEND UPLOAD ─────────────────────────────────────────────────────
  // This is the LIVE demo path: triggers the actual GPT-4o API pipeline.
  // Judges see a real photo turn into a structured luxury catalog listing.
  const handleRealFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setIsLiveUploading(true);

    // Show artisan uploading the photo in chat
    addMessage({
      id: Date.now() + 1,
      sender: "artisan",
      mediaUrl: previewUrl,
      caption: `भेजा गया फोटो: ${file.name}`,
      captionEn: `Sent photo: ${file.name}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Show AI thinking
    const typingTimeout = setTimeout(() => setIsTyping(true), 800);

    try {
      // 🔥 Real API call — hits GPT-4o Vision
      const result = await uploadCraftImage(file);
      const backendProduct = result.product;
      const uiProduct = mapBackendProductToUI(backendProduct);
      setUploadedProduct(uiProduct);
      setIsTyping(false);

      // AI responds with REAL data from GPT-4o
      addMessage({
        id: Date.now() + 2,
        sender: "ai",
        text: `KritiCam AI ने कलाकृति पहचान ली है: ${backendProduct.craft_style}! ✨\n\n• शैली: ${backendProduct.craft_style}\n• क्षेत्र: ${backendProduct.heritage_region}\n• अनुमानित मूल्य: ₹${backendProduct.fair_price_inr?.toLocaleString()} ($${backendProduct.fair_price_usd})\n• शुद्धता स्कोर: ${backendProduct.craftsmanship_score}%\n\nप्रमाण-पत्र तैयार है। क्या आप इसे बाजार में प्रकाशित करना चाहते हैं?`,
        textEn: `KritiCam AI identified your craft: ${backendProduct.craft_style}! ✨\n\n• Style: ${backendProduct.craft_style}\n• Region: ${backendProduct.heritage_region}\n• Estimated Value: ₹${backendProduct.fair_price_inr?.toLocaleString()} ($${backendProduct.fair_price_usd})\n• Authenticity: ${backendProduct.craftsmanship_score}%\n\nProvenance certificate generated. Ready to publish?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showActionBtn: true,
        isRealResult: true,  // Flag to show ⚡ Live AI badge
      });

    } catch (err) {
      setIsTyping(false);
      // Graceful error message in chat
      addMessage({
        id: Date.now() + 3,
        sender: "ai",
        text: `Backend connection error. Running in demo mode.\n\nError: ${err.message}`,
        textEn: `Backend connection error. Running in demo mode.\n\nError: ${err.message}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } finally {
      clearTimeout(typingTimeout);
      setIsLiveUploading(false);
      // Reset file input so same file can be re-uploaded
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-ivory p-4 md:p-8 rounded-3xl border border-gold-500/10 shadow-premium">
      
      {/* Simulation Controls Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-charcoal rounded-2xl border border-white/5 text-ivory">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10 inline-block mb-4">
            Zero-literacy Onboarding
          </span>
          <h3 className="title-serif text-3xl font-medium mb-3 text-white">
            WhatsApp Simulator
          </h3>
          <p className="text-xs text-ivory/50 leading-relaxed font-sans font-light mb-6">
            Rural artisans do not use complex mobile apps. They onboard by simply sending a WhatsApp video and speaking about their work. Simulate the process by triggering an upload sequence below.
          </p>

          {/* LIVE UPLOAD — Real GPT-4o Demo */}
          <div className="mb-6 p-4 rounded-xl border border-terracotta/30 bg-terracotta/5 space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-terracotta font-semibold flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              Live AI Upload (Real Backend)
            </p>
            <p className="text-[10px] text-ivory/40 leading-relaxed">
              Upload any craft photo to trigger the real GPT-4o Vision pipeline.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              id="live-craft-upload"
              onChange={handleRealFileUpload}
              disabled={isLiveUploading || isTyping}
            />
            <label
              htmlFor="live-craft-upload"
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer border ${
                isLiveUploading || isTyping
                  ? 'opacity-40 cursor-not-allowed bg-white/5 border-white/10 text-ivory/50'
                  : 'bg-terracotta text-ivory border-terracotta hover:bg-terracotta/90 shadow-glow-terracotta'
              }`}
            >
              {isLiveUploading ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Running GPT-4o...</>
              ) : (
                <><Zap className="w-3.5 h-3.5" /> Upload Real Craft Photo</>
              )}
            </label>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold">Or Select Demo Craft to Simulate</p>
            
<<<<<<< HEAD
            {products.map((prod) => (
              <button
                key={prod.id}
                onClick={() => triggerSimulation(prod.id)}
                disabled={isRecording || isTyping}
                className="w-full flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group text-left"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-10 h-10 rounded-lg object-cover border border-white/15"
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-white tracking-wide">{prod.craft}</h5>
                    <p className="text-[10px] text-ivory/50">Artisan: {artisans.find(a => a.id === prod.artisanId)?.name}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
=======
            {products.map((prod) => {
              const art = artisans.find(a => a.id === prod.artisanId);
              const isSelected = uploadedProduct?.id === prod.id;
              
              return (
                <button
                  key={prod.id}
                  onClick={() => triggerSimulation(prod.id)}
                  disabled={isRecording || isTyping}
                  className={`w-full flex items-center justify-between p-3 bg-white/5 rounded-xl border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group text-left relative ${
                    isSelected ? 'border-terracotta bg-white/10 shadow-[0_0_12px_rgba(212,91,52,0.35)]' : 'border-white/10 hover:bg-white/10 hover:border-gold-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={prod.image} 
                      alt={translateField(prod, 'name', language)} 
                      className="w-10 h-10 rounded-lg object-cover border border-white/15"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-semibold text-white tracking-wide">
                          {translateField(prod, 'craft', language)}
                        </h5>
                        {prod.id === 'prod-5' && (
                          <span className="bg-terracotta text-white text-[7px] uppercase tracking-widest px-1.5 py-0.2 rounded font-bold border border-white/10 shadow-premium animate-pulse">
                            Demo Target
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-ivory/50">
                        {art?.name} ({art?.village})
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform animate-pulse-subtle" />
                </button>
              );
            })}
>>>>>>> d1704c7 (updated)
          </div>
        </div>

        {/* Informative Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-[10px] text-ivory/40 space-y-2">
          <p className="flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-gold-400" />
            Automatic Whisper translation from regional dialects
          </p>
          <p className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            KritiCam Computer Vision validates weaving integrity
          </p>
        </div>
      </div>

      {/* WhatsApp Interface Panel */}
      <div className="lg:col-span-7 flex flex-col h-[580px] bg-[#EDE8E0] rounded-2xl overflow-hidden border border-gold-500/20 shadow-luxury">
        
        {/* Chat Header */}
        <div className="bg-[#075E54] text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center font-bold text-teal-100 border border-teal-500 relative">
              ह
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-teal-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-wide">HaathSe AI Audit</h4>
              <p className="text-[9px] text-teal-200">Online • Active Assistant</p>
            </div>
          </div>
          
          {/* Lang Selector */}
          <button 
            onClick={() => setLanguage(language === 'HI' ? 'EN' : 'HI')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/10 text-[10px] font-semibold text-teal-100 border border-white/20 hover:bg-white/20 transition-all"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'HI' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-grid" style={{
          backgroundColor: '#efeae2',
          backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}>
          {messages.map((msg) => {
            const isSelf = msg.sender === "artisan";
            const isSystem = msg.sender === "system";
            const isAI = msg.sender === "ai";

            return (
              <div 
                key={msg.id} 
                className={`flex ${isSelf ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                {/* Message Bubble */}
                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-premium relative ${
                    isSelf 
                      ? 'bg-[#d9fdd3] text-charcoal-900 rounded-tr-none' 
                      : isAI 
                        ? 'bg-charcoal text-ivory rounded-tl-none border border-gold-500/10'
                        : 'bg-white text-charcoal-800 rounded-tl-none'
                  }`}
                >
                  {/* Media Content */}
                  {msg.mediaUrl && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-black/5 bg-charcoal-50 max-w-[240px]">
                      <img src={msg.mediaUrl} alt="Uploaded Media" className="w-full object-cover aspect-[4/3]" />
                    </div>
                  )}

                  {/* Voice Note Waves */}
                  {msg.isVoiceNote && (
<<<<<<< HEAD
                    <div className="flex items-center gap-3.5 py-1 min-w-[200px]">
                      <div className="w-8 h-8 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600">
                        <Play className="w-3.5 h-3.5 fill-teal-600" />
=======
                    <div className="space-y-2 min-w-[210px]">
                      <div className="flex items-center gap-3.5 py-1">
                        <button 
                          onClick={() => handlePlayVoice(msg)}
                          className="w-8 h-8 rounded-full bg-teal-500/15 text-teal-600 flex items-center justify-center hover:bg-teal-500/25 transition-colors"
                        >
                          {playingVoiceId === msg.id ? (
                            <Pause className="w-3.5 h-3.5 fill-teal-600" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-teal-600 ml-0.5" />
                          )}
                        </button>
                        
                        {/* Interactive Waveform SVG */}
                        <div className="flex-1 flex items-end gap-0.5 h-6">
                          {[30, 60, 85, 45, 75, 95, 35, 65, 85, 55, 45, 65, 30, 75, 40].map((h, i) => (
                            <span 
                              key={i} 
                              style={{ 
                                height: `${h}%`,
                                animationDelay: `${i * 35}ms`
                              }} 
                              className={`flex-1 bg-teal-500 rounded-full min-w-[2.5px] transition-all duration-300 ${
                                playingVoiceId === msg.id ? 'animate-waveform-bar' : ''
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-charcoal-700/60 font-semibold">{msg.voiceDuration}</span>
>>>>>>> d1704c7 (updated)
                      </div>
                      <div className="flex-1 flex items-end gap-0.5 h-6">
                        {/* Fake audio wave bars */}
                        {[20, 50, 80, 40, 70, 90, 30, 60, 80, 50, 40, 60, 20, 70, 30].map((h, i) => (
                          <span 
                            key={i} 
                            style={{ height: `${h}%` }} 
                            className="flex-1 bg-teal-500 rounded-full min-w-[2px]" 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-charcoal-700/60 font-medium">{msg.voiceDuration}</span>
                    </div>
                  )}

<<<<<<< HEAD
                  {/* Text Content */}
                  {!msg.isVoiceNote && (
                    <p className="whitespace-pre-line leading-relaxed font-sans">
                      {language === 'HI' ? msg.text : (msg.textEn || msg.text)}
                    </p>
=======
                  {/* Standard Text Message */}
                  {!msg.isVoiceNote && !msg.mediaUrl && (
                    <div className="space-y-2">
                      <p className="whitespace-pre-line leading-relaxed font-sans font-light">
                        {isSystem 
                          ? (language === 'HI' ? msg.textHI : msg.textEN)
                          : msg.text}
                      </p>
                      
                      {/* Audio voice guide reading for zero-literacy */}
                      {(isAI || isSystem) && (
                        <button 
                          onClick={() => handlePlayTextMsg(msg)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold transition-all border ${
                            playingVoiceId === msg.id 
                              ? 'bg-terracotta border-terracotta text-white shadow-glow-terracotta animate-pulse' 
                              : 'bg-white/10 border-white/10 text-ivory/80 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          {playingVoiceId === msg.id ? (
                            <Pause className="w-2.5 h-2.5 fill-white" />
                          ) : (
                            <Volume2 className="w-2.5 h-2.5" />
                          )}
                          <span>{playingVoiceId === msg.id ? 'Stop Guide' : 'Voice Guide'}</span>
                        </button>
                      )}
                    </div>
>>>>>>> d1704c7 (updated)
                  )}

                  {/* Transcript box for voice notes */}
                  {msg.isVoiceNote && msg.transcript && (
                    <div className="mt-2.5 pt-2 border-t border-charcoal-700/5 text-[10px] text-charcoal-700/70 italic bg-black/5 p-2 rounded">
                      <p className="font-semibold text-[8px] uppercase tracking-wider text-charcoal-900 not-italic mb-0.5">Dialect Transcript:</p>
                      "{msg.transcript}"
                    </div>
                  )}

                  {/* Message Info / Checkmark */}
                  <div className="flex justify-end items-center gap-1.5 mt-1 text-[9px] opacity-60">
                    <span>{msg.time}</span>
                    {isSelf && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                  </div>

                  {/* Action Review Button for AI Response */}
                  {isAI && msg.showActionBtn && (
                    <div className="mt-4 space-y-2">
                      {msg.isRealResult && (
                        <div className="flex items-center gap-1.5 text-[9px] text-terracotta font-semibold uppercase tracking-wider">
                          <Zap className="w-3 h-3" /> Live GPT-4o Result
                        </div>
                      )}
                      <button
                        onClick={handlePublishClick}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-terracotta text-ivory text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-terracotta-600 transition-all duration-300 shadow-glow-terracotta animate-pulse"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                        Review AI Audit Listing
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* AI Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-charcoal text-ivory rounded-2xl rounded-tl-none p-3.5 text-xs shadow-premium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[10px] text-ivory/50 ml-1 tracking-wider uppercase font-semibold">KritiCam AI is analyzing...</span>
              </div>
            </div>
          )}

          {/* Recording Overlay Inside Chat */}
          {isRecording && (
            <div className="flex justify-end animate-slide-up">
              <div className="bg-[#d9fdd3] text-charcoal-900 rounded-2xl rounded-tr-none p-3.5 text-xs shadow-premium min-w-[200px] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[10px] uppercase tracking-wider text-red-600 font-bold">Recording Voice...</span>
                </div>
                <span className="font-mono text-xs">0:0{recordingSeconds}</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Area (Mock Icons) */}
        <div className="bg-[#F0F2F5] p-3.5 flex items-center gap-3.5 border-t border-gold-500/10">
          {/* Zero-literacy Big Photo Button — now also triggers file picker */}
          <button 
            disabled={isRecording || isTyping || isLiveUploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-gold-100 hover:text-terracotta transition-colors border border-gold-500/15 shadow-premium disabled:opacity-40"
            title="Upload Real Craft Image (Live AI)"
          >
            {isLiveUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-terracotta" />
            ) : (
              <Image className="w-4 h-4 text-charcoal-700" />
            )}
          </button>

          {/* Text input (disabled in simulator, prompt driven) */}
          <div className="flex-1 bg-white rounded-full px-4 py-2 border border-gold-500/10 text-xs text-charcoal/40 font-light select-none">
            {language === 'HI' ? 'ऑटोमेटिक वॉयस मोड सक्रिय...' : 'Automatic voice mode active...'}
          </div>

          {/* Zero-literacy Big Audio Mic Button */}
          <button 
            disabled={isTyping}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white border transition-all duration-300 shadow-luxury ${
              isRecording 
                ? 'bg-red-500 border-red-400 scale-110 animate-pulse' 
                : 'bg-[#075E54] border-teal-600 hover:bg-teal-700 hover:scale-105'
            }`}
            title="Record Voice"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
