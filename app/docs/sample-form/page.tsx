import SampleForm from "@/components/demos/sample-form";

export default function SampleFormDocsPage() {
  return (
    <div className='min-h-[60vh] p-6 sm:p-8 bg-background text-foreground'>
      <div className='mx-auto max-w-3xl space-y-4'>
        <h1 className='text-2xl font-semibold'>Sample Form</h1>
        <p className='text-muted-foreground'>
          Live demo using <code>InputField</code>, <code>FormInput</code>, and{" "}
          <code>FormPasswordInput</code>.
        </p>

        <div className='rounded-xl border border-muted p-5 sm:p-6'>
          <SampleForm />
        </div>
      </div>
    </div>
  );
}
