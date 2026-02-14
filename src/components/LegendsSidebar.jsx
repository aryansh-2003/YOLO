import React from 'react';
import { Smile, Ban } from 'lucide-react';

const LegendsSidebar = ({ legends, isMobile = false }) => {

  return (
    <div className={`bg-white border-2 border-black rounded-xl p-4 h-full flex flex-col 
      ${isMobile ? 'shadow-none rotate-0' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1'}`}>
      
      <h2 className="text-xl font-black uppercase tracking-tight mb-6 border-b-2 border-black pb-2 text-center shrink-0">
        Active Legends
      </h2>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {legends.length === 0 ? (
           <div className="text-center font-bold text-gray-400 italic mt-10">No legends online... yet.</div>
        ) : (
          legends.map((legend) => (
            <div key={legend?._id} className="relative group">
              <div className={`bg-white border-2 border-black rounded-2xl p-3 flex flex-col items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 `}>
                
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full border border-black bg-green-400`}></div>

                <div className="w-16 h-16 bg-[#FCD34D] rounded-full border-2 border-black flex items-center justify-center text-3xl shadow-sm">
                  
                </div>
                
                <div className="text-center">
                  <h3 className="font-black text-sm uppercase">{legend?.fullname}</h3>
                  <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-black text-[10px] font-bold bg-blue-300 `}>
                    <Smile size={10} />
                    Vibing
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LegendsSidebar;