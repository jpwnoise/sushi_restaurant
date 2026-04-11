'use client';

import { CartProvider } from '@/context/CartContext';
import { useGSAP } from '@/hooks/useGSAP';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import About from '@/components/About';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';

export default function Home() {
  const ref = useGSAP();

  return (
    <CartProvider>
      <main ref={ref} className="bg-dark-900 text-dark-100">
        <Navbar />
        <CartPanel />
        <Hero />
        <Menu />
        <About />
        <Footer />
      </main>
    </CartProvider>
  );
}
