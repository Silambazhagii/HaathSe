import React, { useState } from 'react';
import { Landmark, TrendingUp, Users, Compass, Globe2, Truck, CheckCircle2, ChevronRight, PackageCheck } from 'lucide-react';
import { impactDashboardMetrics } from '../data/mockData';

export default function ImpactDashboard() {
  const { summary, regionalImpact, monthlyGrowth, buyerDistribution } = impactDashboardMetrics;
  const [selectedRegion, setSelectedRegion] = useState(regionalImpact[0]);

  // Mock active logistics track
  const logisticsShipments = [
    {
      id: "ship-1",
      productName: "Imperial Cobalt Vase",
      artisanName: "Ram Swaroop",
      origin: "Kot Jewar, RJ",
      destination: "Sotheby's Gallery, New York, US",
      status: "In Transit",
      date: "May 24, 2026",
      step: 3, // 1 to 4
      timeline: [
        { title: "Craft Collected", date: "May 20", status: "done" },
        { title: "KritiCam Sealed", date: "May 21", status: "done" },
        { title: "Customs Cleared (Delhi)", date: "May 23", status: "done" },
        { title: "International Flight", date: "May 24", status: "active" },
        { title: "NY Port Delivery", date: "Est. May 27", status: "pending" }
      ]
    },
    {
      id: "ship-2",
      productName: "Royal Mulberry Silk Saree",
      artisanName: "Meenakshi Sridhar",
      origin: "Kanchipuram, TN",
      destination: "Lafayette Gallery, Paris, FR",
      status: "Delivered",
      date: "May 22, 2026",
      step: 5,
      timeline: [
        { title: "Craft Collected", date: "May 15", status: "done" },
        { title: "KritiCam Sealed", date: "May 16", status: "done" },
        { title: "Customs Cleared", date: "May 18", status: "done" },
        { title: "Paris Hub Cleared", date: "May 21", status: "done" },
        { title: "Delivered & Signed", date: "May 22", status: "done" }
      ]
    }
  ];

  const [activeShipment, setActiveShipment] = useState(logisticsShipments[0]);

  return (
    <div className="w-full space-y-12">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gold-500/10 pb-6 text-left">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-terracotta font-semibold px-2.5 py-1 rounded bg-terracotta/10 border border-terracotta/20 inline-block mb-2">
            Impact Portal
          </span>
          <h2 className="title-serif text-3xl md:text-4xl text-charcoal font-medium">
            Artisan Growth & Village Impact
          </h2>
        </div>
        
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest text-gold-600 font-semibold mb-0.5">Total Capital Channelled</p>
          <p className="text-2xl font-bold font-mono text-charcoal">₹4.28 Crore <span className="text-xs text-charcoal/50 font-normal">($560k)</span></p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gold-500/10 shadow-premium text-left space-y-3">
          <div className="flex items-center justify-between text-gold-600">
            <Landmark className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-widest font-bold bg-gold-100 px-2 py-0.5 rounded border border-gold-500/15">Capital</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-charcoal tracking-tight font-mono">₹4.28 Cr</p>
            <p className="text-xs text-charcoal-700/50 mt-1 font-sans">Total B2B transactions settled</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gold-500/10 shadow-premium text-left space-y-3">
          <div className="flex items-center justify-between text-terracotta">
            <Users className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-widest font-bold bg-terracotta/10 px-2 py-0.5 rounded border border-terracotta/15">Artisans</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-charcoal tracking-tight font-mono">1,240+</p>
            <p className="text-xs text-charcoal-700/50 mt-1 font-sans">Active craftsmen on platform</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gold-500/10 shadow-premium text-left space-y-3">
          <div className="flex items-center justify-between text-gold-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-widest font-bold bg-gold-100 px-2 py-0.5 rounded border border-gold-500/15">Growth</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-terracotta tracking-tight font-mono">+{summary.avgIncomeIncrease}%</p>
            <p className="text-xs text-charcoal-700/50 mt-1 font-sans">Average artisan income increase</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gold-500/10 shadow-premium text-left space-y-3">
          <div className="flex items-center justify-between text-gold-600">
            <Compass className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-widest font-bold bg-gold-100 px-2 py-0.5 rounded border border-gold-500/15">Clusters</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-charcoal tracking-tight font-mono">{summary.villagesConnected}</p>
            <p className="text-xs text-charcoal-700/50 mt-1 font-sans">Indian villages georeferenced</p>
          </div>
        </div>
      </div>

      {/* Main Growth Graph & Buyer Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Premium Custom SVG Line Chart */}
        <div className="lg:col-span-8 bg-charcoal text-ivory p-6 md:p-8 rounded-3xl border border-white/5 shadow-luxury space-y-6 text-left relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-grid" />
          
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-gold-500 font-semibold mb-1">Financial Projection</p>
              <h3 className="title-serif text-2xl text-white">Monthly Transaction Value</h3>
            </div>
            <span className="text-[10px] text-ivory/50">Units: Millions (INR)</span>
          </div>

          {/* Hand-coded Custom SVG Line Chart */}
          <div className="relative h-64 w-full flex items-end pt-4">
            <svg className="w-full h-full" viewBox="0 0 600 200">
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Chart Line Path */}
              <path
                d="M 50 160 Q 170 140 290 110 T 410 80 T 550 40"
                fill="none"
                stroke="url(#chart-glow-gradient)"
                strokeWidth="4.5"
                strokeLinecap="round"
                className="animate-pulse-subtle"
              />

              {/* Area gradient under the line */}
              <path
                d="M 50 160 Q 170 140 290 110 T 410 80 T 550 40 L 550 190 L 50 190 Z"
                fill="url(#chart-area-gradient)"
                opacity="0.12"
              />

              {/* Chart Node Dots */}
              <circle cx="50" cy="160" r="5.5" fill="#FAF8F5" stroke="#D45B34" strokeWidth="2.5" />
              <circle cx="175" cy="143" r="5.5" fill="#FAF8F5" stroke="#C5A880" strokeWidth="2.5" />
              <circle cx="290" cy="110" r="5.5" fill="#FAF8F5" stroke="#C5A880" strokeWidth="2.5" />
              <circle cx="415" cy="78" r="5.5" fill="#FAF8F5" stroke="#C5A880" strokeWidth="2.5" />
              <circle cx="550" cy="40" r="6.5" fill="#FAF8F5" stroke="#D45B34" strokeWidth="3" />

              {/* Node Labels (Value) */}
              <text x="50" y="142" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">₹1.8M</text>
              <text x="175" y="125" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">₹2.2M</text>
              <text x="290" y="92" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">₹2.9M</text>
              <text x="415" y="60" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">₹3.5M</text>
              <text x="550" y="20" fill="#FAF8F5" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">₹4.28M</text>

              {/* X Axis Months */}
              <text x="50" y="195" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Jan</text>
              <text x="175" y="195" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Feb</text>
              <text x="290" y="195" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Mar</text>
              <text x="415" y="195" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Apr</text>
              <text x="550" y="195" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">May</text>

              {/* Definitions for Gradients */}
              <defs>
                <linearGradient id="chart-glow-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C5A880" />
                  <stop offset="50%" stopColor="#D45B34" />
                  <stop offset="100%" stopColor="#D45B34" />
                </linearGradient>
                <linearGradient id="chart-area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D45B34" />
                  <stop offset="100%" stopColor="#D45B34" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Right: Buyer Distribution & Eco-Badge */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gold-500/10 shadow-premium space-y-6 text-left flex flex-col justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-gold-600 font-bold block mb-1">Global Reach</span>
            <h3 className="title-serif text-2xl text-charcoal mb-4">International B2B Buyers</h3>

            {/* Buyer breakdown lists */}
            <div className="space-y-4">
              {buyerDistribution.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-charcoal-700">{item.country}</span>
                    <span className="font-bold text-charcoal font-mono">{item.share}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-charcoal-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-charcoal' : index === 1 ? 'bg-terracotta' : 'bg-gold-500'
                      }`} 
                      style={{ width: `${item.share}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gold-500/5 flex items-center gap-3">
            <Globe2 className="w-7 h-7 text-gold-500" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-charcoal font-bold leading-none">Global Direct Protocol</p>
              <p className="text-[11px] text-charcoal-700/50 mt-1">Shipping directly from Indian villages to 24 sovereign countries.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Cluster Split & Live Logistics Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Regional Performance Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gold-500/10 shadow-premium space-y-6 text-left">
          <div>
            <h4 className="text-[9px] uppercase tracking-widest text-gold-600 font-bold mb-1">Regional Clusters</h4>
            <h3 className="title-serif text-2xl text-charcoal">Cluster Operations</h3>
          </div>

          <div className="space-y-3">
            {regionalImpact.map((reg) => {
              const isSelected = selectedRegion.name === reg.name;
              return (
                <button
                  key={reg.name}
                  onClick={() => setSelectedRegion(reg)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between ${
                    isSelected 
                      ? 'bg-charcoal text-ivory border-charcoal' 
                      : 'bg-charcoal-50 text-charcoal-800 border-gold-500/5 hover:border-gold-500/20'
                  }`}
                >
                  <div>
                    <h5 className="text-xs uppercase tracking-wider font-semibold leading-none">{reg.name}</h5>
                    <p className={`text-[10px] mt-1.5 ${isSelected ? 'text-ivory/50' : 'text-charcoal-700/50'}`}>
                      {reg.artisans} master artisans enrolled
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono font-bold">₹{(reg.revenue / 10000000).toFixed(2)} Cr</p>
                    <p className={`text-[9px] font-bold ${isSelected ? 'text-terracotta' : 'text-terracotta'}`}>
                      +{reg.growth}% growth
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Live Supply Chain Logistics Tracking */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gold-500/10 shadow-premium space-y-6 text-left">
          
          {/* Logistics Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-500/5 pb-4">
            <div>
              <h4 className="text-[9px] uppercase tracking-widest text-gold-600 font-bold mb-1 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-terracotta" />
                Live Logistics Tracker
              </h4>
              <h3 className="title-serif text-2xl text-charcoal">Artisan-to-Buyer Pipeline</h3>
            </div>
            
            {/* Toggle active shipments */}
            <div className="flex gap-2 bg-charcoal-50 p-1 rounded-full border border-gold-500/10">
              {logisticsShipments.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveShipment(s)}
                  className={`px-3 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-semibold transition-all ${
                    activeShipment.id === s.id
                      ? 'bg-charcoal text-ivory shadow-premium'
                      : 'text-charcoal-700/60 hover:text-charcoal'
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>

          {/* Active Shipment Details card */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-xs bg-charcoal-50 p-4 rounded-2xl border border-gold-500/5">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-charcoal/40 font-semibold leading-none">Acquired Piece</p>
                <p className="text-xs text-charcoal font-semibold mt-1">{activeShipment.productName}</p>
                <p className="text-[10px] text-charcoal-700/60 mt-0.5">By {activeShipment.artisanName}</p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-wider text-charcoal/40 font-semibold leading-none">Shipment Hub Transit</p>
                <p className="text-xs text-charcoal font-bold mt-1 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeShipment.status === 'Delivered' ? 'bg-green-500' : 'bg-terracotta animate-pulse'}`} />
                  {activeShipment.status}
                </p>
                <p className="text-[10px] text-charcoal-700/60 mt-0.5">Updated: {activeShipment.date}</p>
              </div>
            </div>

            {/* Steps Progress Map Visual */}
            <div className="relative pl-6 space-y-6">
              
              {/* Timeline line */}
              <div className="absolute left-[7px] top-1.5 bottom-1.5 w-0.5 bg-charcoal-50" />
              
              {activeShipment.timeline.map((step, idx) => {
                const isDone = step.status === 'done';
                const isActive = step.status === 'active';
                const isPending = step.status === 'pending';

                return (
                  <div key={idx} className="flex justify-between items-start gap-4 text-xs relative">
                    {/* Circle Indicator */}
                    <span className={`absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full border ${
                      isDone 
                        ? 'bg-green-500 border-green-500' 
                        : isActive 
                          ? 'bg-terracotta border-terracotta animate-ping' 
                          : 'bg-white border-charcoal-50'
                    }`} />
                    
                    {isActive && (
                      <span className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-terracotta border border-white" />
                    )}

                    <div>
                      <h5 className={`font-semibold ${
                        isDone ? 'text-charcoal/80' : isActive ? 'text-terracotta font-bold' : 'text-charcoal/30'
                      }`}>
                        {step.title}
                      </h5>
                      <p className="text-[10px] text-charcoal/40 mt-0.5">Direct Route Coordinate</p>
                    </div>

                    <span className="text-[10px] text-charcoal/60 font-mono font-medium">{step.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
