import React, { useState, useEffect, useRef } from 'react';
import { Image, Mic, CheckCheck, Sparkles, Volume2, VolumeX, ArrowRight, Play, Pause, AlertCircle } from 'lucide-react';
import { artisans, products } from '../data/mockData';
import { t, translateField, speakText } from '../utils/translator';

export default function WhatsAppMock({ onUploadComplete, language }) {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedProduct, setUploadedProduct] = useState(null);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);
  const chatEndRef = useRef(null);

  // Initialize first chat prompt based on active language
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "system",
        textKey: "whatsapp_welcome",
        textHI: "नमस्ते! हाथसे डिजिटल असिस्टेंट में आपका स्वागत है। अपनी कलाकृति बेचने के लिए फोटो भेजें या नीचे माइक दबाकर बोलें।",
        textEN: "Namaste! Welcome to HaathSe Assistant. Upload a photo of your craft or hold the mic button to speak.",
        time: "12:30 PM"
      }
    ]);
  }, [language]);

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

  // Simulate Artisan uploading selected craft
  const triggerSimulation = (selectedProdId) => {
    const prod = products.find(p => p.id === selectedProdId) || products[0];
    const artisan = artisans.find(a => a.id === prod.artisanId);
    setUploadedProduct(prod);

    // Cancel any active speech
    window.speechSynthesis.cancel();
    setPlayingVoiceId(null);

    // 1. Artisan uploads image
    addMessage({
      id: Date.now() + 1,
      sender: "artisan",
      mediaUrl: prod.image,
      caption: `भेजा गया फोटो: ${translateField(prod, 'craft', 'HI')}`,
      captionEn: `Sent photo: ${translateField(prod, 'craft', 'EN')}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // 2. Start recording voice note after 1s
    setTimeout(() => {
      setIsRecording(true);
      
      // Let it record for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        
        // Detect artisan's default regional language
        const artisanLang = prod.id === "prod-1" ? "HI" : prod.id === "prod-2" ? "TA" : prod.id === "prod-3" ? "HI" : "EN";
        const voiceText = translateField(artisan, 'voiceTranscript', artisanLang);

        // Add voice message
        addMessage({
          id: Date.now() + 2,
          sender: "artisan",
          isVoiceNote: true,
          voiceDuration: "0:05",
          transcriptRaw: voiceText,
          transcriptEn: translateField(artisan, 'voiceTranscript', 'EN'),
          artisanLang: artisanLang,
          artisanName: artisan.name,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        // 3. AI responds (Typing indicator starts)
        setTimeout(() => {
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            
            // Build AI translated responses containing regional specifications
            const prodNameText = translateField(prod, 'name', language);
            const craftText = translateField(prod, 'craft', language);
            const statusText = translateField(prod, 'authenticityStatus', language);

            const aiResponseText = language === 'EN' 
              ? `KritiCam AI identified your craft: ${craftText}! ✨\n\n• Artisan: ${artisan.name}\n• Location: ${artisan.village}, ${artisan.state}\n• Estimated Value: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• Integrity: ${prod.kritiCamScore}%\n• Status: ${statusText}\n\nWhisper AI translated the dialect voice note. Listing details generated. Ready to publish?`
              : `KritiCam AI ने कलाकृति पहचान ली है: ${craftText}! ✨\n\n• कारीगर: ${artisan.name}\n• स्थान: ${artisan.village}, ${artisan.state}\n• अनुमानित मूल्य: ₹${prod.priceINR.toLocaleString()} ($${prod.priceUSD})\n• शुद्धता: ${prod.kritiCamScore}%\n• स्थिति: ${statusText}\n\nविस्पर एआई ने आपकी बोली का अनुवाद कर दिया है। उत्पाद सूची तैयार है। क्या आप इसे प्रकाशित करना चाहते हैं?`;

            addMessage({
              id: Date.now() + 3,
              sender: "ai",
              text: aiResponseText,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              showActionBtn: true
            });
          }, 3200);

        }, 1500);

      }, 3000);
    }, 1500);
  };

  const handlePublishClick = () => {
    // Stop synthesis if speaking
    window.speechSynthesis.cancel();
    setPlayingVoiceId(null);
    if (onUploadComplete && uploadedProduct) {
      onUploadComplete(uploadedProduct);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-ivory p-4 md:p-8 rounded-3xl border border-gold-500/10 shadow-premium">
      
      {/* Left: Configuration & Simulator Instructions */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-charcoal rounded-2xl border border-white/5 text-ivory text-left relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-grid" />
        
        <div className="space-y-6 relative z-10">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10 inline-block mb-3 animate-pulse-subtle">
              Artisan Hub Access
            </span>
            <h3 className="title-serif text-3xl font-medium text-white mb-2 leading-tight">
              {t("nav_artisan_hub", language)}
            </h3>
            <p className="text-xs text-ivory/50 leading-relaxed font-sans font-light">
              Rural Indian artisans onboard by sending WhatsApp photos/videos and describing them verbally in their native languages. Test the visual verification pipeline and automatic translations by selecting a craft profile below.
            </p>
          </div>

          {/* Preset trigger panels */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold mb-1">Simulate Artisan Upload</p>
            
            {products.map((prod) => {
              const art = artisans.find(a => a.id === prod.artisanId);
              const isSelected = uploadedProduct?.id === prod.id;
              
              return (
                <button
                  key={prod.id}
                  onClick={() => triggerSimulation(prod.id)}
                  disabled={isRecording || isTyping}
                  className={`w-full flex items-center justify-between p-3 bg-white/5 rounded-xl border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group text-left ${
                    isSelected ? 'border-terracotta bg-white/10' : 'border-white/10 hover:bg-white/10 hover:border-gold-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={prod.image} 
                      alt={translateField(prod, 'name', language)} 
                      className="w-10 h-10 rounded-lg object-cover border border-white/15"
                    />
                    <div>
                      <h5 className="text-xs font-semibold text-white tracking-wide">
                        {translateField(prod, 'craft', language)}
                      </h5>
                      <p className="text-[10px] text-ivory/50">
                        {art?.name} ({art?.village})
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Information badges */}
        <div className="mt-8 pt-6 border-t border-white/10 text-[10px] text-ivory/40 space-y-2.5 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Dialect audio translation detects 6 regional accents</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-gold-500" />
            <span>KritiCam scans fabric density & metallic lost-wax ratios</span>
          </div>
        </div>
      </div>

      {/* Right: Phone Simulator Screen */}
      <div className="lg:col-span-7 flex flex-col h-[580px] bg-[#EDE8E0] rounded-2xl overflow-hidden border border-gold-500/20 shadow-luxury">
        
        {/* Chat Phone Header */}
        <div className="bg-[#075E54] text-white p-4 flex justify-between items-center shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center font-bold text-teal-100 border border-teal-500/20 relative shadow-inner">
              ह
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-teal-700" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold tracking-wide">HaathSe AI Assistant</h4>
              <p className="text-[9px] text-teal-200">Online • Onboarding Protocol</p>
            </div>
          </div>

          <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-teal-100 uppercase tracking-widest font-semibold border border-white/10">
            {language} Mode
          </span>
        </div>

        {/* Chat Body Container */}
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
                className={`flex ${isSelf ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-premium relative text-left ${
                    isSelf 
                      ? 'bg-[#d9fdd3] text-charcoal-900 rounded-tr-none' 
                      : isAI 
                        ? 'bg-charcoal text-ivory rounded-tl-none border border-gold-500/10'
                        : 'bg-white text-charcoal-800 rounded-tl-none'
                  }`}
                >
                  {/* Image/Video attachments */}
                  {msg.mediaUrl && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-black/5 bg-charcoal-50 max-w-[240px]">
                      <img src={msg.mediaUrl} alt="Artisan Upload" className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" />
                      {msg.caption && (
                        <p className="p-2 bg-white text-[10px] text-charcoal/70 border-t border-charcoal-50 leading-tight">
                          {language === 'HI' ? msg.caption : msg.captionEn}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Voice Note controls */}
                  {msg.isVoiceNote && (
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
                                animationPlayState: playingVoiceId === msg.id ? 'running' : 'paused'
                              }} 
                              className={`flex-1 bg-teal-500 rounded-full min-w-[2px] ${
                                playingVoiceId === msg.id ? 'animate-pulse' : ''
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-charcoal-700/60 font-semibold">{msg.voiceDuration}</span>
                      </div>

                      {/* Transcribed Text Panel showing Translation process */}
                      {msg.transcriptRaw && (
                        <div className="p-2.5 bg-black/5 rounded-xl text-[10px] space-y-1.5 border border-charcoal-500/5">
                          <p className="text-[8px] uppercase tracking-widest font-bold text-teal-800">
                            Dialect Whisper Transcribe ({msg.artisanLang})
                          </p>
                          <p className="italic text-charcoal-800/80">"{msg.transcriptRaw}"</p>
                          
                          {msg.artisanLang !== 'EN' && (
                            <div className="pt-1.5 border-t border-charcoal-500/10">
                              <p className="text-[8px] uppercase tracking-widest font-bold text-terracotta">
                                AI Translation (English Catalog Copy)
                              </p>
                              <p className="text-charcoal-700">"{msg.transcriptEn}"</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Standard Text Message */}
                  {!msg.isVoiceNote && !msg.mediaUrl && (
                    <p className="whitespace-pre-line leading-relaxed font-sans font-light">
                      {isSystem 
                        ? (language === 'HI' ? msg.textHI : msg.textEN)
                        : msg.text}
                    </p>
                  )}

                  {/* Message footer info */}
                  <div className="flex justify-end items-center gap-1.5 mt-1.5 text-[9px] opacity-60">
                    <span>{msg.time}</span>
                    {isSelf && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                  </div>

                  {/* Onboarding listing published triggers */}
                  {isAI && msg.showActionBtn && (
                    <button
                      onClick={handlePublishClick}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-terracotta text-ivory text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-terracotta-600 transition-all duration-300 shadow-glow-terracotta animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      Review AI Audit Listing
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-charcoal text-ivory rounded-2xl rounded-tl-none p-3.5 text-xs shadow-premium flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[10px] text-ivory/50 ml-1 tracking-wider uppercase font-semibold">KritiCam AI is analyzing...</span>
              </div>
            </div>
          )}

          {/* Recording Overlay */}
          {isRecording && (
            <div className="flex justify-end animate-slide-up">
              <div className="bg-[#d9fdd3] text-charcoal-900 rounded-2xl rounded-tr-none p-3.5 text-xs shadow-premium min-w-[210px] flex items-center justify-between gap-3 border border-teal-500/10">
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

        {/* Input Dock (Large Icon Buttons) */}
        <div className="bg-[#F0F2F5] p-3.5 flex items-center gap-3.5 border-t border-gold-500/10 relative">
          
          {/* Large camera icon for zero-literacy */}
          <button 
            disabled={isRecording || isTyping}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-gold-100 hover:text-terracotta border border-gold-500/15 shadow-premium disabled:opacity-40 transition-all hover:scale-105"
            title="Snap Craft Photo"
          >
            <Image className="w-4.5 h-4.5 text-charcoal-700" />
          </button>

          {/* Audio Info indicator */}
          <div className="flex-1 bg-white rounded-full px-4.5 py-3 border border-gold-500/10 text-xs text-charcoal/40 font-light select-none text-left">
            {language === 'HI' ? 'व्हाट्सएप वॉयस ऑनबोर्डिंग सक्रिय...' : 'WhatsApp voice mode active...'}
          </div>

          {/* Pulsing Mic for zero-literacy */}
          <button 
            disabled={isTyping}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white border transition-all duration-300 shadow-luxury hover:scale-105 ${
              isRecording 
                ? 'bg-red-500 border-red-400 animate-pulse' 
                : 'bg-[#075E54] border-teal-600 hover:bg-teal-700'
            }`}
            title="Hold to Record Voice Note"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
