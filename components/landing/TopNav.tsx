"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TopNav() {
  return (
    <nav className='fixed top-0 z-50 w-full border-b border-muted/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto max-w-6xl px-6 sm:px-8 lg:px-10'>
        <div className='flex h-16 items-center justify-between'>
          <Link
            href='/'
            className='text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'
            aria-label='Harmonia Components Home'
          >
            🚀 Harmonia Components
          </Link>

          <div className='hidden md:flex items-center gap-6'>
            <a
              href='#components'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              Components
            </a>
            <Link
              href='/docs'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              Docs
            </Link>
            <Link
              href='https://github.com/sromelrey/harmonia'
              className='text-muted-foreground hover:text-foreground transition-colors'
              target='_blank'
            >
              GitHub
            </Link>
            <Button
              size='sm'
              asChild
              className='bg-primary text-primary-foreground hover:bg-primary/90'
            >
              <a href='#components'>Explore</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
