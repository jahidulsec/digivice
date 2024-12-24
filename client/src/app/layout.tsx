import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import NextProgressProvider from '@/contexts/NextProgressProvider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/themeProvider';

const inter = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Digivice',
  description: 'Digital Doctor Advice Room',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content" />
      </head>
      <body className={`${inter.className} relative antialiased bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NextProgressProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </NextProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
