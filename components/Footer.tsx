'use client';

import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-dark-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 to-dark-900" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-dragon-500/10 border border-dragon-500/20">
            <span className="text-sm text-dark-300">📞 Contacto</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Haz tu{' '}
            <span className="bg-gradient-to-r from-dragon-400 to-fire-400 bg-clip-text text-transparent">
              Pedido
            </span>
          </h2>
        </div>

        <div className="animate-on-scroll grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {[
            { icon: Phone, title: 'Teléfono', value: '331-326-2108', href: 'tel:3313262108', color: 'from-dragon-500/10', text: 'text-dragon-400' },
            { icon: MessageCircle, title: 'WhatsApp', value: 'Enviar mensaje', href: 'https://wa.me/5213313262108', color: 'from-fire-500/10', text: 'text-fire-400' },
            { icon: MapPin, title: 'Ubicación', value: 'Guadalajara, Jalisco', href: '#', color: 'from-gold-500/10', text: 'text-gold-400' },
            { icon: Clock, title: 'Horario', value: 'Lun - Dom: 11am - 10pm', href: '#', color: 'from-dragon-500/10', text: 'text-dragon-400' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.title} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} className={`flex items-center gap-4 p-5 bg-gradient-to-br ${item.color} border border-dark-600/20 rounded-2xl hover:border-dark-500/40 transition-all duration-300 hover:-translate-y-1`}>
                <div className={`p-3 bg-dark-700/60 rounded-xl ${item.text}`}><Icon size={22} /></div>
                <div>
                  <p className="text-sm text-dark-400">{item.title}</p>
                  <p className="text-white font-semibold">{item.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="animate-on-scroll text-center">
          <motion.a href="https://wa.me/5213313262108?text=¡Hola!%20Quiero%20hacer%20un%20pedido." target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-dragon-500 to-dragon-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-dragon-500/25 hover:shadow-dragon-500/40 transition-all">
            <MessageCircle size={24} />
            Pedir por WhatsApp
          </motion.a>
        </div>
      </div>

      <div className="relative z-10 mt-20 border-t border-dark-600/30 pt-8 text-center">
        <p className="text-sm text-dark-500">© {new Date().getFullYear()} Akemi Sushi. Todos los derechos reservados.</p>
      </div>
    </section>
  );
}
