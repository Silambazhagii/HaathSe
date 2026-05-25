import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Mic, CheckCheck, Sparkles, Languages, Volume2, ArrowRight, Play, Square, Loader2, Zap } from 'lucide-react';
import { artisans, products } from '../data/mockData';
import { uploadCraftImage, mapBackendProductToUI } from '../services/kriticamApi';

export default function WhatsAppMock({ onUploadComplete, language = 'HI', setLanguage }) {
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
  const [isLiveUploading, setIsLiveUploading] = useState(false); // Real API upload state
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const speakInstructions = () => {
    const text = language === 'HI' 
      ? "नमस्ते! अपनी कलाकृति बेचने के लिए, 'अपलोड कलाकृति फोटो' बटन दबाएं और एक सुंदर फोटो चुनें। या फिर नीचे दिए गए डेमो कलाकृतियों में से किसी एक को चुनकर प्रक्रिया का अनुभव करें।"
      : "Hello! To sell your artwork, press the 'Upload Real Craft Photo' button and select a beautiful photo. Or, select one of the demo crafts below to experience the onboarding flow.";
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'HI' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

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

  // Simulate Artisan uploading Blue Pottery (Vase)
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
            // AI Response with detected details
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
      <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-charcoal rounded-2xl border border-white/5 text-ivory text-left">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10">
              ऑडियो निर्देश / Voice Guide
            </span>
            <button 
              onClick={speakInstructions}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-[10px] font-semibold text-gold-400 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              title="Hear Instructions / निर्देश सुनें"
            >
              <Volume2 className="w-3.5 h-3.5 animate-pulse-subtle" />
              <span>सुनें / Listen</span>
            </button>
          </div>
          <h3 className="title-serif text-3xl font-medium mb-3 text-white">
            Artisan Studio
          </h3>
          <p className="text-xs text-ivory/50 leading-relaxed font-sans font-light mb-6">
            अपनी कलाकृति का फोटो अपलोड करें और तुरंत वैश्विक बाजार में प्रवेश करें।
            (Upload a photo of your craft to instantly analyze and register it on the global luxury marketplace).
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
      <div className="lg:col-span-7 flex flex-col h-[580px] bg-[#000000] rounded-2xl overflow-hidden border border-white/10 shadow-luxury animate-fade-in">
        
        {/* Chat Header */}
        <div className="bg-[#09090B] text-white p-4 flex justify-between items-center shadow-md border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white border border-white/10 relative">
              ह
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold tracking-wide">HaathSe AI Audit</h4>
              <p className="text-[9px] text-zinc-400">Online • Active Assistant</p>
            </div>
          </div>
          
          {/* Lang Selector */}
          <button 
            onClick={() => setLanguage(language === 'HI' ? 'EN' : 'HI')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-800 text-[10px] font-semibold text-zinc-200 border border-zinc-700 hover:bg-zinc-700 transition-all cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'HI' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-grid" style={{
          backgroundColor: '#000000'
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
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-premium relative text-left ${
                    isSelf 
                      ? 'bg-zinc-800 text-white rounded-tr-none border border-zinc-700' 
                      : isAI 
                        ? 'bg-zinc-900 text-white rounded-tl-none border border-zinc-800'
                        : 'bg-zinc-900 text-white rounded-tl-none border border-zinc-800'
                  }`}
                >
                  {/* Media Content */}
                  {msg.mediaUrl && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-white/5 bg-zinc-950 max-w-[240px]">
                      <img src={msg.mediaUrl} alt="Uploaded Media" className="w-full object-cover aspect-[4/3]" />
                    </div>
                  )}

                  {/* Voice Note Waves */}
                  {msg.isVoiceNote && (
                    <div className="flex items-center gap-3.5 py-1 min-w-[200px]">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white border border-zinc-700">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <div className="flex-1 flex items-end gap-0.5 h-6">
                        {/* Fake audio wave bars */}
                        {[20, 50, 80, 40, 70, 90, 30, 60, 80, 50, 40, 60, 20, 70, 30].map((h, i) => (
                          <span 
                            key={i} 
                            style={{ height: `${h}%` }} 
                            className="flex-1 bg-white rounded-full min-w-[2px]" 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium">{msg.voiceDuration}</span>
                    </div>
                  )}

                  {/* Text Content */}
                  {!msg.isVoiceNote && (
                    <p className="whitespace-pre-line leading-relaxed font-sans font-light">
                      {language === 'HI' ? msg.text : (msg.textEn || msg.text)}
                    </p>
                  )}

                  {/* Transcript box for voice notes */}
                  {msg.isVoiceNote && msg.transcript && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-800 text-[10px] text-zinc-400 italic bg-zinc-950 p-2 rounded">
                      <p className="font-semibold text-[8px] uppercase tracking-wider text-white not-italic mb-0.5">Dialect Transcript:</p>
                      "{msg.transcript}"
                    </div>
                  )}

                  {/* Message Info / Checkmark */}
                  <div className="flex justify-end items-center gap-1.5 mt-1 text-[9px] opacity-60">
                    <span>{msg.time}</span>
                    {isSelf && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                  </div>

                  {/* Action Review Button for AI Response */}
                  {isAI && msg.showActionBtn && (
                    <div className="mt-4 space-y-2">
                      {msg.isRealResult && (
                        <div className="flex items-center gap-1.5 text-[9px] text-yellow-500 font-semibold uppercase tracking-wider">
                          <Zap className="w-3 h-3" /> Live GPT-4o Result
                        </div>
                      )}
                      <button
                        onClick={handlePublishClick}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-all duration-300 shadow shadow-white/10"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
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
              <div className="bg-zinc-900 text-white rounded-2xl rounded-tl-none p-3.5 text-xs shadow-premium flex items-center gap-1.5 border border-zinc-800">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[10px] text-zinc-400 ml-1 tracking-wider uppercase font-semibold">KritiCam AI is analyzing...</span>
              </div>
            </div>
          )}

          {/* Recording Overlay Inside Chat */}
          {isRecording && (
            <div className="flex justify-end animate-slide-up">
              <div className="bg-red-950 text-red-200 border border-red-900 rounded-2xl rounded-tr-none p-3.5 text-xs shadow-premium min-w-[200px] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold">Recording Voice...</span>
                </div>
                <span className="font-mono text-xs">0:0{recordingSeconds}</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Area (Mock Icons) */}
        <div className="bg-[#09090B] p-3.5 flex items-center gap-3.5 border-t border-white/5">
          {/* Zero-literacy Big Photo Button — now also triggers file picker */}
          <button 
            disabled={isRecording || isTyping || isLiveUploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white border border-zinc-700 hover:bg-zinc-700 transition-colors shadow-premium disabled:opacity-40 cursor-pointer"
            title="Upload Real Craft Image (Live AI)"
          >
            {isLiveUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Image className="w-4 h-4" />
            )}
          </button>

          {/* Text input (disabled in simulator, prompt driven) */}
          <div className="flex-1 bg-zinc-950 rounded-full px-4 py-2 border border-zinc-800 text-xs text-zinc-500 font-light select-none text-left">
            {language === 'HI' ? 'ऑटोमेटिक वॉयस मोड सक्रिय...' : 'Automatic voice mode active...'}
          </div>

          {/* Zero-literacy Big Audio Mic Button */}
          <button 
            disabled={isTyping}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white border transition-all duration-300 shadow-luxury cursor-pointer ${
              isRecording 
                ? 'bg-red-600 border-red-500 scale-110 animate-pulse' 
                : 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:scale-105'
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
