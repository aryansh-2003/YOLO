import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Cloud,
  Navigation,
  Music,
  Heart,
  Gamepad2,
  BookOpen,
  Send,
  DoorOpen,
  BellRing,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import song from '../assets/doremon.mp3'

// --- DORAEMON MOCK DATA ---
const MOCK_CHARACTERS = [
  { name: "Nobita_007", color: "bg-[#FFD166]", text: "text-yellow-900", avatar: "Felix" },
  { name: "Gian_The_Boss", color: "bg-[#F4A261]", text: "text-orange-900", avatar: "Jack" },
  { name: "Suneo_Rich", color: "bg-[#2A9D8F]", text: "text-teal-900", avatar: "Aneka" },
  { name: "Shizuka_xoxo", color: "bg-[#FFB5A7]", text: "text-pink-900", avatar: "Jocelyn" },
  { name: "Doraemon", color: "bg-[#00AEEF]", text: "text-blue-900", avatar: "Cuddles" },
  { name: "Dorami_Cute", color: "bg-[#FFF3B0]", text: "text-yellow-800", avatar: "Molly" }
];

const MOCK_MESSAGES = [
  "DORAEMONNN!! Help me!! 😭",
  "Who wants to come to my concert today? 🎤",
  "My dad just bought me the newest video game! 🎮",
  "Let's go study together, Nobita-kun. 📚",
  "Where did my Dorayaki go?! 🥞",
  "Quick, take the Anywhere Door! 🚪",
  "I got a ZERO on my math test again... 📝",
  "Take this! Bamboo Copter! 🚁",
  "Suneo is showing off again... 🙄",
  "I'm going to the future! ⏱️"
];

