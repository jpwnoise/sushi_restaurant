export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-dark-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dragon-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="animate-on-scroll text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-dragon-500/10 border border-dragon-500/20">
            <span className="text-sm text-dark-300">🍣 Nosotros</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Sabor{' '}
            <span className="bg-gradient-to-r from-dragon-400 to-fire-400 bg-clip-text text-transparent">
              Auténtico
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { emoji: '🍣', title: 'Sushi Fresco', desc: 'Preparado al momento con ingredientes del día.', color: 'from-dragon-500/10 to-dragon-600/10' },
            { emoji: '', title: 'Tepanyaki', desc: 'Cocinado en plancha con verduras frescas.', color: 'from-fire-500/10 to-fire-600/10' },
            { emoji: '🍜', title: 'Ramen', desc: 'Caldo rico con pasta y toppings abundantes.', color: 'from-gold-500/10 to-gold-600/10' },
            { emoji: '🥢', title: '80+ Productos', desc: 'Variedad de sushi, ramen, combos y más.', color: 'from-dragon-500/10 to-fire-500/10' },
            { emoji: '📱', title: 'Pedido Fácil', desc: 'Ordena directo por WhatsApp.', color: 'from-fire-500/10 to-gold-500/10' },
            { emoji: '⭐', title: 'Calidad Premium', desc: 'Los mejores ingredientes en cada plato.', color: 'from-gold-500/10 to-dragon-500/10' },
          ].map((f) => (
            <div key={f.title} className={`p-6 bg-gradient-to-br ${f.color} border border-dark-600/20 rounded-2xl hover:border-dark-500/40 transition-all duration-300 hover:-translate-y-1`}>
              <span className="text-4xl block mb-4">{f.emoji}</span>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-dark-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
