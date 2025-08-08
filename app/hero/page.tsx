"use client";
import { Button } from "@/components/ui/button";

// Mini Nav Component
function TopNav() {
  return (
    <nav className='fixed top-0 w-full z-50 border-b border-muted/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='max-w-6xl mx-auto px-6 sm:px-10'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            Eunomia UI
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <a
              href='#'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              {/* TODO: Link to /components */}
              Components
            </a>
            <a
              href='#'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              {/* TODO: Link to /docs */}
              Docs
            </a>
            <a
              href='#'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              {/* TODO: Link to GitHub */}
              GitHub
            </a>
            <Button
              size='sm'
              className='bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary'
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant='outline' size='sm' className='md:hidden'>
            Menu
          </Button>
        </div>
      </div>
    </nav>
  );
}

// Animated Grid Background Component
function GridOverlay() {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {/* Animated grid lines */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      {/* Starfield effect */}
      <div className='absolute inset-0'>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Hero Visual Component
function HeroVisual() {
  return (
    <div className='relative'>
      {/* Main glass card */}
      <div className='relative rounded-2xl border border-muted/60 bg-background/70 backdrop-blur p-6 overflow-hidden'>
        {/* Inner glow effect */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl' />

        {/* Code preview content */}
        <div className='relative z-10 space-y-3'>
          <div className='text-xs text-muted-foreground font-mono'>
            <div className='text-primary'>import</div> {`{ Button }`}{" "}
            <div className='text-primary'>from</div>{" "}
            <span className='text-green-500'>'@/components/ui'</span>
          </div>

          <div className='text-xs text-muted-foreground font-mono'>
            <div className='text-blue-500'>export default function</div>{" "}
            <span className='text-yellow-500'>Component</span>() {`{`}
          </div>

          <div className='text-xs text-muted-foreground font-mono ml-4'>
            <div className='text-purple-500'>return</div> (
          </div>

          <div className='text-xs text-muted-foreground font-mono ml-8'>
            &lt;<span className='text-primary'>Button</span>{" "}
            <span className='text-blue-400'>variant</span>=
            <span className='text-green-500'>"default"</span>&gt;
          </div>

          <div className='text-xs text-muted-foreground font-mono ml-12'>
            Click me
          </div>

          <div className='text-xs text-muted-foreground font-mono ml-8'>
            &lt;/<span className='text-primary'>Button</span>&gt;
          </div>

          <div className='text-xs text-muted-foreground font-mono ml-4'>)</div>

          <div className='text-xs text-muted-foreground font-mono'>{`}`}</div>
        </div>

        {/* Animated scanline */}
        <div
          className='absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent w-full h-0.5 animate-pulse'
          style={{
            animation: "scanline 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating accent elements */}
      <div className='absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full animate-pulse' />
      <div
        className='absolute -bottom-2 -left-2 w-3 h-3 bg-accent/20 rounded-full animate-pulse'
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className='min-h-dvh bg-background text-foreground relative'>
      {/* Complex spotlight background */}
      <div
        className='absolute inset-0'
        style={{
          background: `
            radial-gradient(1000px 500px at 50% -200px, hsl(var(--primary)/0.10), transparent),
            radial-gradient(800px 400px at 10% -120px, hsl(var(--accent)/0.06), transparent),
            radial-gradient(600px 300px at 90% 40%, hsl(var(--primary)/0.05), transparent)
          `,
        }}
      />

      {/* Grid and starfield overlay */}
      <GridOverlay />

      {/* Top Navigation */}
      <TopNav />

      {/* Hero Section */}
      <div className='relative pt-24 pb-16'>
        <div className='max-w-6xl mx-auto px-6 sm:px-10'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            {/* Hero Content */}
            <div className='space-y-8 animate-fade-in'>
              {/* Eyebrow */}
              <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20'>
                <div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
                New · v1.0
              </div>

              {/* Headline */}
              <div className='space-y-4'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight'>
                  Build the{" "}
                  <span className='bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent'>
                    future
                  </span>{" "}
                  faster
                </h1>

                <p className='text-lg text-muted-foreground max-w-xl'>
                  Next-generation UI components built for modern applications.
                  Accessible, customizable, and designed for tomorrow's
                  interfaces.
                </p>
              </div>

              {/* CTAs */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button
                  size='lg'
                  className='bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary shadow-lg shadow-primary/20'
                >
                  Get Started
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
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </Button>

                <Button
                  variant='outline'
                  size='lg'
                  className='border-muted hover:bg-muted/50 focus-visible:ring-primary'
                >
                  View Components
                </Button>
              </div>

              {/* Stats */}
              <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 bg-primary rounded-full' />
                  40+ components
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 bg-primary rounded-full' />
                  Themeable
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 bg-primary rounded-full' />
                  Accessible
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className='lg:justify-self-end animate-fade-in-up'>
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(80px, 80px);
          }
        }

        @keyframes scanline {
          0% {
            top: 0%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