const LandingPage = () => {
  // Initial messages
  const [messages, setMessages] = useState([
    { id: 1, name: "Doraemon", text: "Welcome to the 22nd Century Chat! 🐱🤖", avatarSeed: "Cuddles", bg: "bg-[#00AEEF]", textColor: "text-white" },
    { id: 2, name: "Nobita_007", text: "Wow, a new gadget?! Can I use it to finish my homework?", avatarSeed: "Felix", bg: "bg-[#FFD166]", textColor: "text-yellow-900" },
    { id: 3, name: "Shizuka_xoxo", text: "That sounds wonderful! Let's all chat nicely. 🌸", avatarSeed: "Jocelyn", bg: "bg-[#FFB5A7]", textColor: "text-pink-900" },
    { id: 4, name: "Gian_The_Boss", text: "HEY! ANYONE WHO IGNORES MY MESSAGES GETS BEAT UP! 😡", avatarSeed: "Jack", bg: "bg-[#F4A261]", textColor: "text-orange-900" },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Audio Toggle Handler
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      if (scrollHeight > clientHeight) {
        chatContainerRef.current.scrollTo({
          top: scrollHeight,
          behavior: 'smooth'
        });
      }
    }


    
  }, [messages]);

  // Simulate active chat
  useEffect(() => {
    const interval = setInterval(() => {
      const character = MOCK_CHARACTERS[Math.floor(Math.random() * MOCK_CHARACTERS.length)];
      const randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];

      const newMessage = {
        id: Date.now(),
        name: character.name,
        text: randomMsg,
        avatarSeed: character.avatar,
        bg: character.color,
        textColor: character.text
      };

      setMessages((prev) => {
        const updated = [...prev, newMessage];
        return updated.length > 50 ? updated.slice(updated.length - 50) : updated;
      });

    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMsg = {
      id: Date.now(),
      name: "YOU",
      text: inputValue,
      avatarSeed: "MyAvatar",
      bg: "bg-white",
      textColor: "text-black"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
      <div className="relative w-full min-h-screen bg-[#87CEEB] text-[#1e3a8a] font-sans overflow-hidden selection:bg-[#FFD166]">
      
      <audio 
        ref={audioRef} 
        src={song} 
        autoPlay
        loop 
      />

      {/* Floating Music Button */}
      <button 
        onClick={toggleAudio}
        className="fixed top-10 -right-0 z-50 flex h-14 w-14 items-center justify-center rounded-full comic-border bg-[#FF69B4] text-white comic-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-[#ff47a3] md:top-40 md:right-8"
        title={isPlaying ? "Pause Theme Song" : "Play Theme Song"}
      >
        {isPlaying ? (
          <Volume2 className="h-7 w-7 animate-pulse" />
        ) : (
          <VolumeX className="h-7 w-7" />
        )}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        
        .font-dora {
          font-family: 'Fredoka', sans-serif;
        }

        /* Anime/Comic Style thick borders and shadows */
        .comic-border {
          border: 4px solid #1e3a8a;
        }
        
        .comic-shadow {
          box-shadow: 6px 6px 0px 0px #1e3a8a;
        }
        
        .comic-shadow-sm {
          box-shadow: 3px 3px 0px 0px #1e3a8a;
        }
        
        .comic-shadow-hover:hover {
          box-shadow: 0px 0px 0px 0px #1e3a8a;
          transform: translate(6px, 6px);
        }

        /* Fun Polka Dot Background */
        .bg-polka {
          background-image: radial-gradient(#ffffff40 2px, transparent 2px);
          background-size: 30px 30px;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Custom Scrollbar for Chat */
        .chat-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
          border: 2px solid #1e3a8a;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: #00AEEF;
          border-radius: 10px;
          border: 1px solid #1e3a8a;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float-cloud {
          from { transform: translateX(100vw); }
          to { transform: translateX(-20vw); }
        }
        .cloud-1 { animation: float-cloud 25s linear infinite; }
        .cloud-2 { animation: float-cloud 35s linear infinite; animation-delay: -10s; }
        .cloud-3 { animation: float-cloud 45s linear infinite; animation-delay: -20s; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>

      {/* --- Animated Clouds Background --- */}
      <div className="absolute top-10 left-0 text-white/80 cloud-1 z-0"><Cloud size={120} fill="currentColor" /></div>
      <div className="absolute top-40 left-0 text-white/60 cloud-2 z-0 scale-75"><Cloud size={160} fill="currentColor" /></div>
      <div className="absolute top-80 left-0 text-white/50 cloud-3 z-0 scale-150"><Cloud size={200} fill="currentColor" /></div>

      <div className="absolute inset-0 bg-polka z-0 pointer-events-none" />

      {/* --- Marquee Header --- */}
      <div className="relative z-20 w-full overflow-hidden comic-border border-x-0 border-t-0 bg-[#FFD166] py-2 font-dora pr-20">
        <div className="animate-marquee flex gap-8 whitespace-nowrap text-lg font-bold tracking-widest text-[#1e3a8a]">
          <span>🚁 BAMBOO COPTER • 🚪 ANYWHERE DOOR • ⏱️ TIME MACHINE • 🥞 DORAYAKI • 🎒 4D POCKET • 🚁 BAMBOO COPTER • 🚪 ANYWHERE DOOR • ⏱️ TIME MACHINE • 🥞 DORAYAKI • 🎒 4D POCKET •</span>
          <span>🚁 BAMBOO COPTER • 🚪 ANYWHERE DOOR • ⏱️ TIME MACHINE • 🥞 DORAYAKI • 🎒 4D POCKET • 🚁 BAMBOO COPTER • 🚪 ANYWHERE DOOR • ⏱️ TIME MACHINE • 🥞 DORAYAKI • 🎒 4D POCKET •</span>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 pb-16 font-dora min-h-screen">
        
        {/* --- Hero Section --- */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl">
          
          <div className="text-center md:text-left flex-1 relative">
            <div className="absolute -top-6 -left-6 bg-white rounded-full p-2 comic-border comic-shadow-sm rotate-[-15deg] z-10">
              <Sparkles className="text-[#FFD166] h-8 w-8" fill="#FFD166" />
            </div>
            
            <h1 className="text-5xl font-black tracking-tight md:text-7xl text-white comic-border text-shadow drop-shadow-[0_4px_4px_rgba(30,58,138,1)]" style={{ WebkitTextStroke: '2px #1e3a8a' }}>
              ENTER THE <br/>
              <span className="inline-block transform -rotate-2 bg-[#FF69B4] px-4 py-1 text-white comic-border comic-shadow mt-2">
                Gadget World!
              </span>
            </h1>
            <p className="mt-6 text-xl font-bold text-[#1e3a8a] bg-white/80 inline-block px-4 py-2 rounded-2xl comic-border">
              Chat across time and space. No giant rats allowed. 🐭🚫
            </p>
            
            <div className="mt-8">
              <button onClick={() => navigate('/login')} className="group flex items-center gap-3 rounded-full comic-border bg-[#FF69B4] px-8 py-4 text-2xl font-bold text-white transition-all comic-shadow comic-shadow-hover hover:bg-[#ff47a3]">
                <DoorOpen className="h-8 w-8 transition-transform group-hover:-rotate-12" />
                OPEN ANYWHERE DOOR
              </button>
            </div>
          </div>

          {/* Floating Doraemon PNG */}
          <div className="flex-1 flex justify-center md:justify-end animate-float relative z-20">
             <div className="relative">
                {/* Decorative Bell Behind */}
                <div className="absolute top-10 -left-10 bg-[#FFD166] h-16 w-16 rounded-full comic-border comic-shadow-sm flex items-center justify-center -z-10 animate-pulse">
                  <BellRing className="text-[#1e3a8a] h-8 w-8" />
                </div>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" 
                  alt="Doraemon" 
                  className="w-[280px] md:w-[350px] drop-shadow-[8px_8px_0_rgba(30,58,138,0.3)]"
                />
             </div>
          </div>
        </div>

        {/* --- Chat Interface Layout --- */}
        <div className="relative flex h-[600px] w-full max-w-6xl flex-col overflow-hidden rounded-3xl comic-border bg-[#f8fafc] md:flex-row comic-shadow">
          
          {/* Left Sidebar - Gadget Rooms */}
          <div className="no-scrollbar hidden w-full flex-col gap-4 overflow-y-auto comic-border border-y-0 border-l-0 border-r-4 bg-[#FFD166] p-4 md:flex md:w-[28%]">
            <div className="bg-white comic-border rounded-2xl p-2 mb-2 comic-shadow-sm text-center">
              <h3 className="text-xl font-black uppercase text-[#1e3a8a]">
                Locations 📍
              </h3>
            </div>
            <RoomItem icon={<Navigation fill="currentColor"/>} name="Nobita's Room" active />
            <RoomItem icon={<Gamepad2 fill="currentColor"/>} name="The Empty Lot" />
            <RoomItem icon={<Cloud fill="currentColor"/>} name="Time Machine" />
            <RoomItem icon={<BookOpen fill="currentColor"/>} name="School Roof" />
            <RoomItem icon={<Music fill="currentColor"/>} name="Gian's Concert" />
            
            <div className="mt-auto bg-white/50 rounded-2xl p-4 comic-border comic-shadow-sm">
               <p className="text-sm font-bold text-center">Don't forget your 🥞 Dorayaki toll!</p>
            </div>
          </div>

          {/* Center - Main Chat */}
          <div className="relative flex flex-1 flex-col bg-white">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between gap-4 comic-border border-x-0 border-t-0 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full comic-border overflow-hidden bg-[#00AEEF] flex items-center justify-center comic-shadow-sm">
                  <Navigation className="text-white h-6 w-6" fill="white" />
                </div>
                <div>
                  <h2 className="font-black text-xl leading-tight">Nobita's Room</h2>
                  <p className="text-sm font-semibold text-gray-500">22nd Century Connection Active</p>
                </div>
              </div>
              <span className="rounded-full comic-border bg-[#00AEEF] text-white px-4 py-1.5 text-sm font-bold comic-shadow-sm flex items-center gap-2">
                 <Zap className="h-4 w-4" fill="white" /> Active Now
              </span>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 chat-scroll bg-[#E0F2FE] relative"
            >
              {/* Subtle watermark background */}
              <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                 <BellRing size={300} />
              </div>

              {messages.map((msg) => (
                <Message 
                  key={msg.id}
                  label={msg.name} 
                  text={msg.text} 
                  avatarSeed={msg.avatarSeed} 
                  bg={msg.bg} 
                  textColor={msg.textColor || "text-[#1e3a8a]"}
                  isSelf={msg.name === "YOU"}
                />
              ))}
            </div>

            {/* Chat Input - 4D Pocket Theme */}
            <div className="flex flex-col gap-2 comic-border border-x-0 border-b-0 bg-white p-4 relative">
               {/* 4D Pocket Design Element */}
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-white comic-border rounded-b-full border-t-0 z-10 flex justify-center items-center">
                 <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
               </div>

              <div className="flex gap-3 items-end mt-2">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Reach into the 4D Pocket and type..." 
                    className="w-full rounded-2xl comic-border px-5 py-4 font-semibold outline-none placeholder:text-gray-400 focus:bg-[#E0F2FE] transition-colors text-lg"
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  className="group flex h-16 w-16 items-center justify-center rounded-2xl comic-border bg-[#00AEEF] transition-all comic-shadow-sm hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none active:bg-[#008ccc]"
                >
                  <Send className="h-7 w-7 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Friends */}
          <div className="hidden w-[25%] flex-col gap-4 comic-border border-y-0 border-r-0 border-l-4 bg-[#FFB5A7] p-4 lg:flex">
            <div className="bg-white comic-border rounded-2xl p-2 mb-2 comic-shadow-sm text-center">
              <h3 className="text-xl font-black uppercase text-[#1e3a8a]">
                Friends 🐱
              </h3>
            </div>
            <UserCard name="Nobita" status="Crying" color="bg-[#FFD166]" emoji="😭" />
            <UserCard name="Shizuka" status="Bathing" color="bg-[#FFB5A7]" emoji="🛁" />
            <UserCard name="Gian" status="Singing" color="bg-[#F4A261]" emoji="🎤" />
            <UserCard name="Suneo" status="Flexing" color="bg-[#2A9D8F]" emoji="💸" />
          </div>
        </div>
      </main>
    </div>
  );
};

// Subcomponents

const Zap = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const RoomItem = ({ icon, name, active }) => (
  <div className={`flex cursor-pointer items-center gap-3 rounded-2xl comic-border p-3 transition-transform hover:-translate-y-1 ${active ? 'bg-white comic-shadow-sm' : 'bg-[#FFe499] hover:bg-white'}`}>
    <span className={`flex h-10 w-10 items-center justify-center rounded-xl comic-border ${active ? 'bg-[#FF69B4] text-white' : 'bg-white text-[#1e3a8a]'}`}>
      {icon}
    </span>
    <span className="font-bold text-[17px]">{name}</span>
  </div>
);

const Message = ({ text, bg, avatarSeed, label, textColor, isSelf }) => (
  <div className={`flex items-end gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 z-10 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
    
    {!isSelf && (
      <div className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-full comic-border ${bg} comic-shadow-sm`}>
        <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${avatarSeed}&backgroundColor=transparent`} alt="avatar" className="h-full w-full object-cover scale-110 translate-y-1"/>
      </div>
    )}

    <div className={`flex flex-col max-w-[75%] ${isSelf ? 'items-end' : 'items-start'}`}>
      {!isSelf && <span className="ml-2 mb-1 text-sm font-black text-[#1e3a8a]">{label}</span>}
      <div className={`relative rounded-3xl comic-border px-5 py-3 comic-shadow-sm ${isSelf ? 'rounded-br-sm bg-[#00AEEF] text-white' : `rounded-bl-sm ${bg} ${textColor}`}`}>
        <p className="font-bold text-base md:text-[17px] leading-snug break-words">{text}</p>
        
        {/* Cartoon Speech Bubble Tail */}
        <div className={`absolute bottom-0 w-4 h-4 comic-border border-t-0 ${isSelf ? '-right-2 border-l-0 border-b-0 bg-[#00AEEF] rounded-br-2xl' : '-left-2 border-r-0 border-b-0 bg-transparent rounded-bl-2xl'}`} style={{ clipPath: isSelf ? 'polygon(0 0, 100% 100%, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)', transform: isSelf ? 'translateY(10px) rotate(-15deg)' : 'translateY(10px) rotate(15deg)' }}></div>
      </div>
    </div>
  </div>
);

const UserCard = ({ name, status, color, emoji }) => (
  <div className="group flex items-center gap-3 rounded-2xl comic-border p-3 bg-white transition-transform hover:-translate-y-1 hover:comic-shadow-sm cursor-pointer">
    <div className={`relative h-12 w-12 rounded-full comic-border ${color} flex items-center justify-center text-xl`}>
      {emoji}
      <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full comic-border bg-[#34d399]"></div>
    </div>
    <div className="flex-1">
      <p className="text-[17px] font-black text-[#1e3a8a] leading-tight">{name}</p>
      <p className="text-sm font-bold text-gray-500">{status}</p>
    </div>
  </div>
  
);

export default LandingPage;