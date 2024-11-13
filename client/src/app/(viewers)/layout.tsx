import { bgw } from '@/assets';
import Image from 'next/image';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-full">
      <div className="absolute w-full -z-[1]">
        <div className="relative min-w-[100%] min-h-full1">
          <Image src={bgw} fill alt="bg white" objectFit='cover' />
        </div>
      </div>
      {children}
    </main>
  );
}
