"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import RocketAnimation from "./RocketAnimation";
import styles from "./hero.module.css";

export default function HeroSection() {
  const scrollToComponents = () => {
    const element = document.getElementById("components");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${styles.nebula}`}
    >
      {/* Enhanced grid overlay */}
      <div className={styles.gridOverlay} aria-hidden />

      <div className='relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 pt-24 pb-12 sm:pb-16 lg:pb-20'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {/* Enhanced copy section */}
          <div className={styles.fadeLeft}>
            {/* Status badge with shimmer */}
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm ${styles.statusBadge}`}
            >
              <span className='relative'>
                <span className='inline-block h-2 w-2 animate-pulse rounded-full bg-primary' />
                <span className='absolute inset-0 h-2 w-2 animate-ping rounded-full bg-primary opacity-75' />
              </span>
              Mission Status: Ready for Launch
            </div>

            {/* Enhanced headline with better typography */}
            <h1 className='mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl'>
              Launch your{" "}
              <span className='relative inline-block'>
                <span className='bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent'>
                  components
                </span>
                <svg
                  className='absolute -bottom-2 left-0 h-3 w-full text-primary/30'
                  viewBox='0 0 100 8'
                  fill='none'
                  preserveAspectRatio='none'
                >
                  <path
                    d='M0 4c20 0 20 4 40 4s20-4 40-4 20 4 40 4'
                    stroke='currentColor'
                    strokeWidth='2'
                    fill='none'
                  />
                </svg>
              </span>{" "}
              into orbit
            </h1>

            {/* Enhanced description */}
            <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl'>
              A sci-fi inspired React toolkit for teams that ship fast.
              <span className='font-medium text-foreground'>
                {" "}
                Accessible, themeable components
              </span>{" "}
              with smooth motion and first-class developer experience.
            </p>

            {/* Enhanced CTA buttons */}
            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
              <Button
                size='lg'
                onClick={scrollToComponents}
                className={`group bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 ${styles.heroButton}`}
              >
                <span className='mr-2 text-lg'>🚀</span>
                Launch Explorer
                <svg
                  className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1'
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
                className='group border-muted bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:border-muted-foreground/20'
                asChild
              >
                <Link href='#docs'>
                  <svg
                    className='mr-2 h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  Documentation
                  <svg
                    className='ml-2 h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                    />
                  </svg>
                </Link>
              </Button>
            </div>

            {/* Enhanced stats with better visual hierarchy */}
            <dl className='mt-10 grid w-full grid-cols-1 gap-6 text-sm sm:grid-cols-3'>
              <div className='group'>
                <dt className='flex items-center gap-2 font-semibold text-foreground'>
                  <div className='h-2 w-2 rounded-full bg-green-500' />
                  40+ Components
                </dt>
                <dd className='mt-1 text-muted-foreground'>
                  Buttons, forms, data tables, and more
                </dd>
              </div>
              <div className='group'>
                <dt className='flex items-center gap-2 font-semibold text-foreground'>
                  <div className='h-2 w-2 rounded-full bg-blue-500' />
                  Fully Themeable
                </dt>
                <dd className='mt-1 text-muted-foreground'>
                  Token-driven design with Tailwind v4
                </dd>
              </div>
              <div className='group'>
                <dt className='flex items-center gap-2 font-semibold text-foreground'>
                  <div className='h-2 w-2 rounded-full bg-purple-500' />
                  Accessible First
                </dt>
                <dd className='mt-1 text-muted-foreground'>
                  Built-in ARIA patterns and keyboard nav
                </dd>
              </div>
            </dl>
          </div>

          {/* Enhanced visual section */}
          <div className={`${styles.fadeRight} lg:justify-self-end`}>
            <div
              className={`relative rounded-2xl p-6 sm:p-8 shadow-2xl ${styles.glassCard}`}
            >
              {/* Enhanced scanlines */}
              <div className={styles.scanlines} aria-hidden />

              {/* Rocket animation */}
              <RocketAnimation />

              {/* Enhanced status indicator */}
              <div className='mt-6 flex items-center justify-center gap-3'>
                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <div className='relative'>
                    <div className='h-2 w-2 rounded-full bg-green-500' />
                    <div className='absolute inset-0 h-2 w-2 animate-ping rounded-full bg-green-500 opacity-75' />
                  </div>
                  Engine Online
                </div>
                <div className='h-1 w-1 rounded-full bg-muted-foreground/50' />
                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <div className='h-2 w-2 rounded-full bg-blue-500 animate-pulse' />
                  Ready for Ignition
                </div>
              </div>

              {/* Floating indicators */}
              <div className='absolute -top-3 -right-3'>
                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs backdrop-blur-sm animate-pulse'>
                  ✨
                </div>
              </div>
              <div className='absolute -bottom-2 -left-2'>
                <div
                  className='flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs backdrop-blur-sm animate-pulse'
                  style={{ animationDelay: "1s" }}
                >
                  ⚡
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
          <button
            onClick={scrollToComponents}
            className='group flex h-12 w-12 items-center justify-center rounded-full border border-muted/60 bg-background/70 backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5'
            aria-label='Scroll to components section'
          >
            <svg
              className='h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary'
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
