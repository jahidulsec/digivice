import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import NextProgressProvider from '@/contexts/NextProgressProvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Digivice',
  description: 'Digital Doctor Advice Room',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProgressProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </NextProgressProvider>
      </body>
    </html>
  );
}
