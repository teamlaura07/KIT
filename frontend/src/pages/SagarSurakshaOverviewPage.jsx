import React, { useState, useEffect, useRef } from 'react';

export function SagarSurakshaOverviewPage({ onNavigate, operator, onSignOut }) {
  const [activeTabKey, setActiveTabKey] = useState('overview');
  const [reevalTime, setReevalTime] = useState('0.4s');
  const navContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const hudCardRef = useRef(null);

  // 1. Dynamic Real-time Millisecond Timer Jitter on 'RE-EVAL'
  useEffect(() => {
    const jitterValues = ['0.4s', '0.3s', '0.4s', '0.2s', '0.5s', '0.3s'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % jitterValues.length;
      setReevalTime(jitterValues[idx]);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // 2. Cursor-Tracking Navigation Bar with Smooth Elastic Snapping
  useEffect(() => {
    const container = navContainerRef.current;
    const slider = sliderRef.current;
    if (!container || !slider) return;

    const tabs = container.querySelectorAll('.nav-tab');
    function moveSliderTo(element) {
      if (!element) return;
      const left = element.offsetLeft;
      const width = element.offsetWidth;
      slider.style.left = `${left}px`;
      slider.style.width = `${width}px`;
    }

    const currentTab = Array.from(tabs).find(t => t.dataset.key === activeTabKey) || tabs[0];
    moveSliderTo(currentTab);

    const handleMouseEnter = (e) => moveSliderTo(e.currentTarget);
    const handleMouseLeave = () => {
      const activeElement = Array.from(tabs).find(t => t.dataset.key === activeTabKey) || tabs[0];
      moveSliderTo(activeElement);
    };

    tabs.forEach(tab => {
      tab.addEventListener('mouseenter', handleMouseEnter);
    });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('mouseenter', handleMouseEnter);
      });
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeTabKey]);

  // 3. Tactical HUD 3D Tilt Micro-Interaction
  const handleHudMouseMove = (e) => {
    const card = hudCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
  };

  const handleHudMouseLeave = () => {
    const card = hudCardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  };

  const handleTabClick = (key, navTarget) => {
    setActiveTabKey(key);
    if (onNavigate && navTarget) {
      onNavigate(navTarget);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#2A9D8F] selection:text-[#0a1219] bg-[#0b131a] text-[#E6EDF2] font-sans antialiased relative overflow-x-hidden" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
      
      {/* Inline Keyframe Styles */}
      <style>{`
        .scanline-grid {
          background-image: linear-gradient(rgba(42, 59, 72, 0.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(42, 59, 72, 0.12) 1px, transparent 1px);
          background-size: 32px 32px;
        }

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

        .animate-weather-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: ticker 55s linear infinite;
        }
        .animate-weather-marquee:hover {
          animation-play-state: paused;
        }

        #nav-slider {
          transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes caustic-sweep {
          0% { opacity: 0.15; transform: rotate(-18deg) translateX(-15%) scaleY(0.95); }
          50% { opacity: 0.38; transform: rotate(-15deg) translateX(5%) scaleY(1.08); }
          100% { opacity: 0.15; transform: rotate(-18deg) translateX(-15%) scaleY(0.95); }
        }
        .animate-caustics {
          animation: caustic-sweep 14s ease-in-out infinite;
          mix-blend-mode: screen;
        }

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

        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar-sweep {
          transform-origin: center center;
          animation: radar-sweep 3.2s linear infinite;
        }

        @keyframes laser-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .animate-laser {
          animation: laser-shimmer 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes radar-ring {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .animate-radar-ring {
          animation: radar-ring 1.8s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

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
          will-change: transform;
        }
        .operational-card:hover {
          border-color: rgba(42, 157, 143, 0.65);
          box-shadow: 0 16px 36px -10px rgba(10, 18, 25, 0.85), 0 0 24px -4px rgba(42, 157, 143, 0.3);
        }

        @keyframes pulse-amber-anim {
          0% { box-shadow: 0 0 0 0 rgba(224, 159, 62, 0.7); }
          70% { box-shadow: 0 0 0 7px rgba(224, 159, 62, 0); }
          100% { box-shadow: 0 0 0 0 rgba(224, 159, 62, 0); }
        }
        .pulse-amber {
          box-shadow: 0 0 0 0 rgba(224, 159, 62, 0.6);
          animation: pulse-amber-anim 2s infinite;
        }

        @keyframes pulse-teal-anim {
          0% { box-shadow: 0 0 0 0 rgba(42, 157, 143, 0.7); }
          70% { box-shadow: 0 0 0 7px rgba(42, 157, 143, 0); }
          100% { box-shadow: 0 0 0 0 rgba(42, 157, 143, 0); }
        }
        .pulse-teal {
          box-shadow: 0 0 0 0 rgba(42, 157, 143, 0.7);
          animation: pulse-teal-anim 2s infinite;
        }

        @keyframes pulse-red-anim {
          0% { box-shadow: 0 0 0 0 rgba(229, 72, 77, 0.75); }
          70% { box-shadow: 0 0 0 7px rgba(229, 72, 77, 0); }
          100% { box-shadow: 0 0 0 0 rgba(229, 72, 77, 0); }
        }
        .pulse-red {
          box-shadow: 0 0 0 0 rgba(229, 72, 77, 0.7);
          animation: pulse-red-anim 1.8s infinite;
        }
      `}</style>

      {/* BEGIN: Background Layer (Underwater Cavern Image with Balanced Scrim) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" data-purpose="sonar-backdrop">
        {/* Full-Bleed Underwater Cavern Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDUtIk5NQgsZH92UBrao7zA6KjlpiovPmFvLE2T_STJ7bS7EPCX-Nf0kIxX2b5PKoSl6ZXU5ygH7aYvYgSxA_dputMip8Nyk4mmLRugs9w50JqaIlGb5ccOlP0Wdl4US6w7EowC-PWeSeox2YZaSvoCMb-VdC0MODRICXwoFrViIDkldOUFwlRgkUQxhfqHxeJZ0IHlRHgs5_HadBn-5XE2H71Wlj5CCil_t553ZoaxlIL2olL0reljsmNMQLKhH4jcAU')" }}
        />
        
        {/* Shimmering Caustic Light Sweep / Underwater Sunbeams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-32 left-1/4 w-[55vw] h-[130vh] bg-gradient-to-b from-[#3abdb0]/20 via-[#2A9D8F]/10 to-transparent blur-3xl transform -rotate-12 animate-caustics origin-top"></div>
          <div className="absolute -top-20 left-1/3 w-[30vw] h-[120vh] bg-gradient-to-b from-white/10 via-[#3abdb0]/10 to-transparent blur-2xl transform -rotate-6 animate-caustics origin-top" style={{ animationDuration: '18s', animationDelay: '-4s' }}></div>
        </div>

        {/* Floating Bioluminescent Deep-Sea Particles (CSS Keyframe Animated) */}
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

        {/* Balanced Tactical Dark Scrim & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b131a]/85 via-[#0b131a]/60 via-60% to-[#0b131a]/65"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b131a]/90 via-transparent via-50% to-[#0b131a]/80"></div>
        
        {/* Technical Cartographic Grid Overlay */}
        <div className="absolute inset-0 scanline-grid opacity-20"></div>
      </div>
      {/* END: Background Layer */}

      {/* BEGIN: TopHeader */}
      <header className="relative z-30 border-b border-[#2A3B48]/80 bg-[#0F1B24]/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-colors" data-purpose="tactical-top-navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Sector Telemetry */}
          <div className="flex items-center space-x-4">
            <button onClick={() => handleTabClick('overview', 'overview')} className="flex items-center space-x-3 group text-left" title="Samudra-Rakshak Strategic Console">
              <div className="w-7 h-7 rounded-[3px] bg-[#1a2e3f] border border-[#2A3B48] flex items-center justify-center text-[#2A9D8F] group-hover:border-[#2A9D8F] group-hover:shadow-[0_0_12px_rgba(42,157,143,0.35)] transition-all">
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
                  <span className="text-sm font-bold tracking-wider uppercase text-[#E6EDF2] font-mono group-hover:text-white transition-colors" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    SAMUDRA-RAKSHAK
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>
                </div>
                <div className="text-[10px] font-mono text-[#627685] tracking-tight uppercase" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  // SAGAR SURAKSHA TACTICAL • INDIA
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Menu with Interactive Slider Indicator */}
          <nav 
            ref={navContainerRef}
            className="relative hidden md:flex items-center bg-[#0a1219]/70 border border-[#2A3B48] p-1 rounded-[4px] shadow-inner" 
            data-purpose="cursor-tracking-navigation" 
            id="interactive-nav-container"
          >
            {/* The Floating Sliding Capsule Indicator */}
            <div 
              ref={sliderRef}
              className="absolute top-1 bottom-1 rounded-[3px] bg-[#1a2e3f] border border-[#2A9D8F]/40 pointer-events-none shadow-sm transition-all" 
              id="nav-slider" 
              style={{ left: '4px', width: '86px' }}
            >
              <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#2A9D8F] shadow-[0_0_8px_#2A9D8F]"></div>
            </div>

            {/* Individual Nav Tabs */}
            <button 
              className="nav-tab relative z-10 px-3.5 py-1.5 text-xs font-mono font-medium transition-colors text-[#E6EDF2] cursor-pointer hover:text-white" 
              data-active={activeTabKey === 'overview'} 
              data-key="overview"
              onClick={() => handleTabClick('overview', 'overview')}
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Overview
            </button>
            <button 
              className="nav-tab relative z-10 px-3.5 py-1.5 text-xs font-mono font-medium transition-colors text-[#93A4B1] hover:text-[#E6EDF2] cursor-pointer flex items-center gap-1.5" 
              data-active={activeTabKey === 'map'} 
              data-key="map"
              onClick={() => handleTabClick('map', 'map')}
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <svg className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" x2="8" y1="2" y2="18"></line>
                <line x1="16" x2="16" y1="6" y2="22"></line>
              </svg>
              Geospatial Map
            </button>
            <button 
              className="nav-tab relative z-10 px-3.5 py-1.5 text-xs font-mono font-medium transition-colors text-[#93A4B1] hover:text-[#E6EDF2] cursor-pointer flex items-center gap-1.5" 
              data-active={activeTabKey === 'incidents'} 
              data-key="incidents"
              onClick={() => handleTabClick('incidents', 'incidents')}
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <svg className="w-3.5 h-3.5 opacity-70 text-[#E09F3E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" x2="12" y1="9" y2="13"></line>
                <line x1="12" x2="12.01" y1="17" y2="17"></line>
              </svg>
              Marine Incidents
            </button>
            <button 
              className="nav-tab relative z-10 px-3.5 py-1.5 text-xs font-mono font-medium transition-colors text-[#93A4B1] hover:text-[#E6EDF2] cursor-pointer flex items-center gap-1.5" 
              data-active={activeTabKey === 'feed'} 
              data-key="feed"
              onClick={() => handleTabClick('feed', 'feed')}
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M12 2v4m0 12v4M2 12h4m12 0h4"></path>
              </svg>
              Tactical Feed
            </button>
            <button 
              className="nav-tab relative z-10 px-3.5 py-1.5 text-xs font-mono font-medium transition-colors text-[#93A4B1] hover:text-[#E6EDF2] cursor-pointer flex items-center gap-1.5" 
              data-active={activeTabKey === 'analysis'} 
              data-key="analysis"
              onClick={() => handleTabClick('analysis', 'analysis')}
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <svg className="w-3.5 h-3.5 opacity-70 text-[#2A9D8F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a10 10 0 0 1 10 10"></path>
                <path d="M12 6a6 6 0 0 1 6 6"></path>
              </svg>
              Sonar Analysis
            </button>
          </nav>

          {/* Right Operator Authentication Telemetry */}
          <div className="flex items-center space-x-3">
            <div className="hidden xl:flex flex-col text-right font-mono p-1 rounded transition-all hover:bg-[#142330] cursor-default group" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              <div className="text-[11px] font-semibold text-[#E09F3E] tracking-tight group-hover:text-amber-300 group-hover:drop-shadow-[0_0_6px_rgba(224,159,62,0.4)] transition">
                {operator?.callSign || 'IN-SS-09'}
              </div>
              <div className="text-[9px] text-[#627685] group-hover:text-[#93A4B1] transition">
                ENCRYPTED AUTH: AES-GCM
              </div>
            </div>
            <div className="h-6 w-[1px] bg-[#2A3B48] hidden sm:block"></div>
            <button className="h-8 px-2.5 bg-[#142330] hover:bg-[#1a2e3f] text-[#E6EDF2] border border-[#2A3B48] hover:border-[#2A9D8F]/60 rounded-[3px] flex items-center gap-2 font-mono text-xs transition duration-150 active:scale-95 shadow-sm group" title="Terminal Connection Active" type="button" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A9D8F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2A9D8F]"></span>
              </span>
              <span className="hidden sm:inline text-xs text-[#93A4B1] group-hover:text-[#E6EDF2] transition">COMMS:</span>
              <span className="text-xs text-[#E6EDF2] font-bold group-hover:text-[#3abdb0] transition">ONLINE</span>
            </button>
            
            {/* Quick Terminal Action / Logout */}
            <button 
              onClick={() => onSignOut && onSignOut()}
              className="w-8 h-8 rounded-[3px] bg-[#142330] hover:bg-[#1a2e3f] hover:border-[#627685] border border-[#2A3B48] flex items-center justify-center text-[#93A4B1] hover:text-[#E6EDF2] transition active:scale-95 cursor-pointer" 
              title="Operator Session / Terminal Switch" 
              type="button"
            >
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* END: TopHeader */}

      {/* BEGIN: HeroMain */}
      <main className="relative z-10 flex-1 flex items-center py-10 lg:py-16 px-4 lg:px-8" data-purpose="hero-tactical-dashboard">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Operations Narrative & Command Callouts */}
          <section className="lg:col-span-7 space-y-6" data-purpose="hero-copy-and-actions">
            
            {/* Tactical Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#142330]/90 border border-[#2A3B48] hover:border-[#E09F3E]/50 transition rounded-[3px] text-xs font-mono text-[#E6EDF2] tracking-wide shadow-sm cursor-default" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
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

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#E6EDF2] leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Read the ocean before you sail into it.
            </h1>

            {/* Explanatory Technical Body Text */}
            <p className="text-base sm:text-lg text-[#93A4B1] leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              Real-time navigational intelligence, synthetic aperture radar feeds, bathymetric tracking, and automated hazard interception engineered specifically for the Indian maritime corridor.
            </p>

            {/* Command Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button 
                onClick={() => onNavigate && onNavigate('map')}
                className="cta-sheen-wrapper group px-5 py-2.5 rounded-[3px] bg-[#E09F3E] hover:bg-[#cca42b] text-[#0a1219] font-medium text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 transition-all duration-150 transform active:scale-95 hover:-translate-y-0.5 cursor-pointer" 
                type="button"
              >
                <span className="font-semibold">Open live chart</span>
                <svg className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button 
                onClick={() => onNavigate && onNavigate('feed')}
                className="group px-5 py-2.5 rounded-[3px] bg-[#142330] hover:bg-[#1a2e3f] border border-[#2A3B48] hover:border-[#2A9D8F] text-[#E6EDF2] hover:text-white font-medium text-sm flex items-center gap-2.5 transition-all duration-150 transform active:scale-95 hover:-translate-y-0.5 shadow-sm hover:shadow-[0_0_16px_rgba(42,157,143,0.25)] cursor-pointer" 
                type="button"
              >
                <svg className="w-4 h-4 text-[#2A9D8F] group-hover:scale-110 group-hover:text-[#3abdb0] transition-all" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M12 3a9 9 0 0 1 9 9"></path>
                  <path d="M12 7a5 5 0 0 1 5 5"></path>
                </svg>
                <span>View the feed</span>
              </button>
            </div>

            {/* Telemetry Synchronicity Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#93A4B1] border-t border-[#2A3B48]/60" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
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
                <span className="text-[#E6EDF2] font-medium">SW MONSOON REGIME</span>
              </div>
            </div>
          </section>

          {/* Right Column: DebrisSense AI HUD Component with Interactive Tilt */}
          <section className="lg:col-span-5" data-purpose="hud-debrissense-panel" style={{ perspective: '1000px' }}>
            <div 
              ref={hudCardRef}
              onMouseMove={handleHudMouseMove}
              onMouseLeave={handleHudMouseLeave}
              className="operational-card p-6 shadow-2xl relative overflow-hidden group/hud cursor-crosshair" 
              id="tactical-hud-card"
            >
              {/* Subtle sonar pulse ambient in card background */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-[#2A9D8F]/15 pointer-events-none group-hover/hud:border-[#2A9D8F]/30 transition-colors"></div>
              <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full border border-[#2A9D8F]/5 pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#2A3B48]/70 relative z-10">
                <div className="flex items-center space-x-3">
                  {/* Sonar Badge with Concentric Pulse & Rotating Sweep */}
                  <div className="relative w-10 h-10 rounded-[3px] bg-[#0a1219] border border-[#2A9D8F]/50 flex items-center justify-center text-[#2A9D8F] shadow-inner overflow-hidden">
                    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    {/* Sweeping Sonar Line Indicator */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-radar-sweep">
                      <div className="w-1/2 h-[1.5px] bg-gradient-to-r from-[#2A9D8F]/10 via-[#3abdb0] to-transparent ml-auto origin-left"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#E6EDF2] leading-tight group-hover/hud:text-white transition-colors">DebrisSense AI</h2>
                    <p className="text-[10px] font-mono tracking-wider text-[#E09F3E] uppercase" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>NEURAL BATHYMETRIC SUITE</p>
                  </div>
                </div>

                {/* Active Sweep Badge with Expanding Radar Ring */}
                <div className="relative px-2.5 py-1 bg-[#0a1219] border border-[#2A9D8F]/50 text-[#2A9D8F] text-[11px] font-mono rounded-[3px] flex items-center gap-2 overflow-hidden shadow-sm" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                  <div className="relative flex items-center justify-center w-2 h-2">
                    <span className="absolute w-2 h-2 rounded-full bg-[#2A9D8F]/60 animate-radar-ring"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F]"></span>
                  </div>
                  <span className="font-bold tracking-tight text-[#3abdb0]">ACTIVE SWEEP</span>
                </div>
              </div>

              {/* Body Description */}
              <p className="text-xs text-[#93A4B1] leading-relaxed font-mono mb-5 relative z-10" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                DebrisSense AI scans your voyage path continuously, auto-detecting drifting debris, lost containers, and obstruction hazards — flagged the moment sensors pick them up.
              </p>

              {/* Tactical Telemetry & Discrimination Bar */}
              <div className="bg-[#0a1219]/80 p-3.5 rounded-[3px] border border-[#2A3B48] space-y-3 font-mono mb-5 relative z-10 transition-colors group-hover/hud:border-[#2A9D8F]/30" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#627685] text-[11px] uppercase tracking-wide">TARGET DISCRIMINATOR</span>
                  <span className="text-[#2A9D8F] font-bold text-xs tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>
                    CONFIDENCE 99.4%
                  </span>
                </div>

                {/* Progress Meter with Continuous Laser Shimmer */}
                <div className="relative w-full bg-[#0F1B24] h-2 rounded-[2px] overflow-hidden p-[1px] border border-[#2A3B48]">
                  <div className="relative bg-gradient-to-r from-[#2A9D8F] to-[#E09F3E] h-full rounded-[1px] overflow-hidden" style={{ width: '99.4%' }}>
                    {/* Laser Glint */}
                    <div className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-laser"></div>
                  </div>
                </div>

                {/* Sensor Evaluation Status Row with Dynamic Millisecond Jitter */}
                <div className="flex justify-between items-center pt-1 text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#E09F3E]">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                      <line x1="12" x2="12" y1="9" y2="13"></line>
                      <line x1="12" x2="12.01" y1="17" y2="17"></line>
                    </svg>
                    <span>Sector 04-W • 0 False Positives</span>
                  </div>
                  <span className="text-[#627685] font-mono flex items-center gap-1" id="reeval-timer-container">
                    <span>RE-EVAL</span>
                    <span className="text-[#2A9D8F] font-bold" id="reeval-display">{reevalTime}</span>
                  </span>
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-1 text-[#93A4B1] relative z-10" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] pulse-teal"></span>
                  <span className="text-[#E6EDF2]">Onboard AI</span>
                  <span className="text-[#627685]">•</span>
                  <span className="text-[#627685] hidden sm:inline">Real-time hazard flagging</span>
                </div>
                <button 
                  onClick={() => onNavigate && onNavigate('analysis')}
                  className="text-[#2A9D8F] hover:text-[#3abdb0] inline-flex items-center gap-1 transition-all duration-150 transform hover:translate-x-1 cursor-pointer bg-transparent border-0 p-0"
                >
                  <span>Launch Sonar Suite</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                  </svg>
                </button>
              </div>

            </div>
          </section>

        </div>
      </main>
      {/* END: HeroMain */}

      {/* BEGIN: BottomInformationTickers */}
      <footer className="relative z-30 border-t border-[#2A3B48]/80 bg-[#0a1219] text-[#93A4B1] font-mono text-xs select-none" data-purpose="telemetry-tickers" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
        
        {/* Weather & Oceanographic Sensor Strip with Continuous Marquee & Pause on Hover */}
        <div className="px-4 lg:px-8 py-2 border-b border-[#2A3B48]/50 flex items-center text-[11px] overflow-hidden whitespace-nowrap">
          {/* Label */}
          <div className="flex items-center space-x-2 mr-4 text-[#E6EDF2] shrink-0 font-semibold uppercase tracking-wider bg-[#0a1219] z-10 pr-2">
            <span className="w-2 h-2 rounded-full bg-[#E09F3E] pulse-amber"></span>
            <span>WEATHER — INDIA</span>
            <span className="text-[#2A3B48]">|</span>
          </div>

          {/* Infinite Scrolling Weather Marquee Track */}
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

              {/* Duplicate set for seamless continuous loop */}
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
          {/* Fixed Status Badge */}
          <div className="flex items-center space-x-2 shrink-0 pr-3 z-10 bg-[#0F1B24] shadow-lg text-[11px] font-bold text-[#E5484D] tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5484D] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5484D] pulse-red"></span>
            </span>
            <span>LIVE NEWS</span>
            <span className="text-[#2A3B48]">|</span>
          </div>

          {/* Infinite Marquee Track with Beacons */}
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
      {/* END: BottomInformationTickers */}

    </div>
  );
}

export default SagarSurakshaOverviewPage;
