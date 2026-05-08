import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import Atropos from 'atropos/react';
import 'atropos/css';
import {
  ArrowRight,
  MessageCircle,
  Users,
  Globe,
  Shield,
  Zap,
  Sparkles,
  Play,
  Volume2,
  VolumeX,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import song from '../assets/doremon.mp3';

// Floating 3D Element Component
const Float3D = ({ children, delay = 0, duration = 6, y = 20, rotate = 5 }) => {
  return (
    <motion.div
      animate={{
        y: [-y, y, -y],
        rotateX: [-rotate, rotate, -rotate],
        rotateY: [rotate, -rotate, rotate],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// 3D Card Component
const Card3D = ({ children, className, glowColor = "rgba(0, 174, 239, 0.3)" }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateY.set((e.clientX - centerX) * 0.02);
    rotateX.set((centerY - e.clientY) * 0.02);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        boxShadow: `0 25px 50px -12px ${glowColor}`,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated Counter
const AnimatedCounter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

// Particle Field Background
const ParticleField = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Feature data
const FEATURES = [
  {
    icon: Users,
    title: "Connect Instantly",
    description: "Meet fascinating people from around the world in real-time conversations",
    gradient: "from-[#00AEEF] to-[#0077B6]",
    delay: 0.1,
  },
  {
    icon: MessageCircle,
    title: "Lightning Fast",
    description: "Experience seamless messaging with zero lag and instant delivery",
    gradient: "from-[#FF69B4] to-[#E91E63]",
    delay: 0.2,
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Join chat rooms spanning every timezone and culture imaginable",
    gradient: "from-[#FFD166] to-[#F4A261]",
    delay: 0.3,
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your conversations stay yours with end-to-end encryption",
    gradient: "from-[#2A9D8F] to-[#1E6F5C]",
    delay: 0.4,
  },
  {
    icon: Zap,
    title: "Smart Matching",
    description: "Our AI connects you with people who share your interests",
    gradient: "from-[#9B59B6] to-[#6C3483]",
    delay: 0.5,
  },
  {
    icon: Sparkles,
    title: "Rich Experience",
    description: "Express yourself with reactions, GIFs, and custom themes",
    gradient: "from-[#E74C3C] to-[#C0392B]",
    delay: 0.6,
  },
];

// Stats data
const STATS = [
  { value: 50000, label: "Active Users", suffix: "+" },
  { value: 120, label: "Countries", suffix: "+" },
  { value: 99, label: "Uptime", suffix: "%" },
  { value: 5, label: "Star Rating", suffix: "/5" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -100]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden"
      style={{ perspective: '1000px' }}
    >
      <audio ref={audioRef} src={song} loop />
      
      {/* Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1b2a] to-[#1b263b]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00AEEF]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF69B4]/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#FFD166]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <ParticleField />

      {/* Music Toggle */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </motion.button>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0077B6] flex items-center justify-center shadow-lg shadow-[#00AEEF]/30">
              <span className="text-xl font-bold">D</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">DoraChat</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Community', 'About'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00AEEF] to-[#FF69B4] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <MagneticButton
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300"
          >
            Get Started
          </MagneticButton>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
                <span className="text-sm font-medium text-white/70">10,000+ online now</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="block">Connect with</span>
                <span className="block mt-2">
                  <span className="bg-gradient-to-r from-[#00AEEF] via-[#FF69B4] to-[#FFD166] bg-clip-text text-transparent">
                    anyone, anywhere
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed"
              >
                Experience the magic of spontaneous conversations. Meet new friends, 
                share stories, and explore connections that transcend borders.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <MagneticButton
                  onClick={() => navigate('/login')}
                  className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#00AEEF] to-[#0077B6] text-white font-semibold text-lg shadow-lg shadow-[#00AEEF]/30 hover:shadow-[#00AEEF]/50 transition-all duration-300 flex items-center gap-3"
                >
                  Start Chatting
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#0a0a1a] bg-gradient-to-br from-[#00AEEF] to-[#FF69B4] flex items-center justify-center text-xs font-bold"
                      style={{ zIndex: 5 - i }}
                    >
                      {String.fromCharCode(65 + i - 1)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-white">50,000+</span>
                  <span className="text-white/60"> happy users</span>
                </div>
              </motion.div>
            </div>

            {/* Right - 3D Chat Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <Atropos
                className="atropos-banner"
                shadow={false}
                highlight={false}
                rotateXMax={15}
                rotateYMax={15}
              >
                <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                  {/* Main Chat Window */}
                  <div 
                    data-atropos-offset="5"
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-2xl"
                  >
                    {/* Chat Header */}
                    <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0077B6] flex items-center justify-center">
                        <span className="text-xl">D</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Global Chat</h3>
                        <p className="text-sm text-white/50">1,234 online</p>
                      </div>
                      <div className="ml-auto flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#2A9D8F]" />
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-4 py-6">
                      {[
                        { name: "Alex", msg: "Hey everyone! Just joined", color: "#00AEEF" },
                        { name: "Mika", msg: "Welcome to the community!", color: "#FF69B4" },
                        { name: "Sam", msg: "This app is amazing", color: "#FFD166" },
                      ].map((chat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + i * 0.3 }}
                          className="flex items-start gap-3"
                        >
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${chat.color}, ${chat.color}80)` }}
                          >
                            {chat.name[0]}
                          </div>
                          <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2">
                            <p className="text-sm text-white/90">{chat.msg}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-3">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 bg-transparent text-sm placeholder:text-white/30 outline-none"
                          readOnly
                        />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00AEEF] to-[#0077B6] flex items-center justify-center">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <Float3D delay={0} y={15}>
                    <div 
                      data-atropos-offset="10"
                      className="absolute -top-8 -right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFD166] to-[#F4A261] flex items-center justify-center shadow-lg shadow-[#FFD166]/30"
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </Float3D>

                  <Float3D delay={1} y={12}>
                    <div 
                      data-atropos-offset="8"
                      className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF69B4] to-[#E91E63] flex items-center justify-center shadow-lg shadow-[#FF69B4]/30"
                    >
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                  </Float3D>

                  <Float3D delay={2} y={10}>
                    <div 
                      data-atropos-offset="12"
                      className="absolute top-1/4 -left-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#2A9D8F] to-[#1E6F5C] flex items-center justify-center shadow-lg shadow-[#2A9D8F]/30"
                    >
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                  </Float3D>
                </div>
              </Atropos>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/40"
            >
              <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  <AnimatedCounter target={stat.value} />
                  {stat.suffix}
                </div>
                <p className="mt-2 text-white/50 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Powerful features designed to make your conversations more meaningful and engaging
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                viewport={{ once: true }}
              >
                <Card3D
                  glowColor={feature.gradient.includes('#00AEEF') ? 'rgba(0, 174, 239, 0.2)' : feature.gradient.includes('#FF69B4') ? 'rgba(255, 105, 180, 0.2)' : 'rgba(255, 209, 102, 0.2)'}
                  className="group h-full p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.description}</p>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00AEEF]/20 via-[#FF69B4]/20 to-[#FFD166]/20 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to start chatting?
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                Join thousands of people already connecting on DoraChat. 
                Your next great conversation is just a click away.
              </p>
              <MagneticButton
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#0a0a1a] font-semibold text-lg shadow-xl shadow-white/20 hover:shadow-white/30 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00AEEF] to-[#0077B6] flex items-center justify-center">
              <span className="text-sm font-bold">D</span>
            </div>
            <span className="font-semibold">DoraChat</span>
          </div>
          <p className="text-sm text-white/40">
            Made with care for meaningful connections
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Support'].map((item) => (
              <a key={item} href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
