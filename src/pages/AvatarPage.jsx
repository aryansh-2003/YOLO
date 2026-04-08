import React, { useState, useEffect } from 'react';
import { 
  Dice5, 
  Check, 
  Save, 
  RefreshCw,
  User,
  Zap,
  BellRing
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userService from '../../service/user.service';
import { socket } from '../../service/socket.service'; // Kept your import
import { login } from "../Store/authSlice";

const AVATAR_STYLES =[
  { id: 'avataaars', name: 'The Classic', label: 'OG Vibe' },
  { id: 'notionists', name: 'Notion-ish', label: 'Study Mode' },
  { id: 'bottts', name: 'Robo-Chad', label: 'Gadget AI' },
  { id: 'lorelei', name: 'Dreamy', label: 'Main Character' },
  { id: 'fun-emoji', name: 'Emojified', label: 'Just Vibes' },
  { id: 'pixel-art', name: '8-Bit', label: 'Retro Gamer' }
];

export default function AvatarSelectionPage() {
  const [seedName, setSeedName] = useState('Nobita');
  const [selectedStyle, setSelectedStyle] = useState('avataaars');
  const [isSaving, setIsSaving] = useState(false);
  const { username, name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentAvatarUrl = `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seedName}`;

  const handleRandomize = () => {
    const randomSeeds =['Neo', 'Glitch', 'Gian', 'Suneo', 'Dorami', 'Sewashi', 'Future', 'Gadget'];
    const random = randomSeeds[Math.floor(Math.random() * randomSeeds.length)] + Math.floor(Math.random() * 100);
    setSeedName(random);
  };

  const handleSave = () => {
    setIsSaving(true);
    userService.getLoggedIn(name, username, currentAvatarUrl).then((result) => {
      if(result){
        setIsSaving(false);
        dispatch(login(result?.data));
        navigate('/home');
      }
    }).catch((error) => {
      console.log(error.message);
      setIsSaving(false);
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#87CEEB] text-[#1e3a8a] font-sans selection:bg-[#FFD166] overflow-x-hidden flex flex-col relative">
      
      {/* --- DORAEMON COMIC THEME CSS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700;900&display=swap');
        
        .font-dora { font-family: 'Fredoka', sans-serif; }

        .comic-border { border: 4px solid #1e3a8a; }
        .comic-shadow { box-shadow: 6px 6px 0px 0px #1e3a8a; }
        .comic-shadow-sm { box-shadow: 4px 4px 0px 0px #1e3a8a; }
        .comic-shadow-btn { box-shadow: 4px 4px 0px 0px #ff47a3; }

        .comic-shadow-hover:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px 0px #1e3a8a;
        }

        .bg-polka-bg {
          background-image: radial-gradient(#ffffff40 2px, transparent 2px);
          background-size: 30px 30px;
        }

        @keyframes float-gadget {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-15px) rotate(20deg); }
        }
        .animate-float-gadget { animation: float-gadget 4s ease-in-out infinite; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }

        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 15s linear infinite; }
        
        .active-style-ring {
          outline: 4px solid #1e3a8a;
          outline-offset: 2px;
        }
      `}</style>

      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-polka-bg pointer-events-none z-0 fixed" />

      {/* Floating Elements */}
      <div className="absolute top-24 right-10 text-6xl opacity-80 animate-float-gadget z-0 hidden md:block drop-shadow-md">🥞</div>
      <div className="absolute bottom-40 left-12 text-6xl opacity-80 -rotate-12 animate-pulse z-0 hidden md:block drop-shadow-md">🚁</div>
      <div className="absolute top-1/4 left-10 text-5xl opacity-80 rotate-45 z-0 hidden md:block drop-shadow-md">⏱️</div>

      {/* === LEFT SIDE: NOBITA === */}
      <div className="fixed bottom-0 -left-10 lg:left-0 xl:left-10 z-10 animate-float-slow hidden lg:block pointer-events-none">
        <img 
          src="https://www.pngplay.com/wp-content/uploads/10/Doraemon-Free-Picture-PNG.png" 
          alt="Nobita" 
          className="w-[220px] lg:w-[280px] xl:w-[320px] drop-shadow-[8px_8px_0_rgba(30,58,138,0.3)]"
        />
      </div>

      {/* === RIGHT SIDE: SHIZUKA === */}
      <div className="fixed bottom-0 -right-4 lg:right-0 xl:right-10 z-10 animate-float-slow hidden lg:block pointer-events-none" style={{ animationDelay: '1s' }}>
        <img 
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4a8dd1a5-6175-4ee7-9e05-1f45ea78f328/dix6o4v-cd2cbf5e-18a4-4f2e-8dd6-4c5fb63aef74.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi80YThkZDFhNS02MTc1LTRlZTctOWUwNS0xZjQ1ZWE3OGYzMjgvZGl4Nm80di1jZDJjYmY1ZS0xOGE0LTRmMmUtOGRkNi00YzVmYjYzYWVmNzQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.AuyJIIG4pbpgpxeSOLD3zmqPFRCD-IUltPjbs8c0V2g" 
          alt="Shizuka" 
          className="w-[200px] lg:w-[260px] xl:w-[300px] drop-shadow-[8px_8px_0_rgba(30,58,138,0.3)]"
        />
      </div>

      <main className="relative z-30 flex-grow flex flex-col items-center justify-center p-4 py-12 font-dora">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#FFD166] text-[#1e3a8a] px-5 py-1.5 rounded-full text-sm font-black mb-4 comic-border comic-shadow-sm rotate-2">
            STEP 2: GADGET SETUP
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2 text-white drop-shadow-[0_4px_4px_rgba(30,58,138,1)]" style={{ WebkitTextStroke: '2px #1e3a8a' }}>
            SET YOUR <span className="bg-[#FF69B4] px-4 py-1 inline-block transform -rotate-2 comic-border comic-shadow mt-2 text-white" style={{ WebkitTextStroke: '0px' }}>AVATAR!</span>
          </h1>
        </div>

        {/* --- MAIN CARD --- */}
        <div className="w-full max-w-5xl bg-[#f8fafc] comic-border rounded-[2rem] p-6 md:p-8 comic-shadow flex flex-col md:flex-row gap-8 md:gap-12 items-start relative z-30">
          
          {/* Left Column (Preview) */}
          <div className="w-full md:w-1/3 flex flex-col gap-6 sticky top-8">
            
            <div className="flex flex-col gap-2">
              <label className="font-black text-lg uppercase flex items-center gap-2 tracking-wide">
                <User className="w-6 h-6 text-[#FF69B4]" strokeWidth={3} /> Gadget Alias
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username || ''}
                  disabled={true}
                  className="w-full comic-border rounded-2xl px-5 py-4 font-black text-xl outline-none bg-white opacity-80 cursor-not-allowed"
                  placeholder="Type a name..."
                />
                <button 
                  onClick={handleRandomize}
                  title="Randomize Avatar Seed"
                  className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-[#00AEEF] text-white comic-border rounded-xl hover:-translate-y-1 hover:shadow-[2px_2px_0px_#1e3a8a] active:translate-y-0 active:shadow-none transition-all"
                >
                  <Dice5 className="w-7 h-7" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Avatar Preview Box */}
            <div className="relative group mt-2">
              <div className="aspect-square comic-border rounded-[2rem] overflow-hidden comic-shadow flex items-center justify-center relative bg-[#E0F2FE]">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00AEEF] to-transparent" />
                
                <img 
                  src={currentAvatarUrl} 
                  alt="Preview" 
                  className="w-4/5 h-4/5 object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 z-10"
                />

                <div className="absolute -bottom-3 -right-3 bg-[#FFD166] comic-border px-4 py-2 rounded-xl text-sm font-black shadow-[4px_4px_0px_0px_#1e3a8a] rotate-[-10deg] z-20">
                  PREVIEW 👀
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full mt-4 bg-[#FF69B4] text-white comic-border rounded-2xl py-4 font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 comic-shadow-btn transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#ff47a3] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="animate-spin w-6 h-6" strokeWidth={3} /> SAVING...
                </>
              ) : (
                <>
                  LOCK IT IN <Save className="w-6 h-6" strokeWidth={3} />
                </>
              )}
            </button>
          </div>

          {/* Right Column (Style Selection) */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-4 border-[#1e3a8a] pb-4">
              <h3 className="font-black text-3xl uppercase tracking-tight">Choose your look</h3>
              <span className="bg-[#34D399] comic-border px-3 py-1 text-sm font-black rounded-full comic-shadow-sm rotate-2">
                {AVATAR_STYLES.length} STYLES
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {AVATAR_STYLES.map((style) => {
                const isSelected = selectedStyle === style.id;
                const previewUrl = `https://api.dicebear.com/7.x/${style.id}/svg?seed=${seedName}`;

                return (
                  <div 
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`
                      cursor-pointer relative overflow-hidden rounded-2xl comic-border transition-all duration-300
                      ${isSelected 
                        ? 'bg-[#FFD166] active-style-ring scale-[1.05] z-10 shadow-none' 
                        : 'bg-white hover:bg-[#f1f5f9] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e3a8a]'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#FF69B4] text-white comic-border rounded-full p-1.5 z-20 shadow-[2px_2px_0px_#1e3a8a]">
                        <Check className="w-4 h-4" strokeWidth={4} />
                      </div>
                    )}

                    <div className="p-4 flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full comic-border bg-white overflow-hidden shadow-inner flex items-center justify-center">
                        <img src={previewUrl} alt={style.name} className="w-[120%] h-[120%] object-cover" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-black text-lg leading-tight text-[#1e3a8a]">{style.name}</h4>
                        <p className="text-xs font-bold text-gray-500 uppercase mt-1 tracking-wider">{style.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Doraemon's Tip Area */}
            <div className="bg-[#FFD166] comic-border rounded-2xl p-5 flex gap-4 items-start mt-4 comic-shadow-sm relative">
              <div className="absolute -top-4 -left-4 bg-white comic-border rounded-full p-2 rotate-[-15deg] shadow-[2px_2px_0px_#1e3a8a]">
                 <BellRing className="w-6 h-6 text-[#FF69B4]" strokeWidth={2.5} />
              </div>
              <div className="pl-6">
                <h5 className="font-black text-xl uppercase mb-1">Doraemon's Tip 🐱</h5>
                <p className="font-semibold text-[#1e3a8a] text-[15px] leading-relaxed">
                  Your avatar is generated using 4D Pocket tech! The alias <b>"{seedName}"</b> will always look exactly like this in the <b>{AVATAR_STYLES.find(s => s.id === selectedStyle)?.name}</b> dimension.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- MARQUEE BOTTOM BAR --- */}
      <div className="relative w-full overflow-hidden comic-border border-x-0 border-b-0 bg-[#FF69B4] py-3 font-dora z-30 mt-auto">
        <div className="animate-marquee flex gap-10 whitespace-nowrap text-xl font-black tracking-widest text-white">
          <span>🚁 BAMBOO COPTER • NO RATS ALLOWED 🐭🚫 • TIME PATROL SECURE • GIAN IS WATCHING 🎤 • 🥞 DORAYAKI TOLL REQUIRED • </span>
          <span>🚁 BAMBOO COPTER • NO RATS ALLOWED 🐭🚫 • TIME PATROL SECURE • GIAN IS WATCHING 🎤 • 🥞 DORAYAKI TOLL REQUIRED • </span>
        </div>
      </div>

    </div>
  );
};