'use client';

import Link from 'next/link';
import React from 'react';
import { Button as ButtonUI } from '@/components/ui/button';
import { useParams } from 'next/navigation';

function Button({ title }: { title: string }) {
  const params = useParams();

  return (
    <ButtonUI
      asChild
      type="button"
      className="bg-white hover:bg-pink-50 hover:text-pink-800 text-gray-900 font-light w-full"
    >
      <Link href={`/doctor/${params.name}/home/health`}>
        <span className="w-full text-left">{title}</span>
      </Link>
    </ButtonUI>
  );
}

export default Button;
