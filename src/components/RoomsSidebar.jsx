import React from 'react';
import { Smile, Pizza, Car, Flame, Plus, DoorOpen, MapPin, Rocket, Sparkles } from 'lucide-react';

const RoomsSidebar = ({ rooms, isMobile = false }) => {
  
  // Upgraded icons with thicker strokes to match the comic vibe
  const getIcon = (type, isActive) => {
    const iconColor = isActive ? "text-white" : "text-[#1e3a8a]";
    switch(type) {
      case 'smile': return <Smile size={24} strokeWidth={3} className={iconColor} />;
      case 'pizza': return <Pizza size={24} strokeWidth={3} className={iconColor} />;
      case 'car': return <Car size={24} strokeWidth={3} className={iconColor} />;
      case 'flame': return <Flame size={24} strokeWidth={3} className={iconColor} />;
      default: return <MapPin size={24} strokeWidth={3} className={iconColor} />;
    }
  };

  return (
    <div className={`relative bg-white comic-border rounded-[2rem] p-5 h-full flex flex-col z-10 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/comic-bg.png')]
      ${isMobile ? 'shadow-none rotate-0' : 'comic-shadow-sm rotate-1'}`}>
      
      {/* --- DORAEMON COMIC THEME CSS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700;900&display=swap');
        
        .comic-border { border: 4px solid #1e3a8a; }
        .comic-shadow-sm { box-shadow: 4px 4px 0px 0px #1e3a8a; }
        .comic-shadow-btn { box-shadow: 3px 3px 0px 0px #1e3a8a; }

        .bg-halftone-rooms {
          background-image: radial-gradient(#1e3a8a 1px, transparent 1px);
          background-size: 15px 15px;
          opacity: 0.05;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FF69B4; border: 2px solid #1e3a8a; border-radius: 10px; }

        @keyframes door-glow {
          0%, 100% { box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5); }
          50% { box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.9); }
        }
        .animate-door-glow { animation: door-glow 2s infinite; }
      `}</style>

      <div className="absolute inset-0 bg-halftone-rooms pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col items-center mb-6 shrink-0">
        
        <div className="absolute -top-3 -right-2 bg-[#00AEEF] comic-border rounded-xl p-2 rotate-[15deg] shadow-[2px_2px_0px_#1e3a8a]">
          <DoorOpen className="w-6 h-6 text-white" strokeWidth={3} />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tight text-[#1e3a8a] bg-[#FFD166] px-6 py-2 rounded-2xl comic-border comic-shadow-sm transform -rotate-2 w-full text-center">
          Locations 🗺️
        </h2>
        
        <div className="mt-3 bg-white comic-border px-3 py-1 rounded-full text-xs font-black text-[#FF3366] flex items-center gap-2 transform rotate-1 shadow-[2px_2px_0_0_#1e3a8a]">
          <Sparkles className="w-3 h-3" strokeWidth={3} />
          Choose a Timeline
        </div>
      </div>

      <div className="relative z-10 space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar pb-2">
        {rooms.map((room) => (
          <button 
            key={room.id}
            className={`group w-full flex items-center gap-4 px-4 py-3 rounded-2xl comic-border transition-all duration-300 relative overflow-hidden
              ${room.active 
                ? 'bg-[#FF69B4] text-white shadow-none translate-x-1 translate-y-1 animate-door-glow' 
                : 'bg-[#E0F2FE] text-[#1e3a8a] comic-shadow-btn hover:-translate-y-1 hover:bg-[#FFD166]'
              }`}
          >
            {room.active && (
              <div className="absolute inset-y-0 right-0 w-1/3 bg-white/20 skew-x-12 transform origin-right pointer-events-none"></div>
            )}

            <div className={`p-2 rounded-xl border-[3px] border-[#1e3a8a] shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-6
              ${room.active ? 'bg-[#FF3366] shadow-inner' : 'bg-white shadow-[2px_2px_0_0_#1e3a8a]'}
            `}>
              {getIcon(room.iconType, room.active)}
            </div>
            
            <div className="flex flex-col items-start text-left flex-1 overflow-hidden">
              <span className="font-black text-[16px] uppercase tracking-tight truncate w-full leading-tight">
                {room.name}
              </span>
              {room.active ? (
                <span className="text-[10px] font-black bg-white text-[#FF69B4] px-2 py-0.5 rounded-md border-2 border-[#1e3a8a] mt-1 shadow-[1px_1px_0_0_#1e3a8a]">
                  📍 YOU ARE HERE
                </span>
              ) : (
                <span className="text-[10px] font-bold text-[#1e3a8a]/60 uppercase mt-1">
                  Tap to Jump ⚡
                </span>
              )}
            </div>

          </button>
        ))}
      </div>

      <div className="relative z-10 shrink-0 pt-4 mt-2 border-t-4 border-dashed border-[#1e3a8a]/20">
        <button className="group w-full bg-[#00AEEF] text-white font-black text-lg py-4 rounded-2xl comic-border comic-shadow-btn hover:bg-[#0096ce] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all flex items-center justify-center gap-3 relative overflow-hidden">
          
          <div className="absolute top-0 -left-full w-1/2 h-full bg-white/20 skew-x-[45deg] group-hover:animate-[shine_0.6s_ease-in-out] pointer-events-none"></div>
          <style>{`@keyframes shine { 100% { left: 200%; } }`}</style>

          <span className="transform group-hover:-rotate-3 transition-transform">NEW DOOR</span> 
          <div className="bg-white text-[#1e3a8a] rounded-full p-1 comic-border border-2 group-hover:rotate-90 transition-transform duration-300">
            <Plus size={20} strokeWidth={4} />
          </div>
        </button>
      </div>

    </div>
  );
};

export default RoomsSidebar;