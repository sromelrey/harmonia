export default function TrustSection() {
  return (
    <section className='p-6 sm:p-8 lg:p-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Built for Teams & Developers
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Whether you&apos;re a solo developer or an engineering org, Harmonia
            helps you standardize interfaces, reduce rework, and scale delivery.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='border rounded-xl p-5'>
            <p className='text-sm text-muted-foreground'>
              “Our team cut UI build time by more than half while keeping the
              brand cohesive across apps.”
            </p>
            <div className='mt-3 text-sm font-medium'>— Frontend Lead</div>
          </div>
          <div className='border rounded-xl p-5'>
            <p className='text-sm text-muted-foreground'>
              “The ability to update components once and roll out changes
              everywhere is a game changer.”
            </p>
            <div className='mt-3 text-sm font-medium'>— Product Engineer</div>
          </div>
          <div className='border rounded-xl p-5'>
            <p className='text-sm text-muted-foreground'>
              “Consistent patterns made onboarding new devs faster and safer.”
            </p>
            <div className='mt-3 text-sm font-medium'>
              — Engineering Manager
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
