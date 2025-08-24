import { Button } from "@/components/ui/button";

interface TopNavProps {
  onOpenComponentExplorer: () => void;
}

function TopNav({ onOpenComponentExplorer }: TopNavProps) {
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
              onClick={onOpenComponentExplorer}
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              Components
            </button>
            <a
              href='/docs'
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
              onClick={onOpenComponentExplorer}
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
