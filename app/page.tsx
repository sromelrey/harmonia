"use client";

import { ITEMS } from "./docs/spa/items";
import { useSelectedComponent } from "./docs/spa/useSelectedComponent";
import Sidebar from "./docs/spa/Sidebar";
import DemoPanel from "./docs/spa/DemoPanel";
import { Button } from "@/components/ui/button";

// Top Navigation Component
function TopNav() {
  const scrollToComponents = () => {
    document
      .getElementById("components")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className='fixed top-0 w-full z-50 border-b border-muted/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='max-w-6xl mx-auto px-6 sm:px-8 lg:px-10'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            🚀 harmonia
          </div>

          <div className='hidden md:flex items-center space-x-6'>
            <button
              onClick={scrollToComponents}
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              Components
            </button>
            <a
              href='#'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              Docs
            </a>
            <a
              href='https://github.com/sromelrey/harmonia'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              GitHub
            </a>
            <Button
              size='sm'
              onClick={scrollToComponents}
              className='bg-primary text-primary-foreground hover:bg-primary/90'
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Rocket Animation Component
function RocketAnimation() {
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

// Hero Section Component
function HeroSection() {
  const scrollToComponents = () => {
    document
      .getElementById("components")
      ?.scrollIntoView({ behavior: "smooth" });
  };

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
                onClick={scrollToComponents}
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
              >
                View Documentation
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
            onClick={scrollToComponents}
            className='p-2 rounded-full border border-muted/60 bg-background/70 backdrop-blur hover:bg-muted/50 transition-colors'
            aria-label='Scroll to components'
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

export default function DocsSPA() {
  const { selected, setSelected } = useSelectedComponent("sample-form");
  const active = ITEMS.find((i) => i.slug === selected) ?? ITEMS[0];

  return (
    <div className='min-h-dvh bg-background text-foreground'>
      {/* Top Navigation */}
      <TopNav />

      {/* Hero Section */}
      <HeroSection />

      {/* Components Section - Your existing grid */}
      <section id='components' className='p-6 sm:p-8 lg:p-10'>
        <div className='mx-auto max-w-6xl'>
          {/* Section header */}
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-bold mb-4'>Component Explorer</h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Interactive playground for testing and exploring components.
              Select any component from the sidebar to view its implementation
              and demo.
            </p>
          </div>

          {/* Your existing grid */}
          <div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6'>
            <Sidebar
              items={ITEMS}
              selectedSlug={active.slug}
              onSelect={setSelected}
            />
            <DemoPanel active={active} />
          </div>
        </div>
      </section>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes grid-drift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin 30s linear infinite reverse;
        }
      `}</style>
    </div>
  );
}
