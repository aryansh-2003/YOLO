import React from 'react';
import { Smile, Ban, Radar, Sparkles, Wind } from 'lucide-react';

const LegendsSidebar = ({ legends, isMobile = false }) => {

  return (
    <div className={`relative bg-white comic-border rounded-[2rem] p-5 h-full flex flex-col z-10 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/comic-bg.png')]
      ${isMobile ? 'shadow-none' : 'comic-shadow-sm'}`}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700;900&display=swap');
        
        .comic-border { border: 4px solid #1e3a8a; }
        .comic-shadow-sm { box-shadow: 4px 4px 0px 0px #1e3a8a; }
        .comic-shadow-card { box-shadow: 3px 3px 0px 0px #1e3a8a; }

        .bg-halftone-legends {
          background-image: radial-gradient(#1e3a8a 1px, transparent 1px);
          background-size: 15px 15px;
          opacity: 0.05;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FFD166; border: 2px solid #1e3a8a; border-radius: 10px; }

        @keyframes pulse-radar {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(52, 211, 153, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
        }
        .animate-radar { animation: pulse-radar 2s infinite; }
      `}</style>

      <div className="absolute inset-0 bg-halftone-legends pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col items-center mb-6 shrink-0">
        
        <div className="absolute -top-3 -left-2 bg-[#FFD166] comic-border rounded-full p-2 rotate-[-15deg] shadow-[2px_2px_0px_#1e3a8a]">
          <Radar className="w-5 h-5 text-[#1e3a8a]" strokeWidth={3} />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tight text-white bg-[#FF3366] px-6 py-2 rounded-2xl comic-border comic-shadow-sm transform rotate-2 w-full text-center">
          The Gang 🐱
        </h2>
        
        <div className="mt-3 bg-[#E0F2FE] comic-border px-3 py-1 rounded-full text-xs font-bold text-[#1e3a8a] flex items-center gap-2 transform -rotate-1 shadow-[2px_2px_0_0_#1e3a8a]">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Time Patrol Radar Active
        </div>
      </div>

      <div className="relative z-10 space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar pb-4">
        {legends.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-center p-4 opacity-70">
             <Ban className="w-12 h-12 text-[#1e3a8a] mb-2 opacity-50" strokeWidth={2} />
             <p className="font-black text-xl text-[#1e3a8a] uppercase">Nobody here...</p>
             <p className="font-bold text-sm text-[#1e3a8a] mt-1">Did everyone take the Time Machine? 🕰️</p>
           </div>
        ) : (
          legends.map((legend, index) => {
            const userData = legend?.[1]?.userData;
            const fullname = userData?.fullname || 'Unknown Gadgeteer';
            const avatarUrl = userData?.avatar || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${fullname}`;
            
            const bgColors = ['bg-[#FFD166]', 'bg-[#FFB5A7]', 'bg-[#E0F2FE]'];
            const cardBg = bgColors[index % bgColors.length];

            return (
              <div key={userData?.id || index} className="relative group perspective-1000">
                
                <div className={`relative ${cardBg} comic-border rounded-2xl p-3 flex items-center gap-4 comic-shadow-card transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-none cursor-pointer overflow-hidden`}>
                  
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-white/20 skew-x-12 translate-x-4 group-hover:-translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>

                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#34D399] comic-border rounded-full animate-radar flex items-center justify-center z-10">
                    <Sparkles className="w-3 h-3 text-white" fill="white" />
                  </div>

                  <div className="w-16 h-16 bg-white rounded-full comic-border flex-shrink-0 flex items-center justify-center overflow-hidden shadow-inner relative z-10">
                    <img src={avatarUrl} alt={fullname} className="w-[120%] h-[120%] object-cover scale-110 mt-2" />
                  </div>
                  
                  <div className="flex flex-col flex-1 z-10">
                    <h3 className="font-black text-[15px] uppercase text-[#1e3a8a] tracking-tight leading-tight line-clamp-1">
                      {fullname}
                    </h3>
                    
                    <div className="mt-1.5 flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-lg comic-border text-[10px] font-black bg-white text-[#1e3a8a] shadow-[2px_2px_0_0_#1e3a8a]">
                      <Wind size={12} strokeWidth={3} className="text-[#00AEEF]" />
                      IN TIMELINE
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LegendsSidebar;