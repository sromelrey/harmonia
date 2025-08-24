"use client";
import React from "react";

export default function RocketAnimation() {
  return (
    <div className='relative w-full h-80 overflow-hidden'>
      {/* Starfield background */}
      <div className='absolute inset-0'>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Rocket SVG */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='rocket-container animate-float'>
          <svg
            width='120'
            height='120'
            viewBox='0 0 120 120'
            className='rocket-svg'
          >
            {/* Rocket body */}
            <ellipse
              cx='60'
              cy='70'
              rx='12'
              ry='35'
              fill='hsl(var(--primary))'
              opacity='0.9'
            />

            {/* Rocket tip */}
            <ellipse
              cx='60'
              cy='40'
              rx='8'
              ry='15'
              fill='hsl(var(--primary))'
              opacity='0.7'
            />

            {/* Rocket fins */}
            <polygon
              points='48,85 45,100 55,95'
              fill='hsl(var(--accent))'
              opacity='0.8'
            />
            <polygon
              points='72,85 75,100 65,95'
              fill='hsl(var(--accent))'
              opacity='0.8'
            />

            {/* Window */}
            <circle
              cx='60'
              cy='55'
              r='6'
              fill='hsl(var(--background))'
              opacity='0.9'
            />
            <circle
              cx='60'
              cy='55'
              r='4'
              fill='hsl(var(--primary))'
              opacity='0.3'
            />

            {/* Flame */}
            <ellipse
              cx='60'
              cy='105'
              rx='8'
              ry='12'
              fill='#ff6b35'
              opacity='0.8'
              className='animate-pulse'
            >
              <animate
                attributeName='ry'
                values='12;8;12'
                dur='0.5s'
                repeatCount='indefinite'
              />
            </ellipse>
            <ellipse
              cx='60'
              cy='108'
              rx='5'
              ry='8'
              fill='#ffbe0b'
              opacity='0.9'
              className='animate-pulse'
            >
              <animate
                attributeName='ry'
                values='8;5;8'
                dur='0.3s'
                repeatCount='indefinite'
              />
            </ellipse>
          </svg>
        </div>
      </div>

      {/* Orbital rings */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='w-64 h-64 border border-primary/20 rounded-full animate-spin-slow'></div>
        <div className='absolute w-80 h-80 border border-accent/10 rounded-full animate-spin-reverse'></div>
      </div>
    </div>
  );
}
