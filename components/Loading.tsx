'use client';

import Lottie from 'lottie-react';

interface LoadingProps {
  size?: number;
  className?: string;
}

// Simple sushi-themed loading animation data
const loadingAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Sushi Loading",
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "el",
          d: 1,
          s: { a: 0, k: [120, 120] },
          p: { a: 0, k: [0, 0] }
        },
        {
          ty: "st",
          c: { a: 0, k: [0.29, 0.87, 0.5, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 8 }
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
};

export default function Loading({ size = 200, className = '' }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div style={{ width: size, height: size }}>
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
      <p className="text-dark-400 text-sm animate-pulse">Cargando menú delicioso...</p>
    </div>
  );
}
