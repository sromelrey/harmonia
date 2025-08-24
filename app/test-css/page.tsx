export default function TestCSSPage() {
  return (
    <div className='min-h-screen bg-background text-foreground p-8'>
      <h1 className='text-4xl font-bold text-primary mb-4'>CSS Test Page</h1>

      <div className='space-y-4'>
        <div className='p-4 bg-primary text-primary-foreground rounded'>
          Primary Background
        </div>

        <div className='p-4 bg-secondary text-secondary-foreground rounded'>
          Secondary Background
        </div>

        <div className='p-4 bg-accent text-accent-foreground rounded'>
          Accent Background
        </div>

        <div className='p-4 bg-muted text-muted-foreground rounded'>
          Muted Background
        </div>

        <div className='p-4 bg-success text-white rounded'>
          Success Background
        </div>

        <div className='p-4 bg-warning text-white rounded'>
          Warning Background
        </div>

        <div className='p-4 bg-destructive text-white rounded'>
          Destructive Background
        </div>

        <div className='p-4 bg-spotlight rounded border'>
          Spotlight Background (Custom Utility)
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-2xl font-semibold mb-4'>Tailwind Classes Test</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='p-4 bg-blue-500 text-white rounded'>Blue 500</div>
          <div className='p-4 bg-green-500 text-white rounded'>Green 500</div>
          <div className='p-4 bg-red-500 text-white rounded'>Red 500</div>
          <div className='p-4 bg-yellow-500 text-black rounded'>Yellow 500</div>
          <div className='p-4 bg-purple-500 text-white rounded'>Purple 500</div>
          <div className='p-4 bg-pink-500 text-white rounded'>Pink 500</div>
        </div>
      </div>
    </div>
  );
}
