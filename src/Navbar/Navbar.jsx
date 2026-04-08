import React from 'react';
import { MessageSquare, Trash2Icon, Zap, BellRing } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import userService from '../../service/user.service';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.png';

function Navbar() {
  const userData = useSelector((state) => state?.auth?.userData);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const result = await userService.deleteUser(userData.fullname, userData.username);
      if (result) {
        localStorage.removeItem("userData");
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700;900&display=swap');
        
        .font-dora {
          font-family: 'Fredoka', sans-serif;
        }

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

        /* Modal Overrides for Shadcn */
        .dora-modal {
          border: 4px solid #1e3a8a !important;
          box-shadow: 8px 8px 0px 0px #1e3a8a !important;
          border-radius: 24px !important;
          font-family: 'Fredoka', sans-serif !important;
          background-color: #ffffff !important;
          background-image: radial-gradient(#1e3a8a15 2px, transparent 2px);
          background-size: 20px 20px;
        }
      `}</style>

      <nav className="fixed left-0 right-0 z-50 bg-[#E0F2FE] font-dora transition-all duration-300
                      bottom-0 border-t-4 border-[#1e3a8a] pb-safe px-4 h-24 flex items-center shadow-[0_-4px_0_0_#1e3a8a]
                      md:top-0 md:bottom-auto md:border-b-4 md:border-t-0 md:py-3 md:px-8 md:h-auto md:shadow-[0_4px_0_0_#1e3a8a]">

        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">

          <div className="flex-1 flex justify-start items-center relative">
            <div className="relative group cursor-pointer" onClick={() => navigate('/')}>
              <div className="absolute inset-0 bg-[#FFD166] rounded-full comic-border scale-110 -z-10 group-hover:rotate-12 transition-transform duration-300"></div>
              
              <img 
                className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-110 group-active:scale-95 z-10 relative bg-white rounded-full p-1 comic-border" 
                src={logo} 
                alt="Logo"
              />
              
              <div className="absolute -top-2 -right-3 bg-white h-6 w-6 rounded-full comic-border flex items-center justify-center animate-bounce z-20 hidden md:flex">
                <BellRing size={12} className="text-[#1e3a8a]" />
              </div>
            </div>
          </div>

          <div className={`shrink-0 flex justify-center ${userData ? 'visible' : 'invisible'}`}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="bg-[#FF69B4] hover:bg-[#ff47a3] text-white font-black text-sm md:text-base px-4 py-6 rounded-2xl comic-border comic-shadow-sm hover:-translate-y-1 hover:shadow-none hover:translate-x-1 transition-all flex gap-2 items-center"
                >
                  <Trash2Icon size={20} />
                  <span className="hidden sm:inline">Erase Record</span>
                </Button>
              </AlertDialogTrigger>
              
              <AlertDialogContent className="dora-modal p-6 sm:max-w-md">
                <AlertDialogHeader className="relative">
                  <div className="absolute -top-12 -left-6 text-6xl rotate-[-15deg] animate-pulse drop-shadow-md">
                    🔦
                  </div>
                  <AlertDialogTitle className="text-3xl font-black text-[#1e3a8a] text-center pt-4">
                    Wait a minute! 🛑
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-lg font-bold text-gray-600 text-center mt-2 leading-snug">
                    Are you sure you want to use the <span className="text-[#FF69B4] font-black">Memory Erasing Flash</span>? 
                    This will permanently delete your account and you won't be able to retrieve it!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter className="mt-6 flex gap-3 sm:justify-center">
                  <AlertDialogCancel 
                    className="flex-1 bg-white hover:bg-gray-100 text-[#1e3a8a] font-black py-6 rounded-2xl comic-border comic-shadow-sm hover:-translate-y-1 transition-all"
                  >
                    Keep Memories
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => handleClick()} 
                    className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white font-black py-6 rounded-2xl comic-border comic-shadow-sm hover:-translate-y-1 transition-all"
                  >
                    Erase Everything!
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex-1 flex justify-end items-center gap-3 md:gap-5">
            
            {userData ? 
                <button 
                  onClick={() => navigate("/dm")} 
                  className="group  items-center gap-2 hidden bg-[#FFD166] text-[#1e3a8a] px-4 py-2.5 md:py-3 rounded-2xl font-black text-sm md:text-base comic-border comic-shadow-sm hover:-translate-y-1 hover:bg-[#ffe499] active:translate-y-1 active:shadow-none transition-all whitespace-nowrap"
                >
                  <div className="relative">
                    <MessageSquare size={20} className="group-hover:animate-ping absolute inset-0 opacity-50" />
                    <MessageSquare size={20} className="relative z-10" />
                  </div>
                  <span className="hidden lg:inline">Time Mail</span>
                </button>  : ""
            }        

            <div className="hidden lg:inline-flex items-center gap-2 bg-white text-[#1e3a8a] px-4 py-3 rounded-2xl font-black text-sm comic-border comic-shadow-sm whitespace-nowrap cursor-help hover:bg-gray-50 transition-colors">
              <span className={`relative flex h-3 w-3`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${userData ? "bg-[#34D399]" : "bg-red-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 comic-border border-[2px] ${userData ? "bg-[#34D399]" : "bg-red-500"}`}></span>
              </span>
              {userData ? (
                 <span className="flex items-center gap-1">Connected <Zap size={14} className="text-[#FFD166] fill-[#FFD166]"/></span>
              ) : (
                 "Lost in Time"
              )}
            </div>          
          </div>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;