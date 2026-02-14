import React from 'react';
import { Smile, Pizza, Car, Flame, Plus } from 'lucide-react';

const RoomsSidebar = ({ rooms, isMobile = false }) => {
  
  const getIcon = (type) => {
    switch(type) {
      case 'smile': return <Smile size={20} />;
      case 'pizza': return <Pizza size={20} />;
      case 'car': return <Car size={20} />;
      case 'flame': return <Flame size={20} />;
      default: return <Smile size={20} />;
    }
  };

  return (
    <div className={`bg-white border-2 border-black rounded-xl p-4 h-full flex flex-col 
      ${isMobile ? 'shadow-none rotate-0' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1'}`}>
      
      <h2 className="text-xl font-black uppercase tracking-tight mb-4 border-b-2 border-black pb-2 text-center shrink-0">
        Rooms to Invade
      </h2>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {rooms.map((room) => (
          <button 
            key={room.id}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full border-2 border-black transition-all hover:-translate-y-1
              ${room.active 
                ? 'bg-[#FCD34D] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-white hover:bg-gray-50'
              }`}
          >
            <div className="bg-white/50 p-1 rounded-full border border-black/10 shrink-0">
              {getIcon(room.iconType)}
            </div>
            <span className="font-black text-sm truncate">{room.name}</span>
          </button>
        ))}
      </div>

      <button className="w-full mt-4 bg-[#FCD34D] text-black font-black py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2 shrink-0">
        NEW ROOM <Plus size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

export default RoomsSidebar;