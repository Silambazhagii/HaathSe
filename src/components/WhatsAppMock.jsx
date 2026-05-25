import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Mic, CheckCheck, Sparkles, Languages, Volume2, ArrowRight, Play, Square } from 'lucide-react';
import { artisans, products } from '../data/mockData';

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

          {/* Preset Buttons */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold">Select Craft to Simulate</p>
            
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
                    <div className="flex items-center gap-3.5 py-1 min-w-[200px]">
                      <div className="w-8 h-8 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600">
                        <Play className="w-3.5 h-3.5 fill-teal-600" />
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

                  {/* Text Content */}
                  {!msg.isVoiceNote && (
                    <p className="whitespace-pre-line leading-relaxed font-sans">
                      {language === 'HI' ? msg.text : (msg.textEn || msg.text)}
                    </p>
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
                    <button
                      onClick={handlePublishClick}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-terracotta text-ivory text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-terracotta-600 transition-all duration-300 shadow-glow-terracotta animate-pulse"
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
          {/* Zero-literacy Big Photo Button */}
          <button 
            disabled={isRecording || isTyping}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-gold-100 hover:text-terracotta transition-colors border border-gold-500/15 shadow-premium disabled:opacity-40"
            title="Upload Craft Image"
          >
            <Image className="w-4 h-4 text-charcoal-700" />
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
