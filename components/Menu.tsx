'use client';

import { useState } from 'react';
import { menuItems, categories, note } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, ShoppingCart, X } from 'lucide-react';

// Rice options modal
function RiceModal({ product, onClose, onConfirm }: {
  product: (typeof menuItems)[0];
  onClose: () => void;
  onConfirm: (rice: string) => void;
}) {
  const [selected, setSelected] = useState<string>('gohan');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-dark-800 border border-dark-600/40 rounded-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">¿Con qué arroz?</h3>
          <button onClick={onClose} className="text-dark-400 hover:text-white"><X size={20} /></button>
        </div>
        <p className="text-sm text-dark-400 mb-4">{product.name}</p>
        <div className="space-y-3">
          {[
            { id: 'gohan', label: 'Gohan', desc: 'Arroz blanco japonés' },
            { id: 'yakimeshi', label: 'Yakimeshi', desc: 'Arroz frito con verduras' },
            { id: 'sin', label: 'Sin arroz', desc: 'Solo verduras y proteína' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selected === opt.id
                  ? 'border-dragon-500/50 bg-dragon-500/10'
                  : 'border-dark-600/30 bg-dark-700/50 hover:border-dark-500/50'
              }`}
            >
              <div className="font-semibold text-white">{opt.label}</div>
              <div className="text-xs text-dark-400">{opt.desc}</div>
            </button>
          ))}
        </div>
        <button
          onClick={() => onConfirm(selected)}
          className="w-full mt-4 py-3 bg-gradient-to-r from-dragon-500 to-dragon-600 text-white rounded-xl font-bold hover:scale-105 transition-all active:scale-95"
        >
          Confirmar y Agregar
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('sushi-clasico');
  const { addToCart } = useCart();
  const [riceModal, setRiceModal] = useState<(typeof menuItems)[0] | null>(null);

  const filtered = menuItems.filter((p) => p.category === activeCategory);
  const currentCat = categories.find((c) => c.id === activeCategory);

  const handleAdd = (product: (typeof menuItems)[0]) => {
    if (product.category === 'tepanyaki') {
      setRiceModal(product);
    } else {
      onAdd(product);
    }
  };

  const onAdd = (product: (typeof menuItems)[0], rice?: string) => {
    const name = rice ? `${product.name} (${rice})` : product.name;
    addToCart(product.id + (rice ? rice.length : 0), name, getPrice(product));
  };

  const getPrice = (product: (typeof menuItems)[0]) => {
    if (product.proteinOptions) return product.proteinOptions[0].price;
    if (product.sizes) return product.sizes[0].price;
    return product.price;
  };

  return (
    <section id="menu" className="relative py-24 md:py-32 bg-dark-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 via-dark-900 to-dark-800/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dragon-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-dragon-500/10 border border-dragon-500/20">
            <span className="text-sm text-dark-300">🍽️ Nuestro Menú</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Sabores{' '}
            <span className="bg-gradient-to-r from-dragon-400 to-fire-400 bg-clip-text text-transparent">
              Premium
            </span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            {note}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-dragon-500 to-dragon-600 text-white shadow-lg shadow-dragon-500/25'
                  : 'bg-dark-700/50 text-dark-300 border border-dark-600/30 hover:border-dark-500/50'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">{currentCat?.icon}</span>
          <h3 className="text-2xl font-bold text-white">{currentCat?.name}</h3>
          <div className="flex-1 h-px bg-dark-600/50" />
        </div>

        {/* Products grid */}
        <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="menu-card group relative bg-dark-800/60 border border-dark-600/30 rounded-2xl overflow-visible hover:border-dragon-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-dragon-500/5"
              style={{ perspective: '1000px' }}
            >
              {/* Image with float animation */}
              {product.image && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 z-20" style={{ transform: 'translateX(-50%) translateY(0)' }}>
                  <div className="animate-float-img w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                      style={{
                        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Card content */}
              <div className={`pt-5 ${product.image ? 'pt-20' : ''}`}>
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-bold text-white leading-tight">{product.name}</h4>
                    {product.price === 0 && (
                      <span className="px-2 py-1 bg-fire-500/20 text-fire-400 text-[10px] font-bold rounded-lg">A COTIZAR</span>
                    )}
                  </div>
                  <p className="text-xs text-dark-400 mt-2 line-clamp-2">{product.description}</p>
                </div>

                {(product.proteinOptions || product.sizes) && (
                  <div className="px-5 pb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {(product.proteinOptions || product.sizes || []).map((opt: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => {}}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-dark-700/50 text-dark-400 border border-dark-600/20 hover:border-dark-500/40"
                        >
                          {opt.label} ${opt.price}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-5 py-4 border-t border-dark-600/20 flex items-center justify-between">
                  <span className="text-xl font-black text-white">
                    ${product.proteinOptions ? product.proteinOptions[0].price : product.sizes ? product.sizes[0].price : product.price}
                  </span>
                  <button
                    onClick={() => handleAdd(product)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-dragon-500 to-dragon-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-dragon-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <ShoppingCart size={14} />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rice modal */}
      {riceModal && (
        <RiceModal
          product={riceModal}
          onClose={() => setRiceModal(null)}
          onConfirm={(rice) => {
            onAdd(riceModal, rice);
            setRiceModal(null);
          }}
        />
      )}
    </section>
  );
}
