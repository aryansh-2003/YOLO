import React from 'react';
import { Heart, Ghost, Instagram, Twitter, Linkedin, Send, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FFFDF5] pt-12 border-t-4 border-black font-sans text-black overflow-hidden">
      
      {/* Decorative Floating Elements (Footer Edition) */}
      <div className="absolute top-10 left-10 text-5xl opacity-20 -rotate-12 animate-pulse">👽</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-20 rotate-12">👾</div>

      {/* Marquee Strip (Static representation for simplicity) */}
      <div className="bg-[#FCD34D] border-y-2 border-black py-2 overflow-hidden whitespace-nowrap mb-10 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mx-4 sm:mx-0">
        <div className="animate-marquee inline-block font-black uppercase text-sm tracking-widest">
           ✨ NO CAP • JUST VIBES • TOUCH GRASS • DRINK WATER • MAIN CHARACTER ENERGY • SHEESH • 
           ✨ NO CAP • JUST VIBES • TOUCH GRASS • DRINK WATER • MAIN CHARACTER ENERGY • SHEESH •
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 relative z-10">
        
        {/* Column 1: Brand & Vibe */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-5xl font-black leading-none">
            YOLO<span className="text-[#6B66FF]">.</span>APP
          </h2>
          <p className="text-lg font-bold text-gray-600 max-w-xs leading-tight">
            Making the internet less boring, one pixel at a time. 
            Don't forget to like and subscribe or whatever.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-bold text-xs mt-2 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors cursor-help">
            <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-ping"></span>
            System Status: Slaying
          </div>
        </div>

        {/* Column 2: The Tea (Links) */}
        <div>
          <h3 className="font-black text-xl mb-4 uppercase border-b-4 border-[#F87171] inline-block">The Tea ☕️</h3>
          <ul className="space-y-3 font-bold">
            {['Home Base', 'Who Dis?', 'Legal Stuff (Boring)', '404 Page'].map((item) => (
              <li key={item}>
                <a href="#" className="flex items-center gap-2 hover:translate-x-2 transition-transform hover:text-[#6B66FF] group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">👉</span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Digital Footprint (Socials) */}
        <div>
          <h3 className="font-black text-xl mb-4 uppercase border-b-4 border-[#4ADE80] inline-block">Stalk Us 👀</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Instagram size={20} />, color: 'bg-[#F87171]' ,link:""},
              { icon: <Twitter size={20} />, color: 'bg-[#60A5FA]', link:"" },
              { icon: <Linkedin size={20} />, color: 'bg-[#FCD34D]',link:"https://www.linkedin.com/in/aryansh-dixit-1046b2305" },
              { icon: <Ghost size={20} />, color: 'bg-white',link:"" },
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.link} 
                target='_blank'
                className={`${social.color} w-10 h-10 flex items-center justify-center border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-none transition-all`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          {/* Mini Newsletter */}
          <div className="mt-6">
            <label className="text-xs font-bold block mb-1">Don't get FOMO</label>
            <div className="flex">
                <input type="email" placeholder="email@sus.com" className="w-full border-2 border-black border-r-0 rounded-l-lg px-3 py-1 text-sm bg-white outline-none font-bold" />
                <button className="bg-black text-white px-3 border-2 border-black rounded-r-lg hover:bg-[#6B66FF] transition-colors">
                    <Send size={16} />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-white p-4 border-t-2 border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-bold text-xs text-center md:text-left">
          © {new Date().getFullYear()} You. Built with <Heart className="inline w-3 h-3 text-red-500 fill-red-500" /> and too much caffeine.
        </p>
        
        <div className="flex items-center gap-4">
             <span className="text-[10px] font-mono text-gray-400">v4.2.0 (nice)</span>
            <button 
                onClick={scrollToTop}
                className="bg-[#FFFDF5] text-black p-2 rounded-lg border-2 border-white hover:bg-[#FCD34D] hover:border-black transition-colors"
                title="Yeet to top"
            >
                <ArrowUp size={20} strokeWidth={3} />
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;