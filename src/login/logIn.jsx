import React, { useState } from 'react';
import { ArrowLeft, Dices, Rocket, Check, AtSign } from 'lucide-react';
import { useForm } from "react-hook-form"
import userService from '../../service/user.service'
import {socket} from '../../service/socket.service'
import {useDispatch} from 'react-redux'
import {login} from "../Store/authSlice"
import { useNavigate } from 'react-router-dom';


export default function loginPage () {
  // State for inputs
  const [name, setName] = useState("Alex Doe");
  const [username, setUsername] = useState("spicy_meme_lord");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    formState:{errors},
    handleSubmit
  } = useForm()

  const onsubmit = (data) =>{
    console.log(data)

    socket.emit("credentials", {
      name:data.name,
      username:data.username,
      socketId: socket.id
    })

    dispatch(login({userData:"hii"}))

    userService.getLoggedIn(data.name,data.username).then((result) =>{
      console.log(result.data)
      if(result){
        dispatch(login(result?.data))
        navigate('/home')
      }
    }).catch((error) => {
      console.log(error.message)
    })

  }

  return (
    <div className="min-h-screen bg-[#FFFDF5] font-sans text-black relative overflow-hidden selection:bg-purple-200">
      {/* Background Grid Pattern (Plus signs) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 18v4h-2v-4h-4v-2h4v-4h2v4h4v2h-4z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Floating Background Elements (Decoration) */}
      <div className="absolute top-20 right-10 text-4xl opacity-20 rotate-12">🌚</div>
      <div className="absolute bottom-40 right-5 text-6xl opacity-20 -rotate-12">💩</div>
      <div className="absolute top-1/2 left-2 text-4xl opacity-20 rotate-45">👻</div>
      
      {/* Main Content Container */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-8 flex flex-col min-h-screen">
        
        {/* Progress Bar */}
        <div className="flex gap-3 mb-8">
          <div className="h-4 flex-1 bg-[#6B66FF] rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="h-4 flex-1 bg-[#4ADE80] rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="h-4 flex-1 border-2 border-dashed border-gray-300 rounded-full"></div>
        </div>

        {/* Header Section */}
        <div className="relative mb-6">
          <button className="absolute md:hidden -left-2 top-2 p-2 bg-white rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center pt-2">
            <h1 className="text-4xl font-black tracking-tight leading-none">
              Pick Your <br />
              <span className="text-[#6B66FF]">Alias!</span> 
              <span className="ml-2 inline-block animate-bounce">🧐</span>
            </h1>
          </div>
        </div>

        {/* Helper Text Bubble */}
        <div className="relative mb-8">
            <div className="absolute -top-3 right-0 bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">
                Nice choice!
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-black relative flex items-center justify-between shadow-sm">
                <p className="text-gray-600 font-medium text-sm leading-tight pr-4">
                    Don't be boring. The internet is watching. No pressure.
                </p>
                <div className="bg-[#4ADE80] w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0">
                    😎
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>

        {/* --- NAME SECTION (Requested Addition) --- */}
        <div className="mb-4">
          <label className="text-sm font-bold ml-1 mb-1 block">Your Name</label>
          <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center p-1">
            <input 
              type="text" 
              className="w-full bg-transparent p-3 text-xl font-bold outline-none placeholder:text-gray-300"
              placeholder="Full Name"
              {...register("name")}
            />
            {errors.exampleRequired && <span>This field is required</span>}

          </div>
        </div>

        {/* --- USERNAME SECTION (Original) --- */}
        <div className="mb-2">
           <label className="text-sm font-bold ml-1 mb-1 block">Username</label>
           <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center p-1">
            <div className="pl-4 text-gray-400">
                <AtSign size={20} strokeWidth={3} />
            </div>
            <input 
              type="text"
              className="w-full bg-transparent p-3 text-xl font-black outline-none"
              {...register("username")}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
        </div>

        {/* Status & Dice Row */}
        <div className="flex gap-3 mb-8 items-center mt-4">
            <div className="flex-1 bg-[#4ADE80] rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] py-2 px-4 flex items-center gap-2">
                <div className="bg-black rounded-full p-0.5">
                    <Check className="text-white w-3 h-3" strokeWidth={4} />
                </div>
                <span className="font-bold text-sm">It's free!</span>
            </div>
            <button className="bg-[#F87171] p-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all">
                <Dices className="text-white w-6 h-6" />
            </button>
        </div>

        {/* Suggestions Section */}
        <div className="mb-8">
            <div className="inline-block bg-[#FCD34D] border-2 border-black px-3 py-1 -rotate-2 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black text-xs uppercase flex items-center gap-1">
                    Fresh from the oven 🍞
                </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {['yeet_master_9000', 'ok_boomer_lol', 'crying_in_club', 'dank_noodle'].map((tag) => (
                    <button key={tag} className="bg-white px-4 py-2 rounded-full border-2 border-gray-200 text-gray-600 font-bold text-xs hover:border-black hover:bg-gray-50 transition-colors">
                        {tag}
                    </button>
                ))}
            </div>
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
            <div className="relative">
                {/* Decorative wave behind/near button */}
                <div className="absolute -top-6 left-4 text-4xl -z-10 rotate-12">🌊</div>

                <button className="w-full bg-black text-white text-xl font-black py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(107,102,255,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(107,102,255,1)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 group">
                    LET'S GOOO! 
                    <Rocket className="group-hover:-translate-y-1 transition-transform" />
                </button>
                
            </div>
            
            <p className="text-center text-[10px] font-bold text-gray-500 mt-4">
                By clicking the big button, you agree to be <span className="underline decoration-2 cursor-pointer hover:text-black">Cool & Nice</span>
            </p>
        </div>
    </form>


      </div>
    </div>
  );
};

