import React, { useEffect, useState } from 'react';

export function SamudraRakshakSignInPage({ onSignIn }) {
  const [reevalTime, setReevalTime] = useState('0.4s');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const jitterValues = ['0.4s', '0.3s', '0.4s', '0.2s', '0.5s', '0.3s'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % jitterValues.length;
      setReevalTime(jitterValues[idx]);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const handleEnterApp = (tab = 'overview') => {
    if (onSignIn) {
      onSignIn({
        email: 'operator@sagar-suraksha.gov.in',
        role: 'Authorized Marine Operator',
        callSign: 'IN-SS-09',
        station: 'Mandapam Deep-Sea Operations Base',
        authMethod: 'Encrypted Biometric Auth',
        initialTab: tab,
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between select-none bg-[#0b131a] text-[#E6EDF2] font-sans overflow-x-hidden relative">
      {/* Dynamic Embedded Styling for Caustics, Scanlines & Marquees */}
      <style>{`
        /* Technical scanlines subtle effect */
        .scanline-grid {
          background-image: linear-gradient(rgba(42, 59, 72, 0.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(42, 59, 72, 0.12) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* Ticker animation */
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: ticker 42s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* Weather ticker animation */
        .animate-weather-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: ticker 55s linear infinite;
        }
        .animate-weather-marquee:hover {
          animation-play-state: paused;
        }

        /* Underwater Sunbeam Shimmer */
        @keyframes caustic-sweep {
          0% { opacity: 0.15; transform: rotate(-18deg) translateX(-15%) scaleY(0.95); }
          50% { opacity: 0.38; transform: rotate(-15deg) translateX(5%) scaleY(1.08); }
          100% { opacity: 0.15; transform: rotate(-18deg) translateX(-15%) scaleY(0.95); }
        }
        .animate-caustics {
          animation: caustic-sweep 14s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        /* Floating Bioluminescent Particle Motes */
        @keyframes particle-drift {
          0% {
            transform: translateY(105vh) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh) translateX(45px);
            opacity: 0;
          }
        }
        .bio-mote {
          position: absolute;
          background: radial-gradient(circle, #3abdb0 0%, rgba(42, 157, 143, 0.2) 65%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          animation: particle-drift infinite ease-in-out;
        }

        /* Radar Beam Sweep */
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar-sweep {
          transform-origin: center center;
          animation: radar-sweep 3.2s linear infinite;
        }

        /* Laser Shimmer across Progress Bar */
        @keyframes laser-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .animate-laser {
          animation: laser-shimmer 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Expanding Radar Pulse Ring */
        @keyframes radar-ring {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .animate-radar-ring {
          animation: radar-ring 1.8s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        /* Button CTA Sheen Sweep */
        .cta-sheen-wrapper {
          position: relative;
          overflow: hidden;
        }
        .cta-sheen-wrapper::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 40%;
          height: 200%;
          background: linear-gradient(
            60deg,
            rgba(255, 255, 255, 0) 10%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 90%
          );
          transform: skewX(-20deg);
          transition: none;
          pointer-events: none;
          opacity: 0;
        }
        .cta-sheen-wrapper:hover::after {
          animation: sheen-sweep 0.75s ease forwards;
        }
        @keyframes sheen-sweep {
          0% { left: -50%; opacity: 0; }
          40% { opacity: 0.85; }
          100% { left: 140%; opacity: 0; }
        }

        .operational-card {
          background-color: rgba(20, 35, 48, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(42, 157, 143, 0.3);
          border-radius: 4px;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .operational-card:hover {
          border-color: rgba(42, 157, 143, 0.65);
          box-shadow: 0 16px 36px -10px rgba(10, 18, 25, 0.85), 0 0 24px -4px rgba(42, 157, 143, 0.3);
        }
        .pulse-amber {
          box-shadow: 0 0 0 0 rgba(224, 159, 62, 0.6);
          animation: pulse-amber-anim 2s infinite;
        }
        @keyframes pulse-amber-anim {
          0% { box-shadow: 0 0 0 0 rgba(224, 159, 62, 0.7); }
          70% { box-shadow: 0 0 0 7px rgba(224, 159, 62, 0); }
          100% { box-shadow: 0 0 0 0 rgba(224, 159, 62, 0); }
        }
        .pulse-teal {
          box-shadow: 0 0 0 0 rgba(42, 157, 143, 0.7);
          animation: pulse-teal-anim 2s infinite;
        }
        @keyframes pulse-teal-anim {
          0% { box-shadow: 0 0 0 0 rgba(42, 157, 143, 0.7); }
          70% { box-shadow: 0 0 0 7px rgba(42, 157, 143, 0); }
          100% { box-shadow: 0 0 0 0 rgba(42, 157, 143, 0); }
        }
        .pulse-red {
          box-shadow: 0 0 0 0 rgba(229, 72, 77, 0.7);
          animation: pulse-red-anim 1.8s infinite;
        }
        @keyframes pulse-red-anim {
          0% { box-shadow: 0 0 0 0 rgba(229, 72, 77, 0.75); }
          70% { box-shadow: 0 0 0 7px rgba(229, 72, 77, 0); }
          100% { box-shadow: 0 0 0 0 rgba(229, 72, 77, 0); }
        }
      `}</style>

      {/* BEGIN: Background Layer (Underwater Cavern Image with Balanced Scrim) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" data-purpose="sonar-backdrop">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out" 
          style={{ 
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDUtIk5NQgsZH92UBrao7zA6KjlpiovPmFvLE2T_STJ7bS7EPCX-Nf0kIxX2b5PKoSl6ZXU5ygH7aYvYgSxA_dputMip8Nyk4mmLRugs9w50JqaIlGb5ccOlP0Wdl4US6w7EowC-PWeSeox2YZaSvoCMb-VdC0MODRICXwoFrViIDkldOUFwlRgkUQxhfqHxeJZ0IHlRHgs5_HadBn-5XE2H71Wlj5CCil_t553ZoaxlIL2olL0reljsmNMQLKhH4jcAU")` 
          }}
        />
        
        {/* Shimmering Caustic Light Sweep / Underwater Sunbeams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-32 left-1/4 w-[55vw] h-[130vh] bg-gradient-to-b from-[#3abdb0]/20 via-[#2A9D8F]/10 to-transparent blur-3xl transform -rotate-12 animate-caustics origin-top"></div>
          <div className="absolute -top-20 left-1/3 w-[30vw] h-[120vh] bg-gradient-to-b from-white/10 via-[#3abdb0]/10 to-transparent blur-2xl transform -rotate-6 animate-caustics origin-top" style={{ animationDuration: '18s', animationDelay: '-4s' }}></div>
        </div>

        {/* Floating Bioluminescent Deep-Sea Particles */}
        <div className="absolute inset-0 pointer-events-none" id="mote-container">
          <div className="bio-mote w-1.5 h-1.5" style={{ left: '12%', animationDuration: '16s', animationDelay: '0s' }}></div>
          <div className="bio-mote w-2 h-2" style={{ left: '28%', animationDuration: '22s', animationDelay: '3s' }}></div>
          <div className="bio-mote w-1 h-1" style={{ left: '42%', animationDuration: '18s', animationDelay: '6s' }}></div>
          <div className="bio-mote w-2.5 h-2.5" style={{ left: '58%', animationDuration: '20s', animationDelay: '1.5s' }}></div>
          <div className="bio-mote w-1 h-1" style={{ left: '72%', animationDuration: '14s', animationDelay: '8s' }}></div>
          <div className="bio-mote w-2 h-2" style={{ left: '85%', animationDuration: '24s', animationDelay: '4.5s' }}></div>
          <div className="bio-mote w-1.5 h-1.5" style={{ left: '93%', animationDuration: '19s', animationDelay: '11s' }}></div>
          <div className="bio-mote w-2 h-2" style={{ left: '35%', animationDuration: '26s', animationDelay: '9s' }}></div>
          <div className="bio-mote w-1 h-1" style={{ left: '64%', animationDuration: '17s', animationDelay: '13s' }}></div>
        </div>

        {/* Dark Scrim Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b131a]/85 via-[#0b131a]/60 via-60% to-[#0b131a]/65"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b131a]/90 via-transparent via-50% to-[#0b131a]/80"></div>
        <div className="absolute inset-0 scanline-grid opacity-20"></div>
      </div>

      {/* BEGIN: Top Header */}
      <header className="relative z-30 border-b border-[#2A3B48]/80 bg-[#0F1B24]/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Sector Telemetry */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleEnterApp('overview')} 
              className="flex items-center space-x-3 group text-left cursor-pointer"
              title="Samudra-Rakshak Strategic Console"
            >
              <div className="w-7 h-7 rounded-[3px] bg-[#142330] border border-[#2A3B48] flex items-center justify-center text-[#2A9D8F] group-hover:border-[#2A9D8F] group-hover:shadow-[0_0_12px_rgba(42,157,143,0.35)] transition-all">
                <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9"></circle>
                  <line x1="12" x2="12" y1="3" y2="7"></line>
                  <line x1="12" x2="12" y1="17" y2="21"></line>
                  <line x1="3" x2="7" y1="12" y2="12"></line>
                  <line x1="17" x2="21" y1="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-wider uppercase text-[#E6EDF2] font-mono group-hover:text-white transition-colors">SAMUDRA-RAKSHAK</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>
                </div>
                <div className="text-[10px] font-mono text-[#627685] tracking-tight uppercase">
                  // SAGAR SURAKSHA TACTICAL • INDIA
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="relative hidden md:flex items-center bg-[#0a1219]/70 border border-[#2A3B48] p-1 rounded-[4px] shadow-inner">
            <button 
              onClick={() => handleEnterApp('overview')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer rounded-[3px] ${
                activeTab === 'overview' ? 'bg-[#142330] text-white border border-[#2A9D8F]/40' : 'text-[#93A4B1] hover:text-white'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => handleEnterApp('geospatial')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer rounded-[3px] flex items-center gap-1.5 ${
                activeTab === 'geospatial' ? 'bg-[#142330] text-white border border-[#2A9D8F]/40' : 'text-[#93A4B1] hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" x2="8" y1="2" y2="18"></line><line x1="16" x2="16" y1="6" y2="22"></line></svg>
              Geospatial Map
            </button>
            <button 
              onClick={() => handleEnterApp('incidents')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer rounded-[3px] flex items-center gap-1.5 ${
                activeTab === 'incidents' ? 'bg-[#142330] text-white border border-[#2A9D8F]/40' : 'text-[#93A4B1] hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5 opacity-70 text-[#E09F3E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
              Marine Incidents
            </button>
            <button 
              onClick={() => handleEnterApp('tactical-feed')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer rounded-[3px] flex items-center gap-1.5 ${
                activeTab === 'tactical-feed' ? 'bg-[#142330] text-white border border-[#2A9D8F]/40' : 'text-[#93A4B1] hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"></circle><path d="M12 2v4m0 12v4M2 12h4m12 0h4"></path></svg>
              Tactical Feed
            </button>
            <button 
              onClick={() => handleEnterApp('sonar-analysis')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer rounded-[3px] flex items-center gap-1.5 ${
                activeTab === 'sonar-analysis' ? 'bg-[#142330] text-white border border-[#2A9D8F]/40' : 'text-[#93A4B1] hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5 opacity-70 text-[#2A9D8F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path><path d="M12 6a6 6 0 0 1 6 6"></path></svg>
              Sonar Analysis
            </button>
          </nav>

          {/* Right Operator Authentication Telemetry */}
          <div className="flex items-center space-x-3">
            <div className="hidden xl:flex flex-col text-right font-mono p-1 rounded transition-all hover:bg-[#142330] cursor-default group">
              <div className="text-[11px] font-semibold text-[#E09F3E] tracking-tight group-hover:text-amber-300 transition">IN-SS-09</div>
              <div className="text-[9px] text-[#627685] group-hover:text-[#93A4B1] transition">ENCRYPTED AUTH: AES-GCM</div>
            </div>
            <div className="h-6 w-[1px] bg-[#2A3B48] hidden sm:block"></div>
            <button 
              onClick={() => handleEnterApp('overview')}
              className="h-8 px-2.5 bg-[#142330] hover:bg-[#1a2e3f] text-[#E6EDF2] border border-[#2A3B48] hover:border-[#2A9D8F]/60 rounded-[3px] flex items-center gap-2 font-mono text-xs transition active:scale-95 shadow-sm group cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A9D8F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2A9D8F]"></span>
              </span>
              <span className="hidden sm:inline text-xs text-[#93A4B1] group-hover:text-[#E6EDF2] transition">COMMS:</span>
              <span className="text-xs text-[#E6EDF2] font-bold group-hover:text-[#3abdb0] transition">ONLINE</span>
            </button>
            <button 
              onClick={() => handleEnterApp('overview')}
              className="w-8 h-8 rounded-[3px] bg-[#142330] hover:bg-[#1a2e3f] border border-[#2A3B48] flex items-center justify-center text-[#93A4B1] hover:text-[#E6EDF2] transition active:scale-95 cursor-pointer" 
              title="Operator Session / Terminal Access"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
            </button>
          </div>
        </div>
      </header>

      {/* BEGIN: Hero Main */}
      <main className="relative z-10 flex-1 flex items-center py-10 lg:py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Operations Narrative & Command Callouts */}
          <section className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#142330]/90 border border-[#2A3B48] hover:border-[#E09F3E]/50 transition rounded-[3px] text-xs font-mono text-[#E6EDF2] tracking-wide shadow-sm cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E09F3E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E09F3E] pulse-amber"></span>
              </span>
              <span className="font-semibold text-[#E09F3E]">SAGAR SURAKSHA</span>
              <span className="text-[#627685]">//</span>
              <span className="text-[#93A4B1] uppercase">Live Maritime Intelligence</span>
              <span className="text-[#627685]">•</span>
              <span className="text-[#2A9D8F] font-semibold">INDIA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#E6EDF2] leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Read the ocean before you sail into it.
            </h1>

            <p className="text-base sm:text-lg text-[#93A4B1] leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              Real-time navigational intelligence, synthetic aperture radar feeds, bathymetric tracking, and automated hazard interception engineered specifically for the Indian maritime corridor.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button 
                onClick={() => handleEnterApp('geospatial')}
                className="cta-sheen-wrapper group px-5 py-2.5 rounded-[3px] bg-[#E09F3E] hover:bg-[#cca42b] text-[#0a1219] font-medium text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 transition-all duration-150 transform active:scale-95 hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="font-semibold">Open live chart</span>
                <svg className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <button 
                onClick={() => handleEnterApp('tactical-feed')}
                className="group px-5 py-2.5 rounded-[3px] bg-[#142330] hover:bg-[#1a2e3f] border border-[#2A3B48] hover:border-[#2A9D8F] text-[#E6EDF2] hover:text-white font-medium text-sm flex items-center gap-2.5 transition-all duration-150 transform active:scale-95 hover:-translate-y-0.5 shadow-sm hover:shadow-[0_0_16px_rgba(42,157,143,0.25)] cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#2A9D8F] group-hover:scale-110 group-hover:text-[#3abdb0] transition-all" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 3a9 9 0 0 1 9 9"></path><path d="M12 7a5 5 0 0 1 5 5"></path></svg>
                <span>View the feed</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#93A4B1] border-t border-[#2A3B48]/60">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>
                <span className="text-[#E6EDF2] font-medium">EEZ INTL BOUNDARY</span>
                <span className="text-[#627685]">•</span>
                <span className="text-[#2A9D8F] font-semibold">SYNCHRONIZED</span>
              </div>
              <span className="text-[#627685]">/</span>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E09F3E]"></span>
                <span>SAR FEED:</span>
                <span className="text-[#E6EDF2] font-medium">COPERNICUS SENTINEL-1 NRT // SW MONSOON REGIME</span>
              </div>
            </div>
          </section>

          {/* Right Column: DebrisSense AI & Copernicus CMEMS HUD Component */}
          <section className="lg:col-span-5">
            <div className="space-y-4">
              {/* DebrisSense Card */}
              <div className="operational-card p-5 shadow-2xl relative overflow-hidden group/hud cursor-crosshair">
                <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-[#2A9D8F]/15 pointer-events-none group-hover/hud:border-[#2A9D8F]/30 transition-colors"></div>
                <div className="flex items-start justify-between mb-3 pb-3 border-b border-[#2A3B48]/70 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-9 h-9 rounded-[3px] bg-[#0a1219] border border-[#2A9D8F]/50 flex items-center justify-center text-[#2A9D8F] shadow-inner overflow-hidden">
                      <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-radar-sweep">
                        <div className="w-1/2 h-[1.5px] bg-gradient-to-r from-[#2A9D8F]/10 via-[#3abdb0] to-transparent ml-auto origin-left"></div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-[#E6EDF2] leading-tight group-hover/hud:text-white transition-colors">DebrisSense AI</h2>
                      <p className="text-[9px] font-mono tracking-wider text-[#E09F3E] uppercase">NEURAL BATHYMETRIC SUITE // ONBOARD AI</p>
                    </div>
                  </div>
                  <div className="relative px-2 py-0.5 bg-[#0a1219] border border-[#2A9D8F]/50 text-[#2A9D8F] text-[10px] font-mono rounded-[3px] flex items-center gap-1.5 overflow-hidden shadow-sm">
                    <div className="relative flex items-center justify-center w-2 h-2">
                      <span className="absolute w-2 h-2 rounded-full bg-[#2A9D8F]/60 animate-radar-ring"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F]"></span>
                    </div>
                    <span className="font-bold tracking-tight text-[#3abdb0]">ACTIVE SWEEP</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#93A4B1] leading-relaxed font-mono mb-3 relative z-10">
                  Scans voyage path continuously, auto-detecting drifting debris, lost ghost nets, and submerged shipping obstructions flagged the moment acoustic sensors pick them up.
                </p>

                <div className="bg-[#0a1219]/80 p-3 rounded-[3px] border border-[#2A3B48] space-y-2 font-mono mb-3 relative z-10 transition-colors group-hover/hud:border-[#2A9D8F]/30">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#627685] uppercase tracking-wide">TARGET DISCRIMINATOR</span>
                    <span className="text-[#2A9D8F] font-bold tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>CONFIDENCE 99.4%
                    </span>
                  </div>
                  <div className="relative w-full bg-[#0F1B24] h-1.5 rounded-[2px] overflow-hidden p-[1px] border border-[#2A3B48]">
                    <div className="relative bg-gradient-to-r from-[#2A9D8F] to-[#E09F3E] h-full rounded-[1px] overflow-hidden" style={{ width: '99.4%' }}>
                      <div className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-laser"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-0.5 text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#E09F3E]">
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
                      <span>Sector 04-W • 0 False Positives</span>
                    </div>
                    <span className="text-[#627685] font-mono flex items-center gap-1">
                      <span>RE-EVAL</span>
                      <span className="text-[#2A9D8F] font-bold transition-opacity">{reevalTime}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono pt-1 text-[#93A4B1] relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>
                    <span className="text-[#E6EDF2]">Onboard AI</span>
                    <span className="text-[#627685]">•</span>
                    <span className="text-[#627685] hidden sm:inline">Real-time hazard flagging</span>
                  </div>
                  <button 
                    onClick={() => handleEnterApp('sonar-analysis')}
                    className="text-[#2A9D8F] hover:text-[#3abdb0] inline-flex items-center gap-1 transition-all duration-150 transform hover:translate-x-1 cursor-pointer"
                  >
                    <span>Launch Sonar Suite</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"></path></svg>
                  </button>
                </div>
              </div>

              {/* Copernicus CMEMS Card */}
              <div className="operational-card p-5 shadow-2xl relative overflow-hidden group/hud cursor-crosshair">
                <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-[#2A9D8F]/15 pointer-events-none group-hover/hud:border-[#2A9D8F]/30 transition-colors"></div>
                <div className="flex items-start justify-between mb-3 pb-3 border-b border-[#2A3B48]/70 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-9 h-9 rounded-[3px] bg-[#0a1219] border border-[#2A9D8F]/50 flex items-center justify-center text-[#2A9D8F] shadow-inner overflow-hidden">
                      <svg className="w-5 h-5 opacity-80 text-[#3abdb0]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M4.93 4.93a10 10 0 0 1 14.14 0"></path><path d="M19.07 19.07a10 10 0 0 1-14.14 0"></path><path d="M7.76 7.76a6 6 0 0 1 8.48 0"></path><path d="M16.24 16.24a6 6 0 0 1-8.48 0"></path></svg>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-[#E6EDF2] leading-tight group-hover/hud:text-white transition-colors">Copernicus CMEMS</h2>
                      <p className="text-[9px] font-mono tracking-wider text-[#E09F3E] uppercase">SENTINEL-1 SAR &amp; SENTINEL-2 OPTICAL</p>
                    </div>
                  </div>
                  <div className="relative px-2 py-0.5 bg-[#0a1219] border border-[#2A9D8F]/50 text-[#2A9D8F] text-[10px] font-mono rounded-[3px] flex items-center gap-1.5 overflow-hidden shadow-sm">
                    <div className="relative flex items-center justify-center w-2 h-2">
                      <span className="absolute w-2 h-2 rounded-full bg-[#2A9D8F]/60 animate-radar-ring"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F]"></span>
                    </div>
                    <span className="font-bold tracking-tight text-[#3abdb0]">LIVE INGEST</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#93A4B1] leading-relaxed font-mono mb-3 relative z-10">
                  Earth observation satellite feeds continuously ingested via Sentinel-1 Synthetic Aperture Radar and Sentinel-2 optical imagery — mapping sea-surface anomalies, slick patterns, and ocean currents across the Indian Ocean basin.
                </p>

                <div className="bg-[#0a1219]/80 p-3 rounded-[3px] border border-[#2A3B48] space-y-2 font-mono mb-3 relative z-10 transition-colors group-hover/hud:border-[#2A9D8F]/30">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#627685] uppercase tracking-wide">COPERNICUS ANOMALY INDEX</span>
                    <span className="text-[#2A9D8F] font-bold tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>RES 10m • 98.7% ALIGNMENT
                    </span>
                  </div>
                  <div className="relative w-full bg-[#0F1B24] h-1.5 rounded-[2px] overflow-hidden p-[1px] border border-[#2A3B48]">
                    <div className="relative bg-gradient-to-r from-[#2A9D8F] to-[#E09F3E] h-full rounded-[1px] overflow-hidden" style={{ width: '98.7%' }}>
                      <div className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-laser"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-0.5 text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#E09F3E]">
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
                      <span>Sentinel-1B Orbit 4821 • Indian EEZ Corridor</span>
                    </div>
                    <span className="text-[#627685] font-mono flex items-center gap-1">
                      <span>INGEST</span>
                      <span className="text-[#2A9D8F] font-bold">0.4s</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono pt-1 text-[#93A4B1] relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>
                    <span className="text-[#E6EDF2]">CMEMS L2P Feed</span>
                    <span className="text-[#627685]">•</span>
                    <span className="text-[#627685] hidden sm:inline">Synchronized</span>
                  </div>
                  <button 
                    onClick={() => handleEnterApp('incidents')}
                    className="text-[#2A9D8F] hover:text-[#3abdb0] inline-flex items-center gap-1 transition-all duration-150 transform hover:translate-x-1 cursor-pointer"
                  >
                    <span>Explore Copernicus Dataset</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* BEGIN: Bottom Telemetry Tickers */}
      <footer className="relative z-30 border-t border-[#2A3B48]/80 bg-[#0a1219] text-[#93A4B1] font-mono text-xs select-none" data-purpose="telemetry-tickers">
        {/* Weather & Oceanographic Sensor Strip */}
        <div className="px-4 lg:px-8 py-2 border-b border-[#2A3B48]/50 flex items-center text-[11px] overflow-hidden whitespace-nowrap">
          <div className="flex items-center space-x-2 mr-4 text-[#E6EDF2] shrink-0 font-semibold uppercase tracking-wider bg-[#0a1219] z-10 pr-2">
            <span className="w-2 h-2 rounded-full bg-[#E09F3E] pulse-amber"></span>
            <span>WEATHER — INDIA</span>
            <span className="text-[#2A3B48]">|</span>
          </div>

          <div className="overflow-hidden flex-1 relative flex items-center">
            <div className="animate-weather-marquee text-[11px] text-[#627685] flex items-center space-x-8">
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[#2A9D8F]">✦</span>
                <span className="text-[#E09F3E] font-medium">Kochi / Cochin:</span>
                <span className="text-[#E6EDF2]">27°C</span>
                <span>•</span>
                <span>Monsoonal Rain</span>
                <span>•</span>
                <span className="text-[#E6EDF2]">WSW 18 kts</span>
                <span>•</span>
                <span>Swell 2.8m</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[#2A9D8F]">✦</span>
                <span className="text-[#E09F3E] font-medium">Chennai:</span>
                <span className="text-[#E6EDF2]">31°C</span>
                <span>•</span>
                <span>Partly Cloudy</span>
                <span>•</span>
                <span className="text-[#E6EDF2]">ESE 12 kts</span>
                <span>•</span>
                <span>Swell 1.1m</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[#2A9D8F]">✦</span>
                <span className="text-[#E09F3E] font-medium">Visakhapatnam:</span>
                <span className="text-[#E6EDF2]">30°C</span>
                <span>•</span>
                <span>Clear Radar Horizon</span>
                <span>•</span>
                <span className="text-[#E6EDF2]">S 09 kts</span>
                <span>•</span>
                <span>Swell 1.4m</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[#2A9D8F]">✦</span>
                <span className="text-[#E09F3E] font-medium">Mumbai Offing:</span>
                <span className="text-[#E6EDF2]">29°C</span>
                <span>•</span>
                <span>WSW 15 kts</span>
                <span>•</span>
                <span>Swell 2.1m</span>
              </div>

              {/* Duplicate loop */}
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[#2A9D8F]">✦</span>
                <span className="text-[#E09F3E] font-medium">Kochi / Cochin:</span>
                <span className="text-[#E6EDF2]">27°C</span>
                <span>•</span>
                <span>Monsoonal Rain</span>
                <span>•</span>
                <span className="text-[#E6EDF2]">WSW 18 kts</span>
                <span>•</span>
                <span>Swell 2.8m</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[#2A9D8F]">✦</span>
                <span className="text-[#E09F3E] font-medium">Chennai:</span>
                <span className="text-[#E6EDF2]">31°C</span>
                <span>•</span>
                <span>Partly Cloudy</span>
                <span>•</span>
                <span className="text-[#E6EDF2]">ESE 12 kts</span>
                <span>•</span>
                <span>Swell 1.1m</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[#2A9D8F]">✦</span>
                <span className="text-[#E09F3E] font-medium">Visakhapatnam:</span>
                <span className="text-[#E6EDF2]">30°C</span>
                <span>•</span>
                <span>Clear Radar Horizon</span>
                <span>•</span>
                <span className="text-[#E6EDF2]">S 09 kts</span>
                <span>•</span>
                <span>Swell 1.4m</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[#2A9D8F]">✦</span>
                <span className="text-[#E09F3E] font-medium">Mumbai Offing:</span>
                <span className="text-[#E6EDF2]">29°C</span>
                <span>•</span>
                <span>WSW 15 kts</span>
                <span>•</span>
                <span>Swell 2.1m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Tactical Broadcast News Ticker */}
        <div className="px-4 lg:px-8 py-2 bg-[#0F1B24]/90 flex items-center overflow-hidden">
          <div className="flex items-center space-x-2 shrink-0 pr-3 z-10 bg-[#0F1B24] shadow-lg text-[11px] font-bold text-[#E5484D] tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5484D] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5484D] pulse-red"></span>
            </span>
            <span>LIVE NEWS</span>
            <span className="text-[#2A3B48]">|</span>
          </div>

          <div className="overflow-hidden flex-1 relative flex items-center">
            <div className="animate-marquee text-[11px] text-[#93A4B1] tracking-wide flex items-center space-x-6">
              <span className="text-[#E6EDF2]">ADVISORY FOR ARABIAN SEA TRANSITS</span>
              <span className="text-[#2A9D8F]">///</span>
              <span className="text-[#2A9D8F] font-medium inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-pulse"></span>
                INTEGRATION // CONTAINER CARRIER TRACKING SYSTEM FULLY INTEGRATED AT JAWAHARLAL NEHRU PORT (JNPT)
              </span>
              <span className="text-[#2A9D8F]">///</span>
              <span className="text-[#E09F3E] font-semibold inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E09F3E] pulse-amber"></span>
                ALERT // DEBRISSENSE DETECTS SUBMERGED GHOST-NET HAZARDS NORTH OF LAKSHADWEEP RIDGE
              </span>
              <span className="text-[#2A9D8F]">///</span>
              <span className="text-[#E6EDF2]">SAR SATELLITE PASS OVER COROMANDEL BASIN CONFIRMED FOR 14:00 UTC</span>
              <span className="text-[#2A9D8F]">///</span>
              <span className="text-[#E6EDF2]">ADVISORY FOR ARABIAN SEA TRANSITS</span>
              <span className="text-[#2A9D8F]">///</span>
              <span className="text-[#2A9D8F] font-medium inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-pulse"></span>
                INTEGRATION // CONTAINER CARRIER TRACKING SYSTEM FULLY INTEGRATED AT JAWAHARLAL NEHRU PORT (JNPT)
              </span>
              <span className="text-[#2A9D8F]">///</span>
              <span className="text-[#E09F3E] font-semibold inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E09F3E] pulse-amber"></span>
                ALERT // DEBRISSENSE DETECTS SUBMERGED GHOST-NET HAZARDS NORTH OF LAKSHADWEEP RIDGE
              </span>
              <span className="text-[#2A9D8F]">///</span>
              <span className="text-[#E6EDF2]">SAR SATELLITE PASS OVER COROMANDEL BASIN CONFIRMED FOR 14:00 UTC</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SamudraRakshakSignInPage;
