'use client';

import { useState } from 'react';
import { menuItems, categories, note } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('sushi-clasico');
  const { addToCart } = useCart();

  const filtered = menuItems.filter((p) => p.category === activeCategory);
  const currentCat = categories.find((c) => c.id === activeCategory);

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
            <MenuCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuCard({ product, onAdd }: { product: (typeof menuItems)[0]; onAdd: (id: number, name: string, price: number) => void }) {
  const [selectedOption, setSelectedOption] = useState(0);

  const getPrice = () => {
    if (product.proteinOptions) return product.proteinOptions[selectedOption].price;
    if (product.sizes) return product.sizes[0].price;
    return product.price;
  };

  return (
    <div className="menu-card group bg-dark-800/60 border border-dark-600/30 rounded-2xl overflow-hidden hover:border-dragon-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-dragon-500/5 hover:-translate-y-1">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-base font-bold text-white leading-tight">{product.name}</h4>
          {product.price === 0 && (
            <span className="px-2 py-1 bg-fire-500/20 text-fire-400 text-[10px] font-bold rounded-lg">A COTIZAR</span>
          )}
        </div>
        <p className="text-xs text-dark-400 mt-2 line-clamp-2">{product.description}</p>
      </div>

      {/* Options */}
      {(product.proteinOptions || product.sizes) && (
        <div className="px-5 pb-3">
          <div className="flex flex-wrap gap-1.5">
            {(product.proteinOptions || product.sizes || []).map((opt: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedOption === i
                    ? 'bg-dragon-500/20 text-dragon-400 border border-dragon-500/30'
                    : 'bg-dark-700/50 text-dark-400 border border-dark-600/20 hover:border-dark-500/40'
                }`}
              >
                {opt.label} ${opt.price}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-4 border-t border-dark-600/20 flex items-center justify-between">
        <span className="text-xl font-black text-white">${getPrice()}</span>
        <button
          onClick={() => onAdd(product.id, product.name, getPrice())}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-dragon-500 to-dragon-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-dragon-500/30 transition-all hover:scale-105 active:scale-95"
        >
          <ShoppingCart size={14} />
          Agregar
        </button>
      </div>
    </div>
  );
}
