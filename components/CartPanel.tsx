'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';

export default function CartPanel() {
  const { items, isOpen, toggleCart, clearCart, removeFromCart, updateQty, totalPrice } = useCart();

  const buildMsg = () => {
    const list = items.map((i) => `• ${i.name} x${i.qty} ($${(i.price * i.qty).toFixed(2)})`).join('\n');
    return encodeURIComponent(`¡Hola! Quiero hacer un pedido:\n\n${list}\n\n💰 Total: $${totalPrice.toFixed(2)}\n\n¡Gracias!`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={toggleCart} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.35 }} className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-dark-800 border-l border-dark-600/30 z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-600/30">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-dragon-400" size={22} />
                <div>
                  <h2 className="text-lg font-bold text-white">Tu Pedido</h2>
                  <p className="text-xs text-dark-400">{items.length} producto{items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button onClick={toggleCart} className="text-dark-400 hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-6xl mb-4">🛒</span>
                  <p className="text-dark-300 font-medium">Tu carrito está vacío</p>
                  <p className="text-sm text-dark-500 mt-1">Agrega productos del menú</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-dark-700/50 border border-dark-600/30 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center bg-dark-800/80 rounded-lg overflow-hidden">
                            <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1.5 text-dark-400 hover:text-white">
                              <Minus size={12} />
                            </button>
                            <span className="text-white font-medium text-xs px-2">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1.5 text-dark-400 hover:text-white">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-white font-bold">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-dark-500 hover:text-red-400 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-dark-600/30 p-6 space-y-4">
                <button onClick={clearCart} className="flex items-center gap-2 text-sm text-dark-400 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                  Vaciar carrito
                </button>
                <div className="flex items-center justify-between">
                  <span className="text-dark-300">Total</span>
                  <span className="text-2xl font-black text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <a href={`https://wa.me/5213313262108?text=${buildMsg()}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-dragon-500 to-dragon-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-dragon-500/30 transition-all hover:scale-105 active:scale-95">
                  <MessageCircle size={20} />
                  Pedir por WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
