import { bgw } from '@/assets';
import Image from 'next/image';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-full">
      {children}
    </main>
  );
}
