'use client';

import { useState, useEffect } from 'react';
import { menuItems, categories, note } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, ShoppingCart, X, ChefHat, Crown, Flame, Utensils, Gift, CirclePlus, Coffee, type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/Loading';
import SkeletonCard from '@/components/SkeletonCard';

const iconMap: Record<string, LucideIcon> = {
  Salad: ChefHat,
  Crown,
  Flame,
  Utensils,
  Gift,
  Candy: Coffee,
  PlusCircle: CirclePlus,
  Coffee,
};

function CategoryIcon({ name, color }: { name: string; color?: string }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return (
    <Icon
      size={18}
      strokeWidth={2.5}
      style={{ color }}
      className="drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]"
    />
  );
}

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

// Product detail modal
function ProductDetailModal({ product, onClose, onAdd }: {
  product: (typeof menuItems)[0];
  onClose: () => void;
  onAdd: (product: (typeof menuItems)[0]) => void;
}) {
  const getPrice = (product: (typeof menuItems)[0]) => {
    if (product.proteinOptions) return product.proteinOptions[0].price;
    if (product.sizes) return product.sizes[0].price;
    return product.price;
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-dark-800 border border-dark-600/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-900/80 backdrop-blur-sm text-white flex items-center justify-center hover:bg-dark-900 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Product image */}
        {product.image && (
          <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-dragon-500/10 to-fire-500/10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />
          </div>
        )}

        {/* Product info */}
        <div className="p-6 -mt-8 relative z-10">
          <h3 className="text-2xl font-bold text-white mb-3">{product.name}</h3>
          
          <p className="text-dark-300 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Protein/Size options */}
          {(product.proteinOptions || product.sizes) && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-dark-400 mb-3">Opciones disponibles:</h4>
              <div className="flex flex-wrap gap-2">
                {(product.proteinOptions || product.sizes || []).map((opt: any, i: number) => (
                  <div
                    key={i}
                    className="px-3 py-2 rounded-xl text-xs font-medium bg-dark-700/50 text-dark-300 border border-dark-600/30"
                  >
                    {opt.label} · ${opt.price}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price and Add button */}
          <div className="flex items-center justify-between pt-4 border-t border-dark-600/30">
            <div>
              <span className="text-sm text-dark-400">Precio desde</span>
              <div className="text-3xl font-black text-white">${getPrice(product)}</div>
            </div>
            <button
              onClick={() => onAdd(product)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-dragon-500 to-dragon-600 text-white rounded-xl font-bold text-base hover:shadow-lg hover:shadow-dragon-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingCart size={18} />
              Agregar al pedido
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('sushi-clasico');
  const { addToCart } = useCart();
  const [riceModal, setRiceModal] = useState<(typeof menuItems)[0] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<(typeof menuItems)[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const filtered = menuItems.filter((p) => p.category === activeCategory);
  const currentCat = categories.find((c) => c.id === activeCategory);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Animate cards when category changes or loading finishes
  useEffect(() => {
    if (isLoading) return;
    
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach((card, index) => {
      const delay = index * 80;
      setTimeout(() => {
        card.animate(
          { opacity: [0, 1], transform: ['translateY(30px) scale(0.95)', 'translateY(0) scale(1)'] },
          { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
        );
      }, delay);
    });
  }, [activeCategory, isLoading]);

  // Track loaded images
  const handleImageLoad = (imagePath: string) => {
    setLoadedImages((prev) => new Set(prev).add(imagePath));
  };

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
              <CategoryIcon name={cat.icon} color={activeCategory === cat.id ? '#ffffff' : cat.color} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl" style={{ color: currentCat?.color }}>
            <CategoryIcon name={currentCat?.icon || ''} color={currentCat?.color} />
          </span>
          <h3 className="text-2xl font-bold text-white">{currentCat?.name}</h3>
          <div className="flex-1 h-px bg-dark-600/50" />
        </div>

        {/* Loading animation */}
        {isLoading && (
          <div className="flex justify-center mb-12">
            <Loading size={180} />
          </div>
        )}

        {/* Products grid */}
        <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" key={activeCategory}>
          {isLoading ? (
            // Show skeleton cards while loading
            Array.from({ length: Math.min(filtered.length, 6) }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))
          ) : (
            filtered.map((product, index) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="menu-card group relative bg-dark-800/60 border border-dark-600/30 rounded-2xl overflow-visible hover:border-dragon-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-dragon-500/5"
                style={{ 
                  perspective: '1000px',
                  opacity: 0,
                  transform: 'translateY(30px) scale(0.95)'
                }}
              >
                {/* Background image with blur and transparency */}
                {product.image && (
                  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'blur(4px) brightness(1)',
                        transform: 'scale(1.15)',
                        opacity: .2,
                      }}
                      onLoad={() => handleImageLoad(product.image!)}
                    />
                    <div className="absolute inset-0 bg-dark-900/50" />
                  </div>
                )}

                {/* Floating image */}
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
                        onLoad={() => handleImageLoad(product.image!)}
                      />
                    </div>
                  </div>
                )}

                {/* Card content */}
                <div className={`relative z-10 pt-5 ${product.image ? 'pt-20' : ''}`}>
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-base font-bold text-white leading-tight">{product.name}</h4>
                      {product.price === 0 && (
                        <span className="px-2 py-1 bg-fire-500/20 text-fire-400 text-[10px] font-bold rounded-lg">A COTIZAR</span>
                      )}
                    </div>
                    <p className="text-xs text-dark-200 mt-2 line-clamp-4">{product.description}</p>
                  </div>

                  {(product.proteinOptions || product.sizes) && (
                    <div className="px-5 pb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(product.proteinOptions || product.sizes || []).map((opt: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => {}}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-dark-700/50 text-dark-300 border border-dark-200/20 hover:border-dark-500/40"
                          >
                            {opt.label} ${opt.price}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="px-5 py-4 border-t border-dark-600/20 flex items-center justify-between gap-3">
                    <span className="text-xl font-black text-white">
                      ${product.proteinOptions ? product.proteinOptions[0].price : product.sizes ? product.sizes[0].price : product.price}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-3 py-2 bg-dark-700/50 text-dark-300 border border-dark-600/30 rounded-xl font-semibold text-sm hover:border-dragon-500/40 hover:text-white transition-all"
                      >
                        Ver
                      </button>
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
              </div>
            ))
          )}
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

      {/* Product detail modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAdd={(product) => {
              handleAdd(product);
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
