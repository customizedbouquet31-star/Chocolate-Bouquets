import { MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../icons/InstagramIcon';

export default function CustomizationCTA() {
  return (
    <section className="py-8 md:py-12 bg-plum-950 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[100%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[80%] rounded-full bg-lavender-500/10 blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-8 border border-white/10 backdrop-blur-sm">
          <MessageCircle className="w-8 h-8 text-lavender-300" />
        </div>
        
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white">
          Message to <span className="italic text-lavender-300 font-light">Customize Yours</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/70 mb-6 max-w-2xl mx-auto leading-relaxed">
          Tell us the occasion, budget, colours, chocolates, photos and theme. We'll turn your idea into a beautiful gift.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a 
            href="https://wa.me/919315274580"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold tracking-wider hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20 transform hover:-translate-y-1"
          >
            <MessageCircle className="w-5 h-5" />
            WHATSAPP DM
          </a>
          
          <a 
            href="https://www.instagram.com/customized_bouquets31?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full font-bold tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#fd1d1d]/20 transform hover:-translate-y-1"
          >
            <InstagramIcon className="w-5 h-5" />
            INSTAGRAM DM
          </a>
        </div>
      </div>
    </section>
  );
}
