import React, { useState, useEffect } from 'react';
import { Menu, Users, X } from 'lucide-react';
import { socket } from '../../service/socket.service'; // Adjust path as needed
import RoomsSidebar from '../components/RoomsSidebar';
import LegendsSidebar from '../components/LegendsSidebar';
import ChatArea from '../components/ChatArea';
import {useSelector} from 'react-redux'
import messageService from '../../service/message.service'
// --- SHARED DATA ---
// (In a real app, these might come from an API or Context)
const STATIC_ROOMS = [
  { id: 1, name: 'THE MEME DEN', active: true, iconType: 'smile' },
  { id: 2, name: 'PIZZA CULT', active: false, iconType: 'pizza' },
  { id: 3, name: 'SKATER VIBES', active: false, iconType: 'car' },
  { id: 4, name: 'ROBLOX RAGE', active: false, iconType: 'flame' },
  { id: 5, name: 'CAT VIDEOS', active: false, iconType: 'smile' },
];

const HomePage = () => {
  // --- STATE ---
  const [inputText, setInputText] = useState("");
  const [legends, setLegends] = useState([]);
  const userData = useSelector(state => state.auth.userData)
  const [messages, setMessages] = useState([]);

  // Mobile Drawer States
  const [showMobileRooms, setShowMobileRooms] = useState(false);
  const [showMobileLegends, setShowMobileLegends] = useState(false);

  useEffect(() => {
        socket.on("activeUsers", (users) => {
      console.log(users)
      setLegends(users)
    });
    if(!userData) return
    messageService.getHistory().then((res) => {
      if(res){
           res.data.map((message)=>{
           const isMe = userData ? message.userData?.[0]?._id === userData._id : false
           const newmessge = {
            id: message._id,
            user: message.userData?.[0]?.fullname,
            avatar: '👩🏻',
            text: message.content,
            image: null,
            isMe: isMe
          }
          setMessages((prev) => [...prev,newmessge])
        })
      }
    }).catch((err) => {
      console.log(err)
    })

      socket.on("textMessage", (message) => {

          const newmessage = {
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            user: message.user,
            avatar: '👩🏻',
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

  const handleSend = () => {
    if (!inputText.trim()) return;


    messageService.postMessage(userData,inputText).then((res) => {
      console.log(res)
    }).catch((error) => {console.log(error)})

    
      const newmessge = {
      id: Date.now().toString() + Math.random().toString(36).slice(2) ,
      user: userData.username,
      avatar: '👩🏻',
      text: inputText,
      image: null,
      isMe: true
    }
    
      setMessages((prev) => [...prev, newmessge]); 

    socket.emit("newMessage", {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      user: userData.username,
      avatar: '👩🏻',
      text: inputText,
      image: null,
      isMe: false
    });

 
    setInputText("");
  };

  return (
    <div className="h-screen w-full bg-[#FFFDF5] font-sans text-black relative flex flex-col items-center p-0 md:p-6 overflow-hidden">
      
      {/* --- GLOBAL STYLES --- */}
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          70% { transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }
      `}</style>

      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{ backgroundImage: 'radial-gradient(#3B82F6 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
      ></div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 h-full pb-0 md:pb-2">

        {/* 1. LEFT COLUMN: ROOMS (Desktop) */}
        <div className="hidden md:flex md:col-span-3 flex-col h-full overflow-hidden">
           <RoomsSidebar rooms={STATIC_ROOMS} />
        </div>

        {/* 2. CENTER COLUMN: CHAT */}
        <div className="col-span-1 md:col-span-6 flex flex-col relative h-full overflow-hidden">
          <ChatArea 
            messages={messages}
            inputText={inputText}
            setInputText={setInputText}
            handleSend={handleSend}
            onOpenRooms={() => setShowMobileRooms(true)}
            onOpenLegends={() => setShowMobileLegends(true)}
          />
        </div>

        {/* 3. RIGHT COLUMN: LEGENDS (Desktop) */}
        <div className="hidden md:flex md:col-span-3 flex-col h-full overflow-hidden">
          <LegendsSidebar legends={legends} />
        </div>

      </div>

      {/* --- MOBILE DRAWERS (Overlays) --- */}
      
      {/* Left Drawer: Rooms */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden ${showMobileRooms ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileRooms(false)} />
        <div className="absolute left-0 top-0 bottom-0 w-[85%] bg-[#FFFDF5] border-r-4 border-black p-4 flex flex-col">
           <div className="flex justify-end mb-2">
             <button onClick={() => setShowMobileRooms(false)} className="p-2 bg-red-400 border-2 border-black rounded-full"><X size={20}/></button>
           </div>
           <RoomsSidebar rooms={STATIC_ROOMS} isMobile={true} />
        </div>
      </div>

      {/* Right Drawer: Legends */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden ${showMobileLegends ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileLegends(false)} />
        <div className="absolute right-0 top-0 bottom-0 w-[85%] bg-[#FFFDF5] border-l-4 border-black p-4 flex flex-col">
            <div className="flex justify-start mb-2">
             <button onClick={() => setShowMobileLegends(false)} className="p-2 bg-red-400 border-2 border-black rounded-full"><X size={20}/></button>
           </div>
           <LegendsSidebar legends={legends} isMobile={true} />
        </div>
      </div>

    </div>
  );
};

export default HomePage;