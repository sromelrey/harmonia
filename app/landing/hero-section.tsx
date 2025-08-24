"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import RocketAnimation from "./rocket-animation";

interface HeroSectionProps {
  onOpenComponentExplorer: () => void;
}

export default function HeroSection({
  onOpenComponentExplorer,
}: HeroSectionProps) {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background gradients */}
      <div
        className='absolute inset-0'
        style={{
          background: `
              radial-gradient(1200px 600px at 50% -100px, hsl(var(--primary)/0.15), transparent),
              radial-gradient(800px 400px at 20% 50%, hsl(var(--accent)/0.08), transparent),
              radial-gradient(600px 300px at 80% 20%, hsl(var(--primary)/0.06), transparent)
            `,
        }}
      />

      {/* Animated grid */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
          backgroundSize: "60px 60px",
          animation: "grid-drift 25s linear infinite",
        }}
      />

      <div className='relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-20'>
        {/* Brand Logo */}
        <div className='flex justify-center mb-8'>
          <div className='flex items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='48'
              height='48'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-teal-500'
            >
              <path d='M9 18V5l12-2v13' />
              <path d='m9 9 12-2' />
              <circle cx='6' cy='18' r='3' />
              <circle cx='18' cy='16' r='3' />
            </svg>
            <span className='text-6xl text-teal-500 font-bold'>
              Harmonia Components
            </span>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Hero Content */}
          <div className='space-y-8 animate-fade-in-left'>
            {/* Status badge */}
            <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20'>
              <div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
              Ready for Launch
            </div>

            {/* Main headline */}
            <div className='space-y-4'>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight'>
                Launch your{" "}
                <span className='bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent'>
                  components
                </span>{" "}
                into orbit
              </h1>

              <p className='text-lg text-muted-foreground max-w-xl leading-relaxed'>
                Explore our interactive component library. Each component is
                battle-tested, accessible, and ready for production deployment.
              </p>
            </div>

            {/* CTA buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                size='lg'
                onClick={onOpenComponentExplorer}
                className='bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
              >
                <span>🚀</span>
                Launch Explorer
                <svg
                  className='ml-2 h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                  />
                </svg>
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='border-muted hover:bg-muted/50'
                asChild
              >
                <Link href='/docs'>View Documentation</Link>
              </Button>
            </div>

            {/* Mission stats */}
            <div className='flex items-center gap-6 text-sm text-muted-foreground pt-4'>
              <div className='flex items-center gap-2'>
                <div className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse' />
                Mission Ready
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-500 rounded-full' />
                Interactive Demos
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-1.5 h-1.5 bg-purple-500 rounded-full' />
                Live Code
              </div>
            </div>
          </div>

          {/* Rocket Animation */}
          <div className='lg:justify-self-end animate-fade-in-right'>
            <RocketAnimation />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <button
            onClick={onOpenComponentExplorer}
            className='p-2 rounded-full border border-muted/60 bg-background/70 backdrop-blur hover:bg-muted/50 transition-colors'
            aria-label='Open component explorer'
          >
            <svg
              className='w-5 h-5 text-muted-foreground'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
