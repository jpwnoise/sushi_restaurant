export default function Hero() {
  return (
    <section id="home" className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900">
      {/* Background */}
      <div className="hero-parallax absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,222,128,0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
        />
      </div>

      {/* Floating */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="float-slow absolute top-[15%] left-[8%] text-5xl opacity-15">🍣</span>
        <span className="float-fast absolute top-[25%] right-[12%] text-4xl opacity-15"></span>
        <span className="float-slow absolute bottom-[20%] left-[15%] text-5xl opacity-10">🍜</span>
        <span className="float-fast absolute top-[55%] right-[20%] text-4xl opacity-10">🥢</span>
        <span className="float-slow absolute bottom-[10%] right-[8%] text-5xl opacity-15">🍱</span>
      </div>

      {/* Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-dragon-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fire-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Background logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img src="/logo.png" alt="" className="w-64 sm:w-80 md:w-[28rem] opacity-[0.07]" aria-hidden="true" />
        </div>

        <div className="relative z-10">
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-dragon-500/10 backdrop-blur-sm border border-dragon-500/20">
          <span className="w-2 h-2 rounded-full bg-dragon-400 animate-pulse" />
          <span className="text-sm text-dark-200">Ingredientes frescos · Sabores auténticos</span>
        </div>

        <h1 className="hero-title text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-[0.95]">
          <span className="block text-white">Akemi</span>
          <span className="block bg-gradient-to-r from-dragon-400 via-fire-400 to-gold-400 bg-clip-text text-transparent">
            Sushi
          </span>
        </h1>

        <p className="hero-subtitle text-lg sm:text-xl lg:text-2xl text-dark-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          El mejor <span className="text-white font-semibold">sushi, ramen y tepanyaki</span> de la ciudad.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-gradient-to-r from-dragon-500 to-dragon-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-dragon-500/25 hover:shadow-dragon-500/40 transition-all duration-300 hover:scale-105">
            Ver Menú 🍣
          </button>
          <a href="tel:3313262108" className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl font-bold text-lg border border-dark-500/30 hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            📞 Llamar Ahora
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[{ value: '80+', label: 'Productos' }, { value: '100%', label: 'Fresco' }, { value: '⭐', label: 'Calidad' }].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-dark-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark-400 hover:text-white transition-colors">
        <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
        </div>
      </button>
    </section>
  );
}
