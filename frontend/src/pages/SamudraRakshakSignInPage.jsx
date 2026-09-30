import React, { useState } from 'react';

export function SamudraRakshakSignInPage({ onSignIn, healthData }) {
  const [operatorId, setOperatorId] = useState('OP-7049');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignIn) {
      onSignIn({
        email: operatorId.includes('@') ? operatorId : `${operatorId.toLowerCase()}@marine-survey.gov`,
        role: 'Authorized Marine Operator',
        callSign: 'IN-SS-09',
        station: 'Mandapam Deep-Sea Base',
        authMethod: 'Standard Authentication',
      });
    }
  };

  return (
    <div className="h-full w-full overflow-hidden select-none bg-[#0F1B24] text-[#E6EDF2] font-sans antialiased" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
      <style>{`
        input:focus {
          outline: none;
          border-color: #2A9D8F;
          box-shadow: 0 0 0 1px #2A9D8F;
        }
      `}</style>
      
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Sonar Underwater Backdrop */}
        <img 
          alt="Underwater cavern and sonar telemetry backdrop" 
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] pointer-events-none" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDUtIk5NQgsZH92UBrao7zA6KjlpiovPmFvLE2T_STJ7bS7EPCX-Nf0kIxX2b5PKoSl6ZXU5ygH7aYvYgSxA_dputMip8Nyk4mmLRugs9w50JqaIlGb5ccOlP0Wdl4US6w7EowC-PWeSeox2YZaSvoCMb-VdC0MODRICXwoFrViIDkldOUFwlRgkUQxhfqHxeJZ0IHlRHgs5_HadBn-5XE2H71Wlj5CCil_t553ZoaxlIL2olL0reljsmNMQLKhH4jcAU"
          onError={(e) => { e.currentTarget.src = '/tactical_underwater_backdrop.png'; }}
        />
        <div className="absolute inset-0 bg-[#0F1B24]/40 pointer-events-none"></div>
        
        <div className="relative z-10 flex h-full w-full">
          {/* Left Title Section */}
          <div className="flex-1 h-full relative flex flex-col justify-end p-12 pointer-events-none">
            <div className="max-w-xl pointer-events-auto">
              <h1 className="text-[32px] font-semibold text-[#E6EDF2] leading-tight tracking-[-0.01em] m-0 drop-shadow-sm">
                Samudra-Rakshak
              </h1>
              <p className="text-[15px] font-normal text-[#93A4B1] mt-2 mb-0 leading-normal drop-shadow-sm">
                Sonar debris detection and geotagging for marine operators
              </p>
            </div>
          </div>

          {/* Right Authentication Panel */}
          <div 
            className="w-full max-w-[480px] h-full flex flex-col justify-between px-12 py-10 overflow-y-auto" 
            style={{
              backgroundColor: 'rgba(15, 27, 36, 0.55)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderLeft: '1px solid rgba(42, 59, 72, 0.65)',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.35)'
            }}
          >
            <div className="h-6"></div>
            
            <div className="w-full max-w-[360px] mx-auto flex flex-col justify-center my-auto">
              <div className="mb-8">
                <h2 className="text-[28px] font-semibold text-[#E6EDF2] tracking-[-0.01em] leading-tight m-0">
                  Sign in
                </h2>
                <p className="text-[15px] text-[#93A4B1] mt-2 mb-0 font-normal">
                  Authorised operators only.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[13px] font-medium text-[#E6EDF2] mb-2" htmlFor="operator-id">
                    Operator ID or email
                  </label>
                  <input 
                    autoComplete="username" 
                    className="w-full h-[44px] px-3.5 bg-[#0F1B24]/80 border border-[#2A3B48] rounded-[3px] text-[15px] text-[#E6EDF2] placeholder-[#556775] transition-colors focus:border-[#2A9D8F]" 
                    id="operator-id" 
                    name="operator-id" 
                    placeholder="OP-7049 or name@marine-survey.gov" 
                    required 
                    type="text"
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#E6EDF2] mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input 
                      autoComplete="current-password" 
                      className="w-full h-[44px] pl-3.5 pr-16 bg-[#0F1B24]/80 border border-[#2A3B48] rounded-[3px] text-[15px] text-[#E6EDF2] placeholder-[#556775] transition-colors focus:border-[#2A9D8F]" 
                      id="password" 
                      name="password" 
                      required 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      className="absolute right-3 text-[13px] font-medium text-[#93A4B1] hover:text-[#E6EDF2] focus:outline-none focus:text-[#2A9D8F] cursor-pointer" 
                      id="toggle-password" 
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div className="pt-0.5">
                  <span className="text-[13px] text-[#93A4B1]">
                    Forgot password?{' '}
                    <a className="text-[#2A9D8F] hover:underline focus:outline-none focus:ring-1 focus:ring-[#2A9D8F] rounded-[2px]" href="#admin-contact">
                      Contact your administrator.
                    </a>
                  </span>
                </div>

                <div className="pt-2">
                  <button 
                    className="w-full h-[44px] bg-[#2A9D8F] hover:bg-[#258a7e] active:bg-[#1f7369] text-[#0A1A1E] font-semibold text-[15px] rounded-[3px] transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:ring-offset-2 focus:ring-offset-[#142330]" 
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <p className="text-[12px] text-[#93A4B1] leading-relaxed m-0">
                  By signing in you agree to the{' '}
                  <a className="underline text-[#93A4B1] hover:text-[#E6EDF2] focus:outline-none focus:text-[#2A9D8F]" href="#terms">
                    Terms of Use
                  </a>{' '}
                  and{' '}
                  <a className="underline text-[#93A4B1] hover:text-[#E6EDF2] focus:outline-none focus:text-[#2A9D8F]" href="#privacy">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </div>

            <div className="w-full flex items-center justify-between text-[13px] border-t border-[#2A3B48]/70 pt-4">
              <span className="font-mono text-[#93A4B1] text-[12px] tracking-wide" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                Version 1.0
              </span>
              <a className="text-[#2A9D8F] hover:underline text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-[#2A9D8F] rounded-[2px]" href="#docs">
                Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SamudraRakshakSignInPage;
