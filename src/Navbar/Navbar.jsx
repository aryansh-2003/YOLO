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
import logo from '../../public/logo.png'

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


  return  (
    <nav className="fixed left-0 right-0 bg-white border-black z-50 transition-all duration-300
                    bottom-0 border-t-2 pb-safe px-4 h-20 flex items-center
                    md:top-0 md:bottom-auto md:border-b-2 md:border-t-0 md:py-2 md:px-8 md:h-auto">

      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex-1 flex justify-start items-center">
          <img 
            className="h-14 md:h-15 w-auto object-contain cursor-pointer transition-transform hover:scale-105" 
            src={logo} 
            alt="Logo"
            onClick={() => navigate('/')} 
          />
        </div>

        <div className={`shrink-0 flex justify-center ${userData ? 'visible' : 'invisible'}`}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="font-bold shadow-md">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Delete Account/Logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this Account and you won't be able to retrieve it!!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleClick()} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>

        <div className="flex-1 flex justify-end items-center">
          <div className="hidden lg:inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-bold text-xs border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors cursor-help whitespace-nowrap">
            <span className={`w-2 h-2 rounded-full animate-ping ${userData ? "bg-[#4ADE80]" : "bg-[#FF0000]"}`}></span>
            {userData ? "Logged in" : "Offline"}
          </div>
          
        </div>

      </div>
    </nav>
  );
};

export default Navbar;