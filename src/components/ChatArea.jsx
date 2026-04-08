import React, { useRef, useEffect, useState, useContext } from 'react';
import { Send, Zap, DoorOpen, Users, MoreVertical, BellRing, SmilePlus, Image as ImageIcon } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import logo from '/logo.png'; // Assuming you have a cool logo here
import { useNavigate } from 'react-router-dom';
import userContext from '@/context/userContext';
import {ComingSoonPopup} from '../components/PopUp'

const ChatArea = ({ 
  messages, 
  inputText, 
  setInputText, 
  handleSend, 
  onOpenRooms, 
  onOpenLegends 
}) => {
  const scrollContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopUpOpen, setisPopUpOpen] = useState(false);
  const[activeMenuId, setActiveMenuId] = useState(null);
  const navigate = useNavigate();
  const { setUserData } = useContext(userContext);

  const handleAdd = (emoji) => {
    setInputText(prev => prev + emoji.emoji);
  };

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

  useEffect(() => {
    const handleGlobalClick = () => setActiveMenuId(null);
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  },[]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleMenuAction = (e, action, msg) => {
    e.stopPropagation();
    setisPopUpOpen(true)
    // if(action === "Personal Message" ){
    //   setUserData(msg);
    //   navigate('/dm');
    // }
    // console.log(`Action: ${action}`, msg.username);
    setActiveMenuId(null);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full w-full relative bg-[#E0F2FE] font-dora overflow-hidden z-10">
        <ComingSoonPopup isOpen={isPopUpOpen} onClose={() => setisPopUpOpen(false)}/>
      {/* --- EXTRA DORAEMON STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Fredoka:wght@400;600;700&display=swap');
        
        .font-dora { font-family: 'Fredoka', sans-serif; }
        .font-comic { font-family: 'Bangers', cursive; letter-spacing: 1px; }

        .comic-border { border: 4px solid #1e3a8a; }
        .comic-shadow { box-shadow: 6px 6px 0px 0px #1e3a8a; }
        .comic-shadow-sm { box-shadow: 4px 4px 0px 0px #1e3a8a; }
        
        .chat-scroll::-webkit-scrollbar { width: 10px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #00AEEF; border: 2px solid #1e3a8a; border-radius: 20px; }

        @keyframes popIn {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .msg-pop { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        
        .bg-comic-dots {
          background-image: radial-gradient(#1e3a8a 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.08;
        }
      `}</style>

      {/* Comic Halftone Background */}
      <div className="absolute inset-0 bg-comic-dots pointer-events-none z-0"></div>

      {/* --- FLOATING TOP BADGES --- */}
      <div className="absolute top-16 md:top-4 left-0 right-0 flex justify-center gap-4 z-20 pointer-events-none">
        <div className="bg-[#FF3366] text-white px-5 py-1.5 rounded-full text-sm font-black flex items-center gap-2 comic-border comic-shadow-sm pointer-events-auto transform -rotate-2">
          <Zap size={16} fill="white" /> Time Patrol Secure
        </div>
        <div className="bg-[#FFD166] text-[#1e3a8a] px-5 py-1.5 rounded-full text-sm font-black comic-border comic-shadow-sm pointer-events-auto transform rotate-2">
          Timeline: 22nd Century
        </div>
      </div>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex justify-between items-center p-4 pb-2 shrink-0 bg-white comic-border border-x-0 border-t-0 z-30 shadow-[0_4px_0_0_#1e3a8a]">
        <button onClick={onOpenRooms} className="bg-[#FF69B4] text-white p-2.5 rounded-xl comic-border shadow-[3px_3px_0_0_#1e3a8a] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
          <DoorOpen size={26} strokeWidth={3} />
        </button>
        <img className='h-10 object-contain' src={logo} alt="Logo"/>
        <button onClick={onOpenLegends} className="bg-[#FFD166] text-[#1e3a8a] p-2.5 rounded-xl comic-border shadow-[3px_3px_0_0_#1e3a8a] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
          <Users size={26} strokeWidth={3} />
        </button>
      </div>

      {/* --- CHAT MESSAGES AREA --- */}
      <div className="flex-1 flex flex-col pt-16 md:pt-20 min-h-0 relative z-10">
        <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto space-y-8 px-4 md:px-8 pb-6 chat-scroll"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`msg-pop flex gap-4 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className="flex-shrink-0 flex flex-col items-center mt-auto z-10">
                 <div className="w-14 h-14 rounded-full bg-white comic-border flex items-center justify-center text-xl comic-shadow-sm overflow-hidden">
                     <img src={msg.avatar} alt="avatar" className="w-[120%] h-[120%] object-cover" />
                 </div>
              </div>

              {/* Message Content */}
              <div className={`flex flex-col max-w-[75%] md:max-w-[65%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                
                {/* Username Label */}
                {!msg.isMe && (
                  <span className="text-[11px] font-black text-white bg-[#1e3a8a] px-3 py-0.5 rounded-t-lg border-2 border-b-0 border-[#1e3a8a] mb-[-2px] uppercase tracking-wider ml-4 z-0">
                    {msg.user}
                  </span>
                )}
                {msg.isMe && (
                   <span className="text-[11px] font-black text-[#1e3a8a] uppercase tracking-wider mr-2 mb-1">
                     YOU
                   </span>
                )}
                
                {/* Bubble */}
                <div className={`p-4 md:p-5 rounded-3xl comic-border relative comic-shadow group
                  ${msg.isMe 
                    ? 'bg-[#FFD166] text-[#1e3a8a] rounded-br-sm' 
                    : 'bg-white text-[#1e3a8a] rounded-tl-none'
                  }`}>
                  
                  {/* Context Menu Button */}
                  <button 
                    onClick={(e) => toggleMenu(e, msg.id)}
                    className={`absolute top-2 right-2 p-1.5 rounded-full hover:bg-black/10 transition-colors ${msg.isMe ? 'text-[#1e3a8a]' : 'text-gray-400 hover:text-[#1e3a8a]'}`}
                  >
                    <MoreVertical size={20} strokeWidth={3} />
                  </button>

                  {/* Context Menu Dropdown (Manga Action Style) */}
                  {activeMenuId === msg.id && (
                    <div className="absolute -top-35 -right-40 w-48 bg-white comic-border comic-shadow-sm rounded-xl overflow-hidden z-50 flex flex-col transform origin-top-right animate-in zoom-in-95 duration-100">
                      <button 
                        onClick={(e) => handleMenuAction(e, 'Report', msg)}
                        className="px-4 py-3 text-left font-black text-[#FF3366] hover:bg-red-50 border-b-2 border-[#1e3a8a] flex items-center gap-2"
                      >
                        🚨 Time Patrol!
                      </button>
                      <button 
                        onClick={(e) => handleMenuAction(e, 'Tag', msg)}
                        className="px-4 py-3 text-left font-black text-[#1e3a8a] hover:bg-gray-100 border-b-2 border-[#1e3a8a]"
                      >
                        @ Tag User
                      </button>
                      <button 
                        onClick={(e) => handleMenuAction(e, 'Personal Message', msg)}
                        className="px-4 py-3 text-left font-black text-[#1e3a8a] hover:bg-gray-100"
                      >
                        💬 Secret DM
                      </button>
                    </div>
                  )}

                  <p className="font-bold text-[16px] md:text-lg leading-snug break-words pr-4">
                    {msg.text}
                  </p>
                  
                  {msg.image && (
                    <div className="rounded-xl overflow-hidden comic-border mt-4 comic-shadow-sm">
                      <img src={msg.image} alt="attached" className="w-full max-h-48 object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}

                  {/* Comic Speech Bubble Tail */}
                  <div 
                    className={`absolute bottom-2 w-6 h-6 comic-border border-t-0 ${msg.isMe ? '-right-3 border-l-0 border-b-0 bg-[#FFD166] rounded-br-[20px]' : '-left-3 border-r-0 border-b-0 bg-white rounded-bl-[20px]'}`} 
                    style={{ 
                      clipPath: msg.isMe ? 'polygon(0 0, 100% 100%, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)', 
                      transform: msg.isMe ? 'rotate(-25deg)' : 'rotate(25deg)' 
                    }}>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- THE 4D POCKET INPUT AREA --- */}
      <div className="relative mt-auto shrink-0 z-40 bg-[#00AEEF] comic-border border-x-0 border-b-0 pt-8 pb-6 px-4 md:px-8">
        
        {/* Red Collar */}
        <div className="absolute top-0 left-0 w-full h-5 bg-[#FF3366] comic-border border-x-0 border-t-0 z-10"></div>
        
        {/* Golden Bell Overlay */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#FFD166] rounded-full comic-border comic-shadow-sm flex flex-col items-center justify-start pt-2.5 z-20 hover:animate-spin-slow cursor-pointer">
          <div className="w-10 h-1.5 bg-[#1e3a8a] rounded-full mb-1"></div>
          <div className="w-3 h-3 bg-[#1e3a8a] rounded-full"></div>
          <div className="w-1 h-3 bg-[#1e3a8a]"></div>
        </div>

        {/* The White Pocket Container */}
        <div className="relative max-w-5xl mx-auto mt-4 bg-white comic-border comic-shadow p-3 md:p-4 z-0 rounded-b-[80px] rounded-t-[20px] flex items-end gap-3 transition-all focus-within:bg-[#f8fafc]">
          
          {/* Emoji Picker Button & Pop-up */}
          <div className='relative'>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#FFD166] w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full comic-border flex items-center justify-center hover:scale-105 active:scale-95 transition-transform comic-shadow-sm"
            >
              {/* Dorayaki Icon / Fun Emoji toggle */}
              <span className="text-3xl">🥞</span>
            </button>

            {/* Emoji Picker Overlay */}
            {isOpen && (
              <div className="absolute bottom-[80px] left-0 z-50 comic-border rounded-2xl overflow-hidden comic-shadow animate-in slide-in-from-bottom-5">
                  <EmojiPicker 
                    onEmojiClick={(emojiObject) => {
                      handleAdd(emojiObject);
                      setIsOpen(false); // Auto close on select (optional)
                    }} 
                    theme="light"
                  />
              </div>
            )}
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            {/* Header label floating inside input */}
            <div className="absolute -top-3 left-6 bg-[#1e3a8a] text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-widest z-10 comic-border border-2">
              Reach into the pocket...
            </div>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..." 
              className="w-full bg-white comic-border rounded-[2rem] px-6 py-4 md:py-5 font-bold text-lg md:text-xl text-[#1e3a8a] outline-none placeholder:text-gray-400 focus:shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] transition-all"
            />
          </div>
          
          {/* Send Gadget Button */}
          <button 
            onClick={handleSend}
            className="group bg-[#FF3366] w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full comic-border flex items-center justify-center hover:bg-[#ff47a3] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all comic-shadow-sm"
          >
            <Send size={28} strokeWidth={3} className="text-white ml-[-2px] mt-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;