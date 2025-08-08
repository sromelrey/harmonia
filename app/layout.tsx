import "./globals.css"; // ensure this matches your filename exactly

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='min-h-dvh bg-background text-foreground antialiased bg-spotlight'>
        {children}
      </body>
    </html>
  );
}
