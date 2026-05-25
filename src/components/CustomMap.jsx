import React, { useState } from 'react';
import { MapPin, ArrowUpRight, Award, Users, TrendingUp } from 'lucide-react';
import { artisans } from '../data/mockData';

export default function CustomMap() {
  const [selectedCluster, setSelectedCluster] = useState(artisans[0]);

  // Visual layout coordinate offsets for our stylized India map canvas
  const clusters = [
    {
      id: "art-1", // Jaipur
      x: "30%",
      y: "40%",
      artisan: artisans[0],
      stat: "₹1.42 Cr Sales",
      growth: "+180%"
    },
    {
      id: "art-2", // Kanchipuram
      x: "38%",
      y: "85%",
      artisan: artisans[1],
      stat: "₹1.68 Cr Sales",
      growth: "+135%"
    },
    {
      id: "art-3", // Bastar
      x: "55%",
      y: "62%",
      artisan: artisans[2],
      stat: "₹48 L Sales",
      growth: "+220%"
    },
    {
      id: "art-4", // Srinagar
      x: "28%",
      y: "12%",
      artisan: artisans[3],
      stat: "₹70 L Sales",
      growth: "+150%"
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-ivory p-6 md:p-10 rounded-3xl border border-gold-500/10 shadow-premium">
      {/* Map Graphic Panel */}
      <div className="lg:col-span-7 bg-charcoal-900 rounded-2xl relative overflow-hidden aspect-[4/5] md:aspect-square flex items-center justify-center glow-border-dark border border-white/5 shadow-luxury">
        {/* Subtle grid pattern inside map */}
        <div className="absolute inset-0 opacity-10 bg-grid" style={{
          backgroundImage: "radial-gradient(circle, rgba(197, 168, 128, 0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }} />
        
        {/* Stylized background outline for India */}
        <div className="absolute w-[80%] h-[85%] opacity-20 border border-gold-500/10 rounded-full filter blur-xl bg-gold-500/5 animate-pulse-subtle" />
        
        {/* Abstract vector shape representing India landmass */}
        <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] text-gold-500/10 absolute opacity-30 select-none pointer-events-none" fill="currentColor">
          <path d="M 120 40 Q 150 10 180 30 T 220 50 T 260 90 T 220 150 T 250 200 T 290 230 T 320 280 T 290 340 T 210 380 T 170 420 T 160 480 T 145 420 T 120 380 T 110 320 T 80 280 T 60 220 T 80 180 T 100 130 Z" />
        </svg>

        {/* Dynamic connection lines between pins */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" fill="none">
          {clusters.map((c, i) => (
            i < clusters.length - 1 && (
              <line
                key={`line-${i}`}
                x1={c.x}
                y1={c.y}
                x2={clusters[i+1].x}
                y2={clusters[i+1].y}
                stroke="#C5A880"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="animate-pulse"
              />
            )
          ))}
        </svg>

        {/* Active Pins */}
        {clusters.map((cluster) => {
          const isActive = selectedCluster.id === cluster.artisan.id;
          return (
            <button
              key={cluster.id}
              onClick={() => setSelectedCluster(cluster.artisan)}
              style={{ left: cluster.x, top: cluster.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 focus:outline-none"
            >
              {/* Ripple Ring */}
              <span className={`absolute -inset-4 rounded-full border border-terracotta-500/40 ${
                isActive ? 'animate-ping opacity-75 scale-125' : 'scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700'
              }`} />
              
              {/* Outer Glow */}
              <span className={`absolute -inset-2 rounded-full ${
                isActive ? 'bg-terracotta/20 animate-pulse' : 'bg-gold-500/10'
              }`} />
              
              {/* Solid Pin */}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-500 ${
                isActive 
                  ? 'bg-terracotta border-ivory scale-110 shadow-glow-terracotta' 
                  : 'bg-charcoal-900 border-gold-500/40 hover:border-terracotta hover:scale-105'
              }`}>
                <MapPin className={`w-2.5 h-2.5 ${isActive ? 'text-ivory' : 'text-gold-500'}`} />
              </div>

              {/* Hover Mini-Tooltip */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 w-28 text-center z-20">
                <div className="bg-charcoal px-2.5 py-1 rounded-md text-[9px] font-sans tracking-wider text-ivory/90 uppercase border border-white/10 shadow-premium">
                  {cluster.artisan.village}
                </div>
              </div>
            </button>
          );
        })}

        {/* Map Caption */}
        <div className="absolute bottom-6 left-6 text-left">
          <p className="text-[10px] uppercase tracking-widest text-gold-500/60 font-semibold mb-1">Interactive Georeference</p>
          <p className="text-xs text-white/50">Active Artisanal Craft Clusters</p>
        </div>
      </div>

      {/* Info Panel Details */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-terracotta font-semibold px-3 py-1 rounded bg-terracotta/10 border border-terracotta/20 inline-block mb-4">
            Active Cluster
          </span>
          <h3 className="title-serif text-3xl md:text-4xl text-charcoal font-semibold mb-2">
            {selectedCluster.village}
          </h3>
          <p className="text-xs uppercase tracking-widest text-gold-600 font-medium mb-6">
            {selectedCluster.district}, {selectedCluster.state}
          </p>

          <p className="text-xs text-charcoal-700/80 leading-relaxed font-sans font-light mb-8">
            {selectedCluster.about}
          </p>

          {/* Core Cluster Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-charcoal-50 rounded-xl border border-gold-500/10">
              <div className="flex items-center gap-1 text-gold-600 mb-1.5">
                <Users className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-wider font-semibold">Weavers</span>
              </div>
              <p className="text-lg font-bold text-charcoal tracking-tight">
                {selectedCluster.id === "art-1" ? "140+" : selectedCluster.id === "art-2" ? "410+" : selectedCluster.id === "art-3" ? "210+" : "300+"}
              </p>
            </div>

            <div className="p-4 bg-charcoal-50 rounded-xl border border-gold-500/10">
              <div className="flex items-center gap-1 text-terracotta mb-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-wider font-semibold">Growth</span>
              </div>
              <p className="text-lg font-bold text-terracotta tracking-tight">
                +{selectedCluster.incomeIncreasePercentage}%
              </p>
            </div>

            <div className="p-4 bg-charcoal-50 rounded-xl border border-gold-500/10">
              <div className="flex items-center gap-1 text-gold-600 mb-1.5">
                <Award className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-wider font-semibold">Traceability</span>
              </div>
              <p className="text-lg font-bold text-charcoal tracking-tight">
                {selectedCluster.sustainabilityScore}%
              </p>
            </div>
          </div>

          {/* Heritage Legacy Quote */}
          <div className="border-l border-gold-500/30 pl-4 py-1 italic text-xs text-charcoal-700/60 leading-relaxed">
            "{selectedCluster.heritageHistory}"
          </div>
        </div>

        {/* Master Artisan Card */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gold-500/10 shadow-premium">
          <div className="flex items-center gap-3">
            <img 
              src={selectedCluster.avatar} 
              alt={selectedCluster.name} 
              className="w-12 h-12 rounded-full object-cover border border-gold-500/20"
            />
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal font-semibold">{selectedCluster.name}</p>
              <p className="text-[10px] text-charcoal-700/60">Master Craftsman • {selectedCluster.experienceYears} yrs experience</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-gold-600 bg-gold-100 border border-gold-500/20 px-2 py-0.5 rounded-full font-semibold">
              KritiCam Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
