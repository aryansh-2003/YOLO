import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const DMChatArea = ({ 
  selectedUser, 
  messages, 
  onSendMessage, 
  onBack, 
  isMobileView 
}) => {
  const [inputText, setInputText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);

  useEffect(() => {
    const closeMenus = () => {
        setActiveMenuId(null);
        setShowEmoji(false);
    }
    window.addEventListener('click', closeMenus);
    return () => window.removeEventListener('click', closeMenus);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendClick();
  };

  const handleSendClick = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
    setShowEmoji(false);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(prev => prev === id ? null : id);
  };

  const handleMenuAction = (e, action, msg) => {
    e.stopPropagation();
    console.log(`User: ${selectedUser.name}, Action: ${action}`, msg);
    setActiveMenuId(null);
  };

  // If no user is selected and we are on desktop, show placeholder
  if (!selectedUser) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#f0f0f0] pattern-dots hidden md:flex">
            <div className="text-center opacity-50">
                <h2 className="text-4xl font-black mb-2">PICK A CHAT</h2>
                <p className="font-bold">Select a user from the left to start chaos.</p>
            </div>
        </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-white relative w-full md:flex-1`}>
        
      <div className="p-4 flex justify-between items-center border-b-4 border-black bg-white z-10 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          
            <button 
              onClick={onBack} 
              className="p-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px]"
            >
              <ArrowLeft size={20} />
            </button>
          
          
          <img src={selectedUser?.avatar ? selectedUser?.avatar : "https://api.dicebear.com/7.x/avataaars/svg?seed=new"} alt="" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
          <div className='flex flex-col '>
          <span className='font-bold text-l'>{selectedUser?.fullname}</span>   
          <span className='text-sm'>@{selectedUser?.username}</span>   
          </div>       

          <div>
            <h2 className="font-black text-lg leading-none">{selectedUser.name}</h2>
            <span className={`text-xs font-bold uppercase tracking-widest ${selectedUser.online ? 'text-green-600' : 'text-gray-400'}`}>
                {selectedUser.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

       
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#fafafa] custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-[85%] md:max-w-[70%] group`}>
              
              {/* Message Bubble */}
              <div className={`p-4 pr-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-bold relative
                ${msg.isMe ? 'bg-[#2563EB] text-white rounded-br-none' : 'bg-white text-black rounded-bl-none'}`}>
                
                {msg.text}
                
                <div className={`text-[10px] mt-2 font-mono text-right opacity-70`}>
                    {msg.time}
                </div>

                <button 
                    onClick={(e) => toggleMenu(e, msg.id)}
                    className={`absolute top-1 right-1 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity
                    ${msg.isMe ? 'text-white hover:bg-white/20' : 'text-black hover:bg-black/10'}`}
                >
                    <MoreVertical size={14} />
                </button>
              </div>

              {activeMenuId === msg.id && (
                <div className={`absolute top-full mt-2 w-40 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg z-50 flex flex-col overflow-hidden
                      ${msg.isMe ? 'right-0' : 'left-0'}`}>
                  <button 
                    onClick={(e) => handleMenuAction(e, 'Report', msg)}
                    className="px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 border-b-2 border-gray-100"
                  >
                    1. Report 🚨
                  </button>
                  <button 
                    onClick={(e) => handleMenuAction(e, 'Tag', msg)}
                    className="px-4 py-2 text-left text-xs font-bold text-black hover:bg-gray-100 border-b-2 border-gray-100"
                  >
                    2. Tag @
                  </button>
                  <button 
                    onClick={(e) => handleMenuAction(e, 'Personal Message', msg)}
                    className="px-4 py-2 text-left text-xs font-bold text-black hover:bg-gray-100"
                  >
                    3. Message 💬
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t-4 border-black shrink-0">
        <div className="flex gap-2 relative">
            <button 
                onClick={(e) => { e.stopPropagation(); setShowEmoji(!showEmoji); }}
                className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-xl bg-[#FCD34D] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
            >
                😊
            </button>
            
            {showEmoji && (
                <div className="absolute bottom-16 left-0 z-50">
                    <EmojiPicker onEmojiClick={(emoji) => setInputText(prev => prev + emoji.emoji)} />
                </div>
            )}

            <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your chaos..."
                className="flex-1 border-2 border-black rounded-xl px-4 font-bold outline-none focus:bg-blue-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors"
            />
            <button 
                onClick={handleSendClick}
                className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(100,100,100,1)] hover:scale-105 active:scale-95 transition-transform"
            >
                <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default DMChatArea;