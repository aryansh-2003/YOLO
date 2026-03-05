import React, { useState, useEffect, useRef } from 'react';
import { 
  Smile, 
  Pizza, 
  Car, 
  Flame, 
  Cat, 
  Send, 
  Rocket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_NAMES = ["CryptoKing", "MemeLord", "Sarah_Vibes", "NoCapFr", "GhostMode", "ChillGuy", "Anya_x", "DankMeme", "User404", "Glitch"];
const MOCK_MESSAGES = [
  "YOOO this is sick! 🔥",
  "Is this actually live?",
  "LMAO who said that? 💀",
  "Pizza > Burgers don't @ me",
  "sheesh the design is clean",
  "fr fr",
  "anyone strictly vibes only?",
  "bruh moment",
  "wait... I can see this",
  "W app",
  "Touch grass guys 🌱",
  "System status: Slaying 💅",
  "Let's gooooo 🚀"
];
const AVATAR_COLORS = ["bg-pink-100", "bg-blue-100", "bg-green-100", "bg-purple-100", "bg-orange-100", "bg-yellow-100"];

const LandingPage = () => {
  // Initial messages
  const [messages, setMessages] = useState([
    { id: 1, name: "Hjn", text: "ALL", msg: "Hello!", avatarSeed: "Felix", bg: "bg-pink-100" },
    { id: 2, name: "Aryansh", text: "What", msg: "What", avatarSeed: "Aneka", bg: "bg-blue-100" },
    { id: 3, name: "Sanjeev", text: "kon ho bhai", msg: "kon ho bhai", avatarSeed: "Bob", bg: "bg-green-100" },
    { id: 4, name: "Ankit", text: "tuje kya bey", msg: "tuje kya bey", avatarSeed: "Cookie", bg: "bg-purple-100" },
    { id: 5, name: "Hu", text: "Hu", msg: "Hu", avatarSeed: "Molly", bg: "bg-orange-100" },
  ]);

  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      // Only scroll if there is content to scroll
      if (scrollHeight > clientHeight) {
        chatContainerRef.current.scrollTo({
          top: scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  // SIMULATE LIVE TRAFFIC
  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
      const randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
      const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
      const randomSeed = Math.random().toString(36).substring(7);

      const newMessage = {
        id: Date.now(),
        name: randomName,
        text: randomMsg, 
        avatarSeed: randomSeed,
        bg: randomColor
      };

      setMessages((prev) => {
        const updated = [...prev, newMessage];
        return updated.length > 50 ? updated.slice(updated.length - 50) : updated;
      });

    }, 2500); 

    return () => clearInterval(interval);
  }, []);

  // Handle User Input
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMsg = {
      id: Date.now(),
      name: "YOU",
      text: inputValue,
      avatarSeed: "MyUserAvatar", 
      bg: "bg-yolo-yellow" 
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="relative w-full bg-[#FAFAF9] text-black font-sans selection:bg-yellow-400 overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&display=swap');
        
        .font-neo {
          font-family: 'Space Grotesk', sans-serif;
        }

        .bg-neo-grid {
          background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }

        .neo-shadow {
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .neo-shadow-sm {
          box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }
        .neo-shadow-lg {
          box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
        }
        
        /* Hide scrollbar for cleaner look */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-neo-grid z-0 pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-16 pb-20 font-neo">
        
        <div className="mb-14 text-center">
          <h1 className="mb-4 text-5xl font-black tracking-tight md:text-7xl">
            PICK YOUR <span className="inline-block -rotate-2 transform border-2 border-black bg-[#FCD34D] px-2 neo-shadow">Style!</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl font-medium text-gray-800 md:text-2xl">
            Don't be boring. The internet is watching. No pressure.
          </p>
          
          <button onClick={() => navigate('/login')} className="group inline-flex items-center gap-2 rounded-xl border-2 border-black bg-black px-10 py-4 text-xl font-bold text-white transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-gray-900 hover:shadow-none neo-shadow">
            LET'S GOOO! <Rocket className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        {/* --- LIVE CHAT DEMO --- */}
        <div className="relative flex h-[650px] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border-4 border-black bg-white md:flex-row neo-shadow-lg">
          
          {/* Sidebar: Rooms */}
          <div className="no-scrollbar flex w-full flex-col gap-4 overflow-y-auto border-r-4 border-black bg-white p-4 md:w-1/4">
            <h3 className="mb-2 border-b-2 border-dashed border-gray-300 pb-2 text-center text-xl font-black uppercase">
              Rooms To Invade
            </h3>
            <RoomItem icon={<Smile className="h-5 w-5"/>} name="THE MEME DEN" active />
            <RoomItem icon={<Pizza className="h-5 w-5"/>} name="PIZZA CULT" />
            <RoomItem icon={<Car className="h-5 w-5"/>} name="SKATER VIBES" />
            <RoomItem icon={<Flame className="h-5 w-5"/>} name="ROBLOX RAGE" />
            <RoomItem icon={<Cat className="h-5 w-5"/>} name="CAT VIDEOS" />
          </div>

          {/* Main Chat Area */}
          <div className="relative flex flex-1 flex-col bg-white">
            
            {/* Header */}
            <div className="flex justify-center gap-4 border-b-2 border-gray-200 p-4">
              <span className="flex items-center rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                <Flame className="mr-1 h-3 w-3 text-[#FCD34D]" fill="#FCD34D" /> Trending
              </span>
              <span className="rounded-full border-2 border-black bg-[#FCD34D] px-3 py-1 text-xs font-bold neo-shadow-sm">
                24 Online
              </span>
            </div>

            {/* LIVE MESSAGES FEED */}
            {/* REF IS ATTACHED HERE NOW */}
            <div 
              ref={chatContainerRef}
              className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
            >
              {messages.map((msg) => (
                <Message 
                  key={msg.id}
                  label={msg.name} 
                  text={msg.text} 
                  avatarSeed={msg.avatarSeed} 
                  bg={msg.bg} 
                />
              ))}
            </div>

            {/* Input Area */}
            <div className="flex flex-col gap-2 border-t-4 border-black bg-white p-4">
              <div className="flex items-center justify-between rounded-t-lg bg-black px-4 py-2 text-white">
                <span className="font-bold italic">JUMP IN! 🚀</span>
                <span className="text-xs text-gray-400">♫ Lofi Beats...</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type some chaos..." 
                  className="w-full rounded-full border-2 border-black px-4 py-3 font-medium outline-none placeholder:text-gray-400 focus:bg-gray-50"
                />
                <button 
                  onClick={handleSendMessage}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#FCD34D] transition-all hover:translate-y-1 hover:shadow-none neo-shadow-sm active:translate-y-1 active:shadow-none"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: Active Users */}
          <div className="hidden w-1/4 flex-col gap-4 border-l-4 border-black bg-white p-4 md:flex">
            <h3 className="mb-2 border-b-2 border-dashed border-gray-300 pb-2 text-center text-xl font-black uppercase">
              Active Legends
            </h3>
            <UserCard name="BABY BABY" status="Vibing" />
            <UserCard name="SUS GUY" status="Gaming" />
            <UserCard name="DANK MEMER" status="Sleeping" />
          </div>
        </div>
      </main>

      {/* MARQUEE */}
      <div className="relative z-10 w-full overflow-hidden border-y-4 border-black bg-[#FCD34D] py-3 font-neo">
        <div className="animate-marquee flex gap-8 whitespace-nowrap text-lg font-black tracking-widest">
          <span>NO CAP • JUST VIBES • TOUCH GRASS • DRINK WATER • MAIN CHARACTER ENERGY • SHEESH • NO CAP • JUST VIBES • TOUCH GRASS • DRINK WATER • MAIN CHARACTER ENERGY • SHEESH •</span>
          <span>NO CAP • JUST VIBES • TOUCH GRASS • DRINK WATER • MAIN CHARACTER ENERGY • SHEESH • NO CAP • JUST VIBES • TOUCH GRASS • DRINK WATER • MAIN CHARACTER ENERGY • SHEESH •</span>
        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const RoomItem = ({ icon, name, active }) => (
  <div className={`flex cursor-pointer items-center gap-3 rounded-full border-2 border-black p-3 transition-transform hover:-translate-y-1 ${active ? 'bg-[#FCD34D] neo-shadow-sm' : 'bg-white hover:bg-gray-50'}`}>
    <span className="text-xl">{icon}</span>
    <span className="font-bold">{name}</span>
  </div>
);

const Message = ({ text, bg, avatarSeed, label }) => (
  <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className={`h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-black p-1 ${bg === 'bg-yolo-yellow' ? 'bg-[#FCD34D]' : bg}`}>
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`} alt="avatar" className="h-full w-full object-cover"/>
    </div>
    <div className="flex flex-col items-start max-w-[85%]">
      <span className="ml-1 mb-0.5 text-[10px] font-bold text-gray-500 uppercase">{label}</span>
      <div className="rounded-xl rounded-tl-none border-2 border-black bg-[#FCD34D] px-4 py-2 neo-shadow-sm">
        <p className="font-bold text-black text-sm md:text-base leading-snug break-words">{text}</p>
      </div>
    </div>
  </div>
);

const UserCard = ({ name, status }) => (
  <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-black p-4 neo-shadow-sm bg-white">
    <div className="relative h-12 w-12 rounded-full border-2 border-black bg-[#FCD34D]">
      <div className="absolute top-0 right-0 h-3 w-3 rounded-full border border-black bg-green-400"></div>
    </div>
    <div className="text-center">
      <p className="text-sm font-bold">{name}</p>
      <div className="mt-1 inline-block rounded-full border border-black bg-blue-200 px-2 py-0.5 text-[10px]">
        🙂 {status}
      </div>
    </div>
  </div>
);

export default LandingPage;