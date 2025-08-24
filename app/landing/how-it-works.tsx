export default function HowItWorksSection() {
  return (
    <section className='p-6 sm:p-8 lg:p-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold mb-4'>How It Works</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Install. Import. Innovate. Integrate components into your codebase,
            customize via props and tokens, and stay aligned with your design
            system without sacrificing delivery speed.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='border rounded-xl p-5'>
            <h3 className='font-semibold mb-2'>1. Install</h3>
            <p className='text-sm text-muted-foreground'>
              Add Harmonia to your project with your package manager of choice.
            </p>
          </div>
          <div className='border rounded-xl p-5'>
            <h3 className='font-semibold mb-2'>2. Import</h3>
            <p className='text-sm text-muted-foreground'>
              Pull components where you need them—no boilerplate required.
            </p>
          </div>
          <div className='border rounded-xl p-5'>
            <h3 className='font-semibold mb-2'>3. Customize</h3>
            <p className='text-sm text-muted-foreground'>
              Tweak behavior and presentation using props while preserving
              consistent patterns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
