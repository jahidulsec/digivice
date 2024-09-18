'use client'

import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  name: string;
  src: string;
  folderId: string;
};



function Button({ name, folderId, src, onClick, className, ...props }: ButtonProps) {
  const router = useRouter()
  const pathname = usePathname()


  return (
    <>
      <button
        className={cn(
          'relative text-p1 flex items-center justify-between py-1.5 pl-10 pr-4 w-full bg-white border border-inputB/50 rounded-sm hover:bg-p1/10 transition-colors duration-300',
          className
        )}
        onClick={() => {router.push(pathname + "/"+ folderId)}}
        {...props}
      >
        <div className="icon absolute -left-1 bg-p1 pl-4 pr-6 py-1.5 rounded">
          <div className="relative w-[1.325rem] aspect-square text-white">
            <Image src={src} alt="video icon" fill objectFit="contain" />
          </div>
        </div>
        <span className="ml-auto font-cr text-center text-sm">{name}</span>
        <ChevronDownIcon className="size-4 ml-auto" />
      </button>
    </>
  );
}

export default Button;
