import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { InstagramIcon } from '../components/icons/InstagramIcon';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSendMessage = () => {
    if (!name || !message) {
      alert('Please fill out your name and message.');
      return;
    }
    const waMessage = `Hello, I have an inquiry!%0A%0AName: ${name}%0AEmail: ${email || 'Not provided'}%0A%0AMessage:%0A${message}`;
    window.open(`https://wa.me/919315274580?text=${waMessage}`, '_blank');
    setName('');
    setEmail('');
    setMessage('');
  };

  const contactMethods = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+91 93152 74580',
      link: 'https://wa.me/919315274580',
      color: 'text-emerald-400',
      bgHover: 'group-hover:bg-emerald-400/10',
      borderHover: 'group-hover:border-emerald-400/30'
    },
    {
      id: 'instagram',
      icon: InstagramIcon,
      title: 'Instagram',
      value: '@customized_bouquets31',
      link: 'https://www.instagram.com/customized_bouquets31',
      color: 'text-pink-400',
      bgHover: 'group-hover:bg-pink-400/10',
      borderHover: 'group-hover:border-pink-400/30'
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email Support',
      value: 'hello@placeholder.com',
      link: 'mailto:hello@placeholder.com',
      color: 'text-blue-400',
      bgHover: 'group-hover:bg-blue-400/10',
      borderHover: 'group-hover:border-blue-400/30'
    }
  ];

  return (
    <div className="bg-plum-950 min-h-screen relative overflow-hidden flex flex-col justify-center py-20">
      
      {/* Ambient Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-primary/30 to-transparent blur-[120px]" 
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.3, 1] }} 
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-t from-rose-500/20 to-transparent blur-[120px]" 
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Typography and Cards */}
        <div className="flex-1 w-full text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-amber-200 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
              We're here for you
            </span>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 mb-8 leading-none">
              Let's Connect.
            </h1>
            <p className="text-xl text-white/50 font-medium tracking-wide max-w-xl mx-auto lg:mx-0 mb-12">
              Have a special request or want to customize a premium bouquet? Drop us a line.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {contactMethods.map((method, index) => (
              <motion.a 
                key={method.id}
                href={method.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className={`group relative overflow-hidden flex items-center gap-6 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 ${method.bgHover}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300 ${method.borderHover}`}>
                  <method.icon className={`w-7 h-7 ${method.color}`} />
                </div>
                
                <div>
                  <h4 className="font-bold text-white/90 text-sm uppercase tracking-widest mb-1">{method.title}</h4>
                  <p className="text-white/50 font-mono text-lg">{method.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Side: Glassmorphic Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-[500px] flex-shrink-0"
        >
          <div className="relative rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Form Inner Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/40 rounded-full blur-[80px]"></div>
            
            <h3 className="font-serif text-3xl text-white mb-8 relative z-10">Send a Message</h3>
            
            <form className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 text-white placeholder:text-white/30 transition-all" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 text-white placeholder:text-white/30 transition-all" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <textarea 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we craft your perfect gift?" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 text-white placeholder:text-white/30 transition-all resize-none"
                ></textarea>
              </div>
              
              <button 
                type="button" 
                onClick={handleSendMessage}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-full mt-4 py-5 bg-white text-plum-950 font-black tracking-[0.2em] uppercase rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-white to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Send Message
                  <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Send className="w-5 h-5" />
                  </motion.div>
                </span>
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
