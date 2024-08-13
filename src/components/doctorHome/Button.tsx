import Link from 'next/link';
import React from 'react';
import { Button as ButtonUI } from '@/components/ui/button';

function Button({ title }: { title: string }) {
  return (
    <ButtonUI
      asChild
      type="button"
      className="bg-white hover:bg-pink-50 hover:text-pink-800 text-gray-900 font-light w-full"
    >
      <Link href={''}>
        <span className="w-full text-left">{title}</span>
      </Link>
    </ButtonUI>
  );
}

export default Button;
