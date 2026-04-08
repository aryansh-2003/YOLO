import React, { useState, useEffect } from 'react';
import { Menu, Users, X, DoorOpen, Sparkles } from 'lucide-react';
import { socket } from '../../service/socket.service'; // Adjust path as needed
import RoomsSidebar from '../components/RoomsSidebar';
import LegendsSidebar from '../components/LegendsSidebar';
import ChatArea from '../components/ChatArea';
import { useSelector } from 'react-redux';
import messageService from '../../service/message.service';
import FunkyLoader from '../components/FunkyLoader';

const STATIC_ROOMS =[
  { id: 1, name: "NOBITA'S ROOM", active: true, iconType: 'smile' },
];

const HomePage = () => {
  const [inputText, setInputText] = useState("");
  const[legends, setLegends] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(true);

  const [showMobileRooms, setShowMobileRooms] = useState(false);
  const[showMobileLegends, setShowMobileLegends] = useState(false);

  useEffect(() => {
    if (!userData) return;
    
    socket.emit("sendActiveUsers");
    
    messageService.getHistory().then((res) => {
      if (res) {
        setLoader(false);
        res.data.map((message) => {
          const isMe = userData ? message.userData?.[0]?._id === userData._id : false;
          const newmessge = {
            id: message._id,
            user: message.userData?.[0]?.fullname,
            username: message.userData?.[0]?.username,
            avatar: message.userData?.[0]?.avatar ? message.userData?.[0]?.avatar : "https://api.dicebear.com/7.x/avataaars/svg?seed=new",
            text: message.content,
            image: null,
            isMe: isMe
          };
          setMessages((prev) => [...prev, newmessge]);
        });
      }
    }).catch((err) => {
      console.log(err);
      setLoader(false);
    });

    socket.on("textMessage", (message) => {
      const newmessage = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        user: message.user,
        avatar: message.avatar,
        text: message.text,
        image: null,
        isMe: false,
      };
      setMessages(prev => [...prev, newmessage]);
    });

    return () => {
      socket.off("textMessage");
    };
  }, [userData]);

  useEffect(() => {
    socket.on("activeUsers", (users) => {
      setLegends(users);
    });
    return () => {
      socket.off("activeUsers");
    }
  },[]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    messageService.postMessage(userData, inputText).then((res) => {
    }).catch((error) => { console.log(error) });

    const newmessge = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      user: userData.fullname,
      avatar: userData.avatar,
      username: userData.username,
      text: inputText,
      image: null,
      isMe: true
    };
    
    setMessages((prev) =>[...prev, newmessge]); 

    socket.emit("newMessage", {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      user: userData.fullname,
      avatar: userData.avatar,
      username: userData.username,
      text: inputText,
      image: null,
      isMe: false
    });

    setInputText("");
  };

  if (loader) {
    return <FunkyLoader />;
  }

  return (
    <div className="h-screen w-full bg-[#87CEEB] font-sans text-[#1e3a8a] relative flex flex-col items-center p-0 md:p-6 overflow-hidden selection:bg-[#FFD166]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700;900&display=swap');
        
        .font-dora { font-family: 'Fredoka', sans-serif; }

        .comic-border { border: 4px solid #1e3a8a; }
        .comic-shadow { box-shadow: 6px 6px 0px 0px #1e3a8a; }
        .comic-shadow-sm { box-shadow: 4px 4px 0px 0px #1e3a8a; }

        .bg-polka-bg {
          background-image: radial-gradient(#ffffff50 2px, transparent 2px);
          background-size: 30px 30px;
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          70% { transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; border-left: 2px solid #1e3a8a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00AEEF; border: 2px solid #1e3a8a; border-radius: 10px; }
      `}</style>

      <div className="absolute inset-0 bg-polka-bg z-0 pointer-events-none fixed" />

      {/* Floating Decor */}
      <div className="absolute top-10 left-10 text-6xl opacity-80 animate-float-slow z-0 hidden md:block drop-shadow-md">☁️</div>
      <div className="absolute top-40 right-20 text-5xl opacity-60 animate-float-slow z-0 hidden lg:block drop-shadow-md" style={{animationDelay: '1s'}}>☁️</div>
      <div className="absolute bottom-10 left-20 text-6xl opacity-90 animate-float-slow z-0 hidden lg:block drop-shadow-md" style={{animationDelay: '2s'}}>🚁</div>

=      <div className="relative z-10 w-full max-w-[95rem] grid grid-cols-1 md:grid-cols-12 gap-6 h-full pb-0 md:pb-2 font-dora">

        <div className="hidden md:flex md:col-span-3 flex-col h-full overflow-hidden bg-[#FFD166] comic-border rounded-[2rem] comic-shadow relative">
           <div className="absolute -top-4 -left-4 bg-white comic-border rounded-full p-2 rotate-[-15deg] shadow-[2px_2px_0px_#1e3a8a] z-10">
              <Sparkles className="w-6 h-6 text-[#FF69B4]" strokeWidth={2.5} />
           </div>
           <RoomsSidebar rooms={STATIC_ROOMS} />
        </div>

        <div className="col-span-1 md:col-span-6 flex flex-col relative h-full overflow-hidden bg-white comic-border md:rounded-[2rem] md:comic-shadow z-20">
          <ChatArea 
            messages={messages}
            inputText={inputText}
            setInputText={setInputText}
            handleSend={handleSend}
            onOpenRooms={() => setShowMobileRooms(true)}
            onOpenLegends={() => setShowMobileLegends(true)}
          />
        </div>

        <div className="hidden md:flex md:col-span-3 flex-col h-full overflow-hidden bg-[#FFB5A7] comic-border rounded-[2rem] comic-shadow relative">
          <LegendsSidebar legends={legends} />
          <div className="absolute -bottom-6 -right-6 opacity-40 pointer-events-none">
             <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" alt="Doraemon" className="w-48 blur-[1px]" />
          </div>
        </div>

      </div>

=      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden font-dora ${showMobileRooms ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-[#1e3a8a]/60 backdrop-blur-sm" onClick={() => setShowMobileRooms(false)} />
        <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#FF69B4] border-r-4 border-[#1e3a8a] p-4 flex flex-col shadow-[8px_0_0_0_#1e3a8a]">
           
           <div className="flex justify-between items-center mb-6 border-b-4 border-[#1e3a8a] pb-4 bg-white px-4 py-3 rounded-2xl comic-shadow-sm">
             <div className="flex items-center gap-2">
               <DoorOpen className="text-[#1e3a8a] w-7 h-7" strokeWidth={3} />
               <h2 className="font-black text-xl uppercase tracking-wider text-[#1e3a8a]">Locations</h2>
             </div>
             <button 
               onClick={() => setShowMobileRooms(false)} 
               className="p-2 bg-[#FF3366] text-white border-[3px] border-[#1e3a8a] rounded-xl hover:bg-red-500 active:scale-95 transition-all shadow-[2px_2px_0_0_#1e3a8a]"
             >
               <X size={24} strokeWidth={3} />
             </button>
           </div>

           <div className="flex-1 overflow-y-auto bg-white rounded-2xl comic-border p-2">
             <RoomsSidebar rooms={STATIC_ROOMS} isMobile={true} />
           </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden font-dora ${showMobileLegends ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-[#1e3a8a]/60 backdrop-blur-sm" onClick={() => setShowMobileLegends(false)} />
        <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#FFD166] border-l-4 border-[#1e3a8a] p-4 flex flex-col shadow-[-8px_0_0_0_#1e3a8a]">
            
           <div className="flex justify-between items-center mb-6 border-b-4 border-[#1e3a8a] pb-4 bg-white px-4 py-3 rounded-2xl comic-shadow-sm">
             <button 
               onClick={() => setShowMobileLegends(false)} 
               className="p-2 bg-[#FF3366] text-white border-[3px] border-[#1e3a8a] rounded-xl hover:bg-red-500 active:scale-95 transition-all shadow-[2px_2px_0_0_#1e3a8a]"
             >
               <X size={24} strokeWidth={3} />
             </button>
             <div className="flex items-center gap-2">
               <h2 className="font-black text-xl uppercase tracking-wider text-[#1e3a8a]">The Gang</h2>
               <Users className="text-[#1e3a8a] w-7 h-7" strokeWidth={3} />
             </div>
           </div>

           <div className="flex-1 overflow-y-auto bg-white rounded-2xl comic-border p-2">
             <LegendsSidebar legends={legends} isMobile={true} />
           </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;