import React, { useState, useEffect, useContext } from 'react';
import { Search } from 'lucide-react';
import DMChatArea from '../components/DmChatArea'; 
import userContext from '@/context/userContext';
import dmService from '../../service/directMessage.service.js'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../service/socket.service'; 



const INITIAL_MESSAGES = [
  { id: 1, text: "Hey! How's the new project coming along?", isMe: false, time: "10:00 AM" },
  { id: 2, text: "It's going great! Just fixing some UI bugs.", isMe: true, time: "10:02 AM" },
  { id: 3, text: "Nice. Did you add the retro shadows?", isMe: false, time: "10:05 AM" },
  { id: 4, text: "Of course. Can't forget the shadows.", isMe: true, time: "10:06 AM" },
];

function DirectMessages(){
  const [selectedUser, setSelectedUser] = useState(); 
  const [contacts, setContacts] = useState([]); 
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const {userData} = useContext(userContext)
  const ownerData = useSelector(state => state?.auth?.userData) // The one who sends data
  const navigate = useNavigate()
      const addPeople = async(username = userData.username ) => {
         if(userData !== null && ownerData !== undefined){

             const result  = await dmService.addPeople(username,ownerData._id)
              // setContacts(result?.data?.contacts)
              // setSelectedUser(userData.username)

        }
      }
 
  useEffect(() => {
          addPeople()
      dmService.getDmPeople(ownerData?._id).then((res) => {
      if(res.status == 200){
        setContacts(res?.data?.contacts)
      }
      }).catch((error) => {
        console.log(error)
        navigate('/home')
      })


    
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  }, [userData,ownerData]);


  const handleSendMessage = (text) => {
    socket.emit("privateMessage",{userData:selectedUser,ownerData:ownerData?.username,message:text})
    const newMsg = {
      id: Date.now(),
      text: text,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
  };

  socket.on("newPrivateMessage",(data) => {
      const isInContact = contacts.map((value) => value.includes(data?.ownerData))
        // console.log(isInContact,data?.ownerData,contacts)
      if(!isInContact){
        addPeople(data?.ownerData)
      }
      const newMsg = {
      id: Date.now(),
      text: data.message,
      isMe: ownerData?.username === data?.ownerData ? true : false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      
      if(data.ownerData === selectedUser?.username){
          setMessages([...messages, newMsg]);
      }
  })

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      


      <div className={`flex flex-col h-full bg-[#FFFDF5] border-r-4 border-black 
        ${isMobileView && selectedUser ? 'hidden' : 'w-full md:w-1/3 lg:w-1/4'}`}>
        

        <div className="p-4 border-b-4 border-black bg-[#FCD34D]">
          <h1 className="text-2xl font-black italic tracking-tighter">DIRECT MSGS</h1>
         
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
          {contacts.length > 0 ? contacts.map((contact) => (
  <div 
    key={contact?.username} // Changed from id to username
    onClick={() => setSelectedUser(contact)}
    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
      ${selectedUser?.username === contact?.username 
        ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] translate-x-1' 
        : 'bg-white border-black text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
      }`}
  >
    <div className="relative">
        {/* Avatar from API */}
        <img src={contact.avatar ? contact.avatar : "https://api.dicebear.com/7.x/avataaars/svg?seed=new" } alt="av" className="w-12 h-12 rounded-full border-2 border-current bg-gray-200" />
        {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        {/* Fullname from API */}
        <h3 className="font-bold truncate">{contact.fullname}</h3>
        <span className={`text-xs font-mono ${selectedUser?.username === contact.username ? 'text-gray-300' : 'text-gray-500'}`}>
          {contact.time}
        </span>
      </div>
      {/* Username from API */}
      <p className={`text-sm truncate ${selectedUser?.username === contact.username ? 'text-gray-300' : 'text-gray-500'}`}>
        @{contact.username}
      </p>
    </div>
  </div>
  )) : "No Contacts"}
        </div>
      </div>

      <div className={`${isMobileView && !selectedUser ? 'hidden' : 'w-full md:flex-1'}`}>
          <DMChatArea 
            selectedUser={selectedUser}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBack={() => setSelectedUser(null)}
            isMobileView={isMobileView}
          />
      </div>

    </div>
  );
};

export default DirectMessages;