import { bgw } from '@/assets';
import Image from 'next/image';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-full">
      <div className="absolute w-full">
        <div className="relative min-w-[100%] min-h-screen bg-red-100 object-fill">
          <Image src={bgw} fill alt="bg white" objectFit='cover' />
        </div>
      </div>
      {children}
    </main>
  );
}
