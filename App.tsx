import React, { useState, useEffect } from 'react';
import { Product, PageView, PHONE_1, PHONE_2, WA_GROUP_LINK, INSTAGRAM_LINK } from './types';
import { getProductsForPage, products } from './data';

// --- Components ---

const CountUp = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      
      if (progress < duration) {
        const percentage = progress / duration;
        // Ease out quart function for smooth slowing down
        const easeOut = 1 - Math.pow(1 - percentage, 4);
        setCount(Math.floor(easeOut * end));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}+</span>;
};

const Header = ({ setView, currentView }: { setView: (v: PageView) => void, currentView: PageView }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 glass-panel border-b-0 shadow-lg transition-all duration-300">
      <div className="bg-gradient-to-r from-rose-900 to-slate-900 text-white text-center text-[10px] py-1 tracking-[0.2em] font-bold">
        SHIPPING AVAILABLE ALL OVER KERALA
      </div>
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="h-24 w-auto max-w-[320px] p-1 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center md:justify-start">
               {!logoError ? (
                 <img 
                   src="images/logo.png" 
                   alt="Ladies Choice - Since 1995" 
                   className="h-full w-full object-contain"
                   onError={() => setLogoError(true)}
                 />
               ) : (
                 // Fallback if logo.png is missing
                 <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-rose-500 border-2 border-rose-500 rounded-full w-12 h-12 flex items-center justify-center">
                      LC
                    </div>
                    <div className="text-left">
                      <h1 className="text-xl font-bold text-white serif tracking-tight leading-none">
                        LADIES <span className="text-rose-500">CHOICE</span>
                      </h1>
                      <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-medium mt-1">
                        Calicut • Since 1995
                      </p>
                    </div>
                 </div>
               )}
            </div>
          </div>
  
          {/* Navigation */}
          <nav className="flex gap-2 text-xs font-semibold uppercase tracking-wider">
            {[
              { id: 'home', label: 'Home' },
              { id: 'page1', label: 'Collections' },
              { id: 'about', label: 'About' }
            ].map((navItem) => (
              <button 
                key={navItem.id}
                onClick={() => setView(navItem.id as PageView)}
                className={`px-4 py-2 rounded-full transition-all duration-300 border ${
                  (navItem.id === 'home' && currentView === 'home') || 
                  (navItem.id === 'page1' && currentView.startsWith('page')) ||
                  (navItem.id === 'about' && currentView === 'about')
                    ? 'bg-rose-600 border-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.5)]' 
                    : 'bg-transparent border-slate-700 text-slate-300 hover:border-rose-500 hover:text-rose-400'
                }`}
              >
                {navItem.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">
      
      {/* Brand Info */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold serif text-white">Ladies Choice</h3>
        <p className="text-sm opacity-60 leading-relaxed font-light">
          Redefining elegance for over 35 years. We blend traditional craftsmanship with futuristic vision to create garments that speak for themselves.
        </p>
        <div className="flex gap-4 pt-2">
           <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 transition text-white"><i className="fab fa-instagram"></i></a>
           <a href={`https://wa.me/${PHONE_1}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 transition text-white"><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>

      {/* Quick Contact */}
      <div>
        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs border-b border-rose-900/50 pb-2 inline-block">Contact Studio</h4>
        <div className="flex flex-col gap-4 text-sm font-light">
          <a href={`tel:+${PHONE_1}`} className="hover:text-rose-400 transition flex items-center gap-3">
            <span className="text-rose-600"><i className="fas fa-phone"></i></span> +{PHONE_1}
          </a>
          <a href={`tel:+${PHONE_2}`} className="hover:text-rose-400 transition flex items-center gap-3">
            <span className="text-rose-600"><i className="fas fa-mobile-alt"></i></span> +{PHONE_2}
          </a>
          <div className="flex items-start gap-3">
            <span className="text-rose-600 mt-1"><i className="fas fa-map-marker-alt"></i></span> 
            <span>Airport Road, Calicut,<br/>Kerala, India</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-48 bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative border border-slate-800 group">
         <iframe 
           title="Shop Location"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.969314421689!2d75.7891!3d11.2645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6593f6c83f3bf%3A0x6b47c0c1b00e3f8!2sAirport%20Road%2C%20Kozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
           width="100%" 
           height="100%" 
           style={{border:0, filter: 'invert(90%) hue-rotate(180deg)'}} 
           allowFullScreen={true} 
           loading="lazy"
           className="opacity-70 group-hover:opacity-100 transition duration-500"
         ></iframe>
      </div>
    </div>
    <div className="text-center text-[10px] text-slate-600 mt-12 uppercase tracking-widest">
      © 2024 Ladies Choice Calicut. Future of Fashion.
    </div>
  </footer>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // Correctly formatted message as requested
  const whatsappMessage = `I am interested in this model (${product.name}). Please contact me`;
  const whatsappUrl = `https://wa.me/${PHONE_1}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="glass-card rounded-xl overflow-hidden group flex flex-col h-full relative hover:border-rose-500/30">
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="relative aspect-[3/4] overflow-hidden block cursor-pointer">
        <div className="absolute inset-0 bg-rose-500/10 z-10 group-hover:bg-rose-500/0 transition duration-500"></div>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e293b/be123c?text=Model+${product.id}`;
          }}
        />
        <div className="absolute top-3 left-3 z-20">
             <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
               New Arrival
             </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-30">
           <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition">
             <i className="fab fa-whatsapp"></i> Buy Now
           </span>
        </div>
      </a>
      <div className="p-5 flex flex-col flex-grow relative z-20">
        <h3 className="font-serif text-lg text-slate-100 mb-1 group-hover:text-rose-400 transition">{product.name}</h3>
        <p className="text-sm text-slate-400 mb-4">Custom Fit Available</p>
        <div className="flex items-center justify-between mt-auto">
           <p className="text-xl font-bold text-white">{product.price}</p>
           <a 
             href={whatsappUrl} 
             target="_blank" 
             rel="noreferrer"
             className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:scale-110 transition"
           >
             <i className="fab fa-whatsapp text-lg"></i>
           </a>
        </div>
      </div>
    </div>
  );
};

const SlideshowHero = ({ setView }: { setView: (v: PageView) => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Prioritize the user provided experience banner
  const slides = [
    'images/experience_banner.jpg', 
    ...products.slice(0, 3).map(p => p.image)
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[85vh] w-full slideshow-container bg-slate-900">
      {/* Slides */}
      {slides.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`slide-image ${index === currentSlide ? 'active' : ''}`}
          onError={(e) => {
             // If experience_banner.jpg fails, we fallback to a high quality unplash image that matches the description
             if (index === 0) {
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop";
             } else {
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551488852-0801751acbe3?q=80&w=2070&auto=format&fit=crop";
             }
          }}
        />
      ))}
      <div className="absolute inset-0 slide-overlay pointer-events-none"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
        <div className="glass-panel p-8 md:p-12 rounded-2xl max-w-4xl text-center border border-white/10 shadow-2xl backdrop-blur-xl animate-fade-in">
          <p className="text-rose-400 tracking-[0.3em] text-xs font-bold uppercase mb-4">Dress Makers Calicut</p>
          <h2 className="serif text-4xl md:text-6xl text-white mb-6 leading-tight drop-shadow-lg">
            <span className="inline-block min-w-[200px]">
              <CountUp end={30000} duration={2500} />
            </span> Happy Customers <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-rose-400 italic text-3xl md:text-5xl">
              & Still Counting
            </span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-8 max-w-2xl mx-auto">
            Experience the future of fashion with <strong className="text-white">Ladies Choice</strong>. 
            35+ years of stitching perfection. We design your imagination.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
               onClick={() => setView('page1')}
               className="bg-white text-rose-900 px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-rose-50 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]"
             >
               View Collection
             </button>
             <a 
               href={WA_GROUP_LINK}
               target="_blank" 
               rel="noreferrer"
               className="glass-panel text-white border border-white/20 px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition flex items-center justify-center gap-2"
             >
               <i className="fab fa-whatsapp"></i> Join Updates
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Views ---

const HomeView = ({ setView }: { setView: (v: PageView) => void }) => {
  // Show first 6 products on homepage
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="pb-20 pt-16">
      <SlideshowHero setView={setView} />

      <div className="container mx-auto px-4 mt-20">
        <div className="flex items-end justify-between mb-12 border-b border-slate-800 pb-4">
          <div>
            <h2 className="serif text-3xl md:text-4xl text-white">Latest Collection</h2>
            <p className="text-rose-400 text-sm mt-1 uppercase tracking-widest">Fresh from the studio</p>
          </div>
          <button 
            onClick={() => setView('page1')}
            className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition uppercase text-xs font-bold tracking-widest"
          >
            View All <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button 
            onClick={() => setView('page1')}
            className="text-white border border-slate-700 px-8 py-3 rounded-full uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-slate-900 transition"
          >
            View All Designs
          </button>
        </div>
      </div>

      {/* Stats/Info Section */}
      <div className="container mx-auto px-4 mt-24">
         <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-xl text-center">
               <i className="fas fa-shipping-fast text-3xl text-rose-500 mb-4"></i>
               <h4 className="text-white font-bold uppercase tracking-wider mb-2">Kerala Shipping</h4>
               <p className="text-slate-400 text-xs">Fast & Secure delivery to your doorstep.</p>
            </div>
            <div className="glass-panel p-8 rounded-xl text-center">
               <i className="fas fa-magic text-3xl text-rose-500 mb-4"></i>
               <h4 className="text-white font-bold uppercase tracking-wider mb-2">Custom Design</h4>
               <p className="text-slate-400 text-xs">You dream it, we stitch it to perfection.</p>
            </div>
            <div className="glass-panel p-8 rounded-xl text-center">
               <i className="fas fa-clock text-3xl text-rose-500 mb-4"></i>
               <h4 className="text-white font-bold uppercase tracking-wider mb-2">Since 1995</h4>
               <p className="text-slate-400 text-xs">35 years of trusted service & quality.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const ProductsView = ({ viewStr, setView }: { viewStr: string, setView: (v: PageView) => void }) => {
  const items = getProductsForPage(viewStr);

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen pt-32">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="serif text-4xl md:text-5xl text-white mb-4">The Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto"></div>
        <p className="text-slate-400 mt-4 max-w-lg mx-auto font-light">
          Browse our exclusive range. Designed for elegance, stitched for comfort.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fade-in">
        {items.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Futuristic Pagination */}
      <div className="flex justify-center items-center gap-4">
        {['page1', 'page2', 'page3'].map((page) => (
          <button 
            key={page}
            onClick={() => setView(page as PageView)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
              viewStr === page 
              ? 'bg-rose-600 border-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.6)] scale-110' 
              : 'bg-transparent border-slate-700 text-slate-500 hover:border-rose-500 hover:text-rose-400'
            }`}
          >
            {page.replace('page', '')}
          </button>
        ))}
      </div>
    </div>
  );
};

const AboutView = () => (
  <div className="container mx-auto px-4 py-24 min-h-screen pt-32 animate-fade-in">
    <div className="max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <div className="grid md:grid-cols-2">
          <div className="bg-slate-800 relative h-full min-h-[400px]">
             {/* Updated with the experience banner image */}
             <img 
               src="images/experience_banner.jpg" 
               alt="Expert Ladies Tailoring" 
               className="absolute inset-0 w-full h-full object-cover"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop";
               }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="serif text-3xl text-white mb-6">About Ladies Choice</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed font-light text-sm md:text-base">
              <p>
                <strong className="text-white">Ladies Choice Calicut</strong> is not just a boutique; it's a tradition of elegance. 
                For over 35 years, we have been stitching stories of style for women across Kerala.
              </p>
              <p>
                What started as a passion for perfect fits has grown into a community of over <strong className="text-white">30,000 happy customers</strong>. 
                We specialize in blending traditional designs with modern aesthetics.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="border border-slate-700 p-4 rounded-lg">
                  <div className="text-rose-500 font-bold text-xl mb-1">35+</div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">Years Experience</div>
                </div>
                <div className="border border-slate-700 p-4 rounded-lg">
                  <div className="text-rose-500 font-bold text-xl mb-1">
                    <CountUp end={30000} />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">Happy Clients</div>
                </div>
              </div>

              <div className="pt-6">
                <a 
                   href={WA_GROUP_LINK}
                   target="_blank" 
                   rel="noreferrer"
                   className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-green-900/50"
                >
                   <i className="fab fa-whatsapp mr-2"></i> Join Our WhatsApp Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<PageView>('home');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      <Header setView={setView} currentView={view} />
      
      <main className="flex-grow">
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'about' && <AboutView />}
        {(view === 'page1' || view === 'page2' || view === 'page3') && (
          <ProductsView viewStr={view} setView={setView} />
        )}
      </main>

      <Footer />
    </div>
  );
}