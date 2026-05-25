import React from 'react';
import { Heart, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Footer({ setActiveScreen }) {
  return (
    <footer className="bg-charcoal text-ivory/80 pt-20 pb-12 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-charcoal text-xs font-semibold">
              ह
            </div>
            <span className="title-serif text-2xl text-ivory tracking-wide font-medium">HaathSe</span>
          </div>
          <p className="text-xs text-ivory/50 leading-relaxed font-sans font-light">
            Connecting centuries-old Indian craftsmanship with the luxury global buyer market. Powered by zero-touch voice AI and cryptographic provenance certificate auditing.
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] tracking-widest text-gold-500 uppercase font-semibold border border-gold-500/20 px-2.5 py-1 rounded">
              KritiCam™ Audited
            </span>
            <span className="text-[10px] tracking-widest text-terracotta-500 uppercase font-semibold border border-terracotta/20 px-2.5 py-1 rounded">
              Fair Trade
            </span>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-ivory font-semibold mb-6">Exhibitions</h4>
          <ul className="space-y-3.5 text-xs text-ivory/60 font-sans font-light">
            <li>
              <button onClick={() => setActiveScreen('marketplace')} className="hover:text-gold-500 transition-colors">
                B2B Global Catalog
              </button>
            </li>
            <li>
              <button onClick={() => setActiveScreen('landing')} className="hover:text-gold-500 transition-colors">
                Artisan Story Archives
              </button>
            </li>
            <li>
              <button onClick={() => setActiveScreen('whatsapp')} className="hover:text-gold-500 transition-colors">
                Artisan Simulation Hub
              </button>
            </li>
            <li>
              <button onClick={() => setActiveScreen('dashboard')} className="hover:text-gold-500 transition-colors">
                Impact & Village Growth
              </button>
            </li>
          </ul>
        </div>

        {/* Craft Clusters */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-ivory font-semibold mb-6">Active Clusters</h4>
          <ul className="space-y-3.5 text-xs text-ivory/60 font-sans font-light">
            <li className="flex justify-between items-center">
              <span>Kot Jewar, Rajasthan</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gold-500 uppercase">Blue Pottery</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Kanchipuram, Tamil Nadu</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gold-500 uppercase">Silk Weave</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Kondagaon, Chhattisgarh</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gold-500 uppercase">Dhokra Metal</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Ganderbal, Kashmir</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gold-500 uppercase">Kani Pashmina</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-ivory font-semibold mb-6">Luxury Curation Updates</h4>
          <p className="text-xs text-ivory/50 mb-4 font-sans font-light">
            Receive exclusive updates on newly onboarded artisan collections and custom commissioned work.
          </p>
          <div className="flex border-b border-ivory/20 pb-2">
            <input 
              type="email" 
              placeholder="curator@gallery.com" 
              className="bg-transparent text-xs text-ivory w-full focus:outline-none placeholder-ivory/30 font-sans font-light"
            />
            <button className="text-gold-500 hover:text-gold-600 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Verification Info */}
        <div className="flex flex-wrap items-center gap-6 text-[10px] text-ivory/40 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            KritiCam AI-Audited Listings
          </span>
          <span>•</span>
          <span>Secured on Ethereum Ledger</span>
          <span>•</span>
          <span>Zero-Middlemen Protocol</span>
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-ivory/40 font-sans font-light flex items-center gap-1">
          <span>© {new Date().getFullYear()} HaathSe. Built with</span>
          <Heart className="w-3 h-3 text-terracotta fill-terracotta animate-pulse" />
          <span>for Rural Indian Artisans. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
