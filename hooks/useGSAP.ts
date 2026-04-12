'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from('.hero-badge', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
      gsap.from('.hero-title', { opacity: 0, y: 60, scale: 0.9, duration: 1, delay: 0.4 });
      gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, delay: 0.7 });
      gsap.from('.hero-cta', { opacity: 0, y: 30, stagger: 0.15, duration: 0.8, delay: 1 });

      // Scroll sections
      gsap.utils.toArray('.animate-on-scroll').forEach((el) => {
        gsap.from(el as Element, {
          opacity: 0, y: 60, duration: 1,
          scrollTrigger: { trigger: el as Element, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      });

      // Floating elements
      gsap.to('.float-slow', { y: 15, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.float-fast', { y: 12, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // Parallax
      gsap.to('.hero-parallax', {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
