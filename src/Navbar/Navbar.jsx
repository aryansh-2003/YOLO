import React, { use } from 'react';
import { LayoutGrid, Search, MessageSquare, User, Plus, Trash2Icon } from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import userService from '../../service/user.service'
import { useNavigate } from 'react-router-dom';
function Navbar(){
  const userData = useSelector(state => state?.auth?.userData)
  const navigate = useNavigate()

  const handleClick = async() => {
    try {
      const result = await userService.deleteUser(userData.fullname,userData.username)
      if(result){
        localStorage.removeItem("userData")
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <nav className="fixed left-0 bg-white max-h-20 right-0 bg- border-black z-55 transition-all duration-300
                    bottom-0 border-t-2 pb-6 pt-2 px-6   
                    md:top-0 md:border-b-2 md:border-t-0 md:py-3 md:px-8 ">
      
      <div className="mx-auto  flex justify-between items-center relative
                      max-w-md                            /* Mobile: Compact width */
                      md:max-w-6xl                        /* Desktop: Wide/Elongated */">
        
        {/* Nav Item: Rooms */}
        <button className="flex flex-col items-center gap-1 w-16 group md:flex-row md:w-auto md:gap-3">
          <div className="w-12 h-12 bg-[#FCD34D] rounded-full border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-1 group-active:shadow-none transition-all">
            <LayoutGrid className="w-6 h-6 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wide md:text-sm md:font-bold">Rooms</span>
        </button>

        {/* Nav Item: DMs */}
        {/* <button className="flex flex-col items-center gap-1 w-16 group opacity-50 hover:opacity-100 transition-opacity md:flex-row md:w-auto md:gap-3">
          <div className="w-8 h-8 flex items-center justify-center md:w-10 md:h-10 md:bg-gray-100 md:rounded-full md:border-2 md:border-transparent md:group-hover:border-black md:transition-all">
            <MessageSquare className="w-7 h-7 text-black md:w-5 md:h-5" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide md:text-sm md:text-black">DMs</span>
        </button> */}
        <div className={`${userData ? 'visible' : 'hidden'}`}>
              <AlertDialog >
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Delete Account/Logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this Account and you won't be able to retrieve it!!. View{" "}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                  <AlertDialogAction   onClick={() => handleClick()} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      

        <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-bold text-xs mt-2 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors cursor-help">
            <span className={`w-2 h-2 rounded-full animate-ping ${userData ? "bg-[#4ADE80]" : "bg-[#FF0000]"}`}></span>
            User Status: {userData ? "Logged in" : "Offline"}
          </div>

      </div>
    </nav>
  );
};

export default Navbar;