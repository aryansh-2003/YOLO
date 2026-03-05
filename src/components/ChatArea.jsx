import React, { useRef, useEffect, useState } from 'react';
import { Send, Music, Flame, Menu, Users } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import logo from '../../public/logo.png'

const ChatArea = ({ 
  messages, 
  inputText, 
  setInputText, 
  handleSend, 
  onOpenRooms, 
  onOpenLegends 
}) => {
  const scrollContainerRef = useRef(null);
  const [isOpen , setIsOpen] = useState(false)

  const handleAdd = (emoji) => {
    console.log(emoji)
    setInputText(prev => prev+emoji.emoji)
  }

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth' 
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Top Status Pills (Floating) */}
      <div className="absolute top-14 md:top-0 left-0 right-0 flex justify-center gap-4 z-20 pointer-events-none">
        <div className="bg-black text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md border-2 border-black pointer-events-auto">
          <Flame size={14} className="text-[#FCD34D]" fill="#FCD34D" /> Trending
        </div>
        <div className="bg-[#FCD34D] text-black px-4 py-1 rounded-full text-xs font-bold border-2 border-black shadow-md pointer-events-auto">
          24/hr Online
        </div>
      </div>

      {/* --- MOBILE HEADER (Visible only on small screens) --- */}
      <div className="md:hidden flex justify-between items-center p-4 pb-2 shrink-0 bg-[#FFFDF5] z-30">
        <button onClick={onOpenRooms} className="bg-white p-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
          <Menu size={24} />
        </button>
        <img className='w-[30%]' src={logo}/>
        {/* <span className="font-black italic text-xl"></span> */}
        <button onClick={onOpenLegends} className="bg-[#FCD34D] p-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
          <Users size={24} />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 flex flex-col pt-4 md:pt-10 min-h-0">
        {/* 3. Change: Attached the ref here to the overflow-y-auto div */}
        <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto space-y-6 px-4 md:pr-2 pb-4 custom-scrollbar"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 animate-pop-in ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className="flex-shrink-0 flex flex-col items-center gap-1 mt-auto">
                 <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] object-contain">
                     <img src={msg.avatar} alt="" className="w-[80%]  object-" />
                 </div>
              </div>

              {/* Bubble */}
              <div className={`flex flex-col max-w-[80%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider px-1">
                    {msg.user}
                </span>
                
                <div className={`p-4 rounded-2xl border-2 border-black relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  ${msg.isMe 
                    ? 'bg-[#2563EB] text-white rounded-br-none' 
                    : 'bg-[#FCD34D] text-black rounded-bl-none'
                  }`}>
                  
                  <p className="font-bold text-sm leading-relaxed">
                    {msg.text}
                  </p>
                  
                  {msg.image && (
                    <div className="rounded-xl overflow-hidden border-2 border-black mt-3">
                      <img src={msg.image} alt="attached" className="w-full max-h-40 object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Removed the empty div ref here as it's no longer needed */}
        </div>
      </div>

      {/* Input Area */}
      <div className="mt-2 shrink-0 p-4 md:p-0">
         <div className="bg-black text-white px-6 py-2 rounded-t-2xl mx-2 md:mx-4 flex justify-between items-center shadow-[4px_0px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2 font-black italic text-sm md:text-lg">
            JUMP IN! <span className="not-italic">🚀</span>
          </div>
          <div className="text-[10px] text-gray-400 font-mono hidden sm:flex items-center gap-1">
              <Music size={12} /> Lofi Beats...
          </div>
        </div>

        <div className="relative -mt-1 flex flex-row gap-2">
          <div className='w-[25%] lg:w-[15%]'>
            <button onClick={() => setIsOpen(!isOpen)}>
            <img src={"https://static.vecteezy.com/system/resources/thumbnails/029/167/653/small/smiling-face-with-three-hearts-3d-emoji-icon-in-transparant-background-png.png"} alt="" />
            </button>
            <div className={`w-full absolute bottom-18 ${isOpen ? 'visible' : 'hidden'}`}>
                <EmojiPicker onEmojiClick={(emojiObject) => handleAdd(emojiObject)} />
            </div>
          </div>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type some chaos..." 
            className="w-full bg-white border-4 border-black rounded-full rounded-tl-none px-6 py-4 font-bold text-lg outline-none focus:bg-blue-50 placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors"
          />
          
          <button 
            onClick={handleSend}
            className="bg-[#FCD34D] w-16 h-16 shrink-0 rounded-full border-4 border-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            
            <Send size={28} strokeWidth={3} className="ml-[-2px] mt-[2px]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatArea;