import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ShieldAlert, Cpu, Eye, Scale, Languages, FileCheck, Share2, ArrowRight } from 'lucide-react';
import { aiPipelineSteps } from '../data/mockData';

export default function AIPipeline({ activeProduct, onPipelineComplete }) {
  const [steps, setSteps] = useState(aiPipelineSteps.map(s => ({ ...s, status: 'pending' })));
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isAuditing, setIsAuditing] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    // Select first step by default
    setSelectedStep(steps[0]);
  }, []);

  const runAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setCurrentStepIndex(0);
    
    // Reset all steps to pending
    setSteps(aiPipelineSteps.map(s => ({ ...s, status: 'pending' })));
  };

  useEffect(() => {
    if (currentStepIndex === -1 || currentStepIndex >= steps.length) {
      if (currentStepIndex >= steps.length) {
        setIsAuditing(false);
      }
      return;
    }

    // Set current step to processing
    setSteps(prev => prev.map((s, idx) => {
      if (idx === currentStepIndex) return { ...s, status: 'processing' };
      if (idx < currentStepIndex) return { ...s, status: 'completed' };
      return s;
    }));
    setSelectedStep(steps[currentStepIndex]);

    const timer = setTimeout(() => {
      setCurrentStepIndex(prev => prev + 1);
    }, 1800); // 1.8 seconds per step simulation

    return () => clearTimeout(timer);
  }, [currentStepIndex]);

  // Complete callback
  useEffect(() => {
    if (currentStepIndex === steps.length) {
      // Mark final step completed
      setSteps(prev => prev.map(s => ({ ...s, status: 'completed' })));
      if (onPipelineComplete) {
        onPipelineComplete();
      }
    }
  }, [currentStepIndex]);

  const stepIcons = {
    "step-1": <Eye className="w-5 h-5" />,
    "step-2": <Cpu className="w-5 h-5" />,
    "step-3": <Scale className="w-5 h-5" />,
    "step-4": <Languages className="w-5 h-5" />,
    "step-5": <FileCheck className="w-5 h-5" />,
    "step-6": <Share2 className="w-5 h-5" />
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gold-500/10 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-terracotta font-semibold px-2.5 py-1 rounded bg-terracotta/10 border border-terracotta/20 inline-block mb-2">
            KritiCam AI Pipeline
          </span>
          <h2 className="title-serif text-3xl md:text-4xl text-charcoal font-medium">
            AI Provenance Audit & Marketplace Engine
          </h2>
        </div>

        <button
          onClick={runAudit}
          disabled={isAuditing}
          className="px-6 py-3 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-charcoal/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-premium flex items-center gap-2 transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
          {isAuditing ? 'Auditing Product...' : 'Start Audit Engine'}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Uploaded Craft Metadata Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gold-500/10 shadow-premium space-y-6">
          <div className="rounded-xl overflow-hidden aspect-[4/3] relative">
            <img 
              src={activeProduct.image} 
              alt={activeProduct.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">{activeProduct.craft}</p>
                <h4 className="text-white text-sm font-semibold tracking-wide">{activeProduct.name}</h4>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-charcoal-700/80">
            <div className="flex justify-between py-2 border-b border-gold-500/5">
              <span className="font-medium text-charcoal-700/60 uppercase tracking-wider text-[10px]">Estimated Price</span>
              <span className="font-bold text-charcoal font-mono">₹{activeProduct.priceINR.toLocaleString()} / ${activeProduct.priceUSD}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gold-500/5">
              <span className="font-medium text-charcoal-700/60 uppercase tracking-wider text-[10px]">Materials Used</span>
              <span className="text-right max-w-[180px] truncate">{activeProduct.materials}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gold-500/5">
              <span className="font-medium text-charcoal-700/60 uppercase tracking-wider text-[10px]">Authenticity Score</span>
              <span className="font-bold text-terracotta">{activeProduct.kritiCamScore}%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-charcoal-700/60 uppercase tracking-wider text-[10px]">Certificate Status</span>
              <span className="font-semibold text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
              </span>
            </div>
          </div>

          {/* Audit Status Tracker */}
          <div className="p-4 bg-charcoal rounded-xl text-ivory border border-white/5 space-y-3">
            <p className="text-[9px] uppercase tracking-widest text-gold-500 font-semibold">Engine Audit Status</p>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-sans">
                {currentStepIndex === -1 
                  ? 'Ready for validation' 
                  : currentStepIndex >= steps.length 
                    ? 'Audit completed successfully' 
                    : `Running step ${currentStepIndex + 1} of 6...`}
              </span>
              <span className="text-xs font-mono font-bold text-gold-400">
                {currentStepIndex === -1 
                  ? '0%' 
                  : currentStepIndex >= steps.length 
                    ? '100%' 
                    : `${Math.round(((currentStepIndex) / steps.length) * 100)}%`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold-500 to-terracotta transition-all duration-500" 
                style={{ 
                  width: currentStepIndex === -1 
                    ? '0%' 
                    : currentStepIndex >= steps.length 
                      ? '100%' 
                      : `${((currentStepIndex) / steps.length) * 100}%` 
                }} 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Animated Node Diagram */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-charcoal-900 rounded-3xl p-6 md:p-8 border border-white/5 shadow-luxury relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03] bg-grid" />

            <h3 className="text-sm font-semibold tracking-widest text-gold-500 uppercase mb-8 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-terracotta" />
              Dynamic Execution Nodes
            </h3>

            {/* Steps Nodes Stack */}
            <div className="relative pl-10 md:pl-16 space-y-12">
              
              {/* Connecting vertical timeline line */}
              <div className="absolute left-[20px] md:left-[32px] top-6 bottom-6 w-0.5 bg-white/10" />

              {/* Animated Progress Overlay Line */}
              <div 
                className="absolute left-[20px] md:left-[32px] top-6 w-0.5 bg-gradient-to-b from-gold-400 to-terracotta transition-all duration-1000" 
                style={{ 
                  height: currentStepIndex === -1 
                    ? '0%' 
                    : currentStepIndex >= steps.length 
                      ? 'calc(100% - 48px)' 
                      : `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 12px)`
                }} 
              />

              {steps.map((step, index) => {
                const isCompleted = step.status === 'completed';
                const isProcessing = step.status === 'processing';
                const isPending = step.status === 'pending';
                const isSelected = selectedStep?.id === step.id;

                return (
                  <div 
                    key={step.id} 
                    onClick={() => setSelectedStep(step)}
                    className={`relative cursor-pointer transition-all duration-300 group flex items-start gap-4 md:gap-8 ${
                      isSelected ? 'scale-[1.01]' : 'opacity-60 hover:opacity-90'
                    }`}
                  >
                    
                    {/* Node Dot / Icon */}
                    <div className={`absolute -left-[30px] md:-left-[42px] w-5 h-5 md:w-[22px] md:h-[22px] rounded-full flex items-center justify-center border transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-green-500 border-white scale-110 shadow-lg' 
                        : isProcessing 
                          ? 'bg-terracotta border-white scale-125 shadow-glow-terracotta animate-pulse' 
                          : 'bg-charcoal-900 border-gold-500/30 group-hover:border-gold-500'
                    }`}>
                      {isCompleted && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                      {isProcessing && (
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                      )}
                    </div>

                    {/* Step Icon Box */}
                    <div className={`p-3 rounded-xl border transition-all duration-500 hidden md:block ${
                      isCompleted 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : isProcessing 
                          ? 'bg-terracotta/15 border-terracotta-500/30 text-terracotta animate-pulse' 
                          : 'bg-charcoal border-white/5 text-gold-500/50 group-hover:border-gold-500/20'
                    }`}>
                      {stepIcons[step.id]}
                    </div>

                    {/* Node Text Content */}
                    <div className="flex-1 text-left bg-charcoal/40 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-center gap-2 mb-1.5">
                        <h4 className={`text-xs uppercase tracking-wider font-semibold ${
                          isCompleted ? 'text-white/90' : isProcessing ? 'text-terracotta' : 'text-white/40'
                        }`}>
                          {step.name}
                        </h4>
                        
                        {/* Status Label */}
                        <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${
                          isCompleted 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : isProcessing 
                              ? 'bg-terracotta/20 text-terracotta border border-terracotta/30 animate-pulse' 
                              : 'bg-white/5 text-white/30 border border-white/5'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-white/50 leading-relaxed font-sans font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Detail Log Panel */}
          {selectedStep && (
            <div className="bg-white p-5 rounded-2xl border border-gold-500/10 shadow-premium text-left animate-slide-up">
              <h4 className="text-[10px] uppercase tracking-widest text-gold-600 font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                Raw Execution Log: {selectedStep.name}
              </h4>
              <div className="bg-charcoal p-4 rounded-xl border border-gold-500/15 font-mono text-[11px] text-green-400 space-y-2 max-h-36 overflow-y-auto shadow-inner">
                <p className="opacity-40">[{new Date().toLocaleTimeString()}] INITIATING ENGINE HANDSHAKE...</p>
                <p className="opacity-60">[{new Date().toLocaleTimeString()}] LOADING KRITICAM PRESETS...</p>
                <p className="text-white">[{new Date().toLocaleTimeString()}] PROCESS: {selectedStep.details}</p>
                {selectedStep.status === 'completed' ? (
                  <p className="text-green-500">[{new Date().toLocaleTimeString()}] STATUS: SUCCEEDED. IMMUTABLE SIGNATURE HASHED.</p>
                ) : selectedStep.status === 'processing' ? (
                  <p className="text-terracotta animate-pulse">[{new Date().toLocaleTimeString()}] STATUS: RUNNING PIPELINE VERIFICATION...</p>
                ) : (
                  <p className="opacity-40">[{new Date().toLocaleTimeString()}] STATUS: STAGED. WAITING FOR TRIGGER.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Completion Dialog Panel */}
      {currentStepIndex >= steps.length && (
        <div className="bg-[#FAF8F5] p-6 md:p-8 rounded-3xl border border-green-500/30 text-center space-y-4 shadow-luxury terracotta-glow animate-fade-in">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto border border-green-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="title-serif text-2xl font-medium text-charcoal">
              Craft Authenticity Verified
            </h3>
            <p className="text-xs text-charcoal-700/60 font-sans max-w-md mx-auto mt-1 leading-relaxed">
              KritiCam AI has validated material composition, generated a premium story card, and published the listing directly to our luxury wholesale B2B marketplace.
            </p>
          </div>
          <button
            onClick={() => onPipelineComplete('view-marketplace')}
            className="glow-border relative px-6 py-3 bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-charcoal/90 transition-all duration-300 mx-auto flex items-center gap-2 shadow-premium"
          >
            Enter B2B Marketplace
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
