import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sparkles } from 'lucide-react';

export default function Navbar({ activeScreen, setActiveScreen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'landing', label: 'Curation' },
    { id: 'whatsapp', label: 'Artisan Hub' },
    { id: 'marketplace', label: 'B2B Marketplace' },
    { id: 'dashboard', label: 'Impact Portal' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-4 glass-panel border-b border-gold-500/10 shadow-premium' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveScreen('landing')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center text-ivory text-sm font-semibold tracking-wider transition-all duration-500 group-hover:bg-terracotta group-hover:scale-105">
            ह
          </div>
          <div>
            <h1 className="title-serif text-xl md:text-2xl font-semibold tracking-wide text-charcoal flex items-center gap-1.5 leading-none">
              HaathSe <span className="text-[10px] uppercase font-sans tracking-widest text-terracotta font-semibold px-1.5 py-0.5 rounded bg-terracotta/5 border border-terracotta/10">AI</span>
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-gold-600 font-medium">KritiCam Provenance</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveScreen(link.id)}
              className={`text-xs uppercase tracking-widest font-medium transition-all duration-300 relative py-1 ${
                activeScreen === link.id 
                  ? 'text-terracotta' 
                  : 'text-charcoal-700/70 hover:text-charcoal'
              }`}
            >
              {link.label}
              {activeScreen === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-terracotta animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector */}
          <button 
            onClick={() => setLang(lang === 'EN' ? 'हिं' : lang === 'हिं' ? 'தமிழ்' : 'EN')} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/20 text-xs tracking-wider text-charcoal-700/80 hover:border-gold-500 hover:text-charcoal transition-all duration-300"
          >
            <Globe className="w-3.5 h-3.5 text-gold-500" />
            <span>{lang}</span>
          </button>

          {/* Luxury CTA */}
          <button 
            onClick={() => setActiveScreen('marketplace')} 
            className="glow-border relative px-5 py-2.5 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-charcoal/90 transition-all duration-300 shadow-premium"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-gold-400" />
              Acquire Craft
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'EN' ? 'हिं' : 'EN')} 
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gold-500/20 text-[10px] tracking-wider text-charcoal-700"
          >
            <Globe className="w-3 h-3 text-gold-500" />
            <span>{lang}</span>
          </button>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-charcoal hover:text-terracotta transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-ivory z-40 animate-fade-in flex flex-col justify-between p-8 border-t border-gold-500/10">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveScreen(link.id);
                  setIsOpen(false);
                }}
                className={`text-left text-lg title-serif tracking-wide py-2 border-b border-gold-500/5 ${
                  activeScreen === link.id 
                    ? 'text-terracotta font-semibold' 
                    : 'text-charcoal-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => {
                setActiveScreen('whatsapp');
                setIsOpen(false);
              }}
              className="w-full text-center py-3.5 rounded-full border border-terracotta/20 text-terracotta text-xs uppercase tracking-widest font-semibold"
            >
              Artisan Simulator
            </button>
            <button 
              onClick={() => {
                setActiveScreen('marketplace');
                setIsOpen(false);
              }}
              className="w-full text-center py-3.5 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold"
            >
              B2B Marketplace
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
