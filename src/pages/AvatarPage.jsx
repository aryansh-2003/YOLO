import React, { useState, useEffect } from 'react';
import { 
  Dice5, 
  ArrowRight, 
  Check, 
  Save, 
  RefreshCw,
  User,
  Zap
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../../service/user.service'
import {socket} from '../../service/socket.service'
import {login} from "../Store/authSlice"
import { useDispatch } from 'react-redux';


// Different DiceBear styles to offer the user
const AVATAR_STYLES = [
  { id: 'avataaars', name: 'The Classic', label: 'OG Vibe' },
  { id: 'notionists', name: 'Notion-ish', label: 'Productivity Guru' },
  { id: 'bottts', name: 'Robo-Chad', label: 'Beep Boop' },
  { id: 'lorelei', name: 'Dreamy', label: 'Main Character' },
  { id: 'fun-emoji', name: 'Emojified', label: 'Just Vibes' },
  { id: 'pixel-art', name: '8-Bit', label: 'Retro Gamer' }
];

function AvatarSelectionPage(){
  // State
  const [seedName, setSeedName] = useState('Stranger');
  const [selectedStyle, setSelectedStyle] = useState('avataaars');
  const [isSaving, setIsSaving] = useState(false);
  const {username,name} = useParams()
  const navigate  = useNavigate()
  const dispatch = useDispatch()

  
  // The final URL based on current selection
  const currentAvatarUrl = `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seedName}`;

  // --- HANDLERS ---

  // 1. Handle Randomize
  const handleRandomize = () => {
    const randomSeeds = ['Neo', 'Glitch', 'Viper', 'Ghost', 'Pixel', 'Slayer', 'Juice', 'Vibe'];
    const random = randomSeeds[Math.floor(Math.random() * randomSeeds.length)] + Math.floor(Math.random() * 100);
    setSeedName(random);
  };

  // 2. Handle "Save to MongoDB" (Simulation)
  const handleSave = () => {
    setIsSaving(true);

    userService.getLoggedIn(name,username,currentAvatarUrl).then((result) =>{
      if(result){
        setIsSaving(false);
        dispatch(login(result?.data))
        navigate('/home')
      }
    }).catch((error) => {
      console.log(error.message)
    })
  
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAF9] text-black font-sans selection:bg-yellow-400 overflow-x-hidden flex flex-col">
      
      {/* --- STYLES (Same as Landing Page) --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&display=swap');
        
        .font-neo { font-family: 'Space Grotesk', sans-serif; }
        
        .bg-neo-grid {
          background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }

        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
        .neo-shadow-lg { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
        .neo-shadow-hover:hover { 
          transform: translate(2px, 2px); 
          box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
        }

        /* Input specific transition */
        .neo-input:focus {
          background-color: #FCD34D;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-neo-grid z-0 pointer-events-none fixed" />

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 py-12 font-neo">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
            STEP 1 OF 1
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2">
            NEW PHONE <span className="bg-[#FCD34D] border-2 border-black px-2 inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_black]">WHO DIS?</span>
          </h1>
          <p className="text-xl text-gray-600 font-bold">
            Create your digital alter-ego. Make it weird.
          </p>
        </div>

        {/* --- CARD CONTAINER --- */}
        <div className="w-full max-w-5xl bg-white border-4 border-black rounded-3xl p-6 md:p-8 neo-shadow-lg flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          
          {/* LEFT: INPUT & PREVIEW */}
          <div className="w-full md:w-1/3 flex flex-col gap-6 sticky top-8">
            
            {/* 1. Input Section */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-lg uppercase flex items-center gap-2">
                <User className="w-5 h-5" /> Your Alias
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  // onChange={(e) => setSeedName(e.target.value)}
                  disabled={true}
                  className="neo-input w-full border-2 border-black rounded-xl px-4 py-3 font-bold text-xl outline-none transition-all bg-gray-50 placeholder-gray-400"
                  placeholder="Type a name..."
                />
                <button 
                  onClick={handleRandomize}
                  title="Randomize Name"
                  className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-white border-2 border-black rounded-lg hover:bg-gray-100 active:translate-y-1 transition-all"
                >
                  <Dice5 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* 2. Big Preview Card */}
            <div className="relative group">
              <div className="aspect-square  border-4 border-black rounded-2xl overflow-hidden neo-shadow flex items-center justify-center relative">
                {/* Background Decor */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent" />
                
                {/* The Avatar Image */}
                <img 
                  src={currentAvatarUrl} 
                  alt="Preview" 
                  className="w-4/5 h-4/5 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                />

                {/* Badge */}
                <div className="absolute bottom-4 left-4 bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-black shadow-[2px_2px_0px_0px_black]">
                  PREVIEW
                </div>
              </div>
            </div>

            {/* Save Button (Mobile: Bottom, Desktop: Here) */}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-black text-white border-2 border-black rounded-xl py-4 font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 neo-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="animate-spin w-6 h-6" /> SAVING...
                </>
              ) : (
                <>
                  LOCK IT IN <Save className="w-6 h-6" />
                </>
              )}
            </button>

          </div>

          {/* RIGHT: STYLE SELECTOR GRID */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-4 border-black pb-4">
              <h3 className="font-black text-2xl uppercase">Choose your vibe</h3>
              <span className="bg-green-300 border-2 border-black px-2 py-1 text-xs font-bold rounded neo-shadow-sm">
                {AVATAR_STYLES.length} STYLES
              </span>
            </div>

            {/* Grid of Styles */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {AVATAR_STYLES.map((style) => {
                const isSelected = selectedStyle === style.id;
                // Generate preview for this specific style using the same username
                const previewUrl = `https://api.dicebear.com/7.x/${style.id}/svg?seed=${seedName}`;

                return (
                  <div 
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`
                      cursor-pointer relative overflow-hidden rounded-xl border-2 transition-all duration-200
                      ${isSelected 
                        ? 'bg-blue-100 border-black ring-4 ring-black ring-offset-2 scale-[1.02] z-10' 
                        : 'bg-white border-black hover:bg-gray-50 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black]'
                      }
                    `}
                  >
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#FCD34D] border-2 border-black rounded-full p-1 z-20">
                        <Check className="w-3 h-3" strokeWidth={4} />
                      </div>
                    )}

                    <div className="p-4 flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full border-2 border-black bg-white overflow-hidden shadow-sm">
                        <img src={previewUrl} alt={style.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-lg leading-tight">{style.name}</h4>
                        <p className="text-xs font-bold text-gray-500 uppercase mt-1">{style.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info Box */}
            <div className="bg-yellow-50 border-2 border-black border-dashed rounded-xl p-4 flex gap-4 items-start mt-4">
              <div className="bg-black text-white p-2 rounded-lg">
                <Zap className="w-5 h-5 text-[#FCD34D]" fill="#FCD34D" />
              </div>
              <div>
                <h5 className="font-bold text-lg">Pro Tip</h5>
                <p className="font-medium text-gray-700 text-sm leading-relaxed">
                  The generated avatar is deterministic. That means <b>"{seedName}"</b> will always look like this in the <b>{AVATAR_STYLES.find(s => s.id === selectedStyle)?.name}</b> dimension.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* --- FOOTER (Marquee for Consistency) --- */}
      <div className="relative w-full overflow-hidden border-t-4 border-black bg-[#FCD34D] py-3 font-neo z-10">
        <div className="animate-marquee flex gap-8 whitespace-nowrap text-lg font-black tracking-widest">
          <span>PICK A FACE • DON'T BE SHY • MONGODB IS WAITING • NO SQL INJECTION PLZ • PICK A FACE • DON'T BE SHY •</span>
          <span>PICK A FACE • DON'T BE SHY • MONGODB IS WAITING • NO SQL INJECTION PLZ • PICK A FACE • DON'T BE SHY •</span>
        </div>
      </div>

    </div>
  );
};

export default AvatarSelectionPage;