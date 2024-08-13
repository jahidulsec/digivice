'use client';

import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function FolderPageHeader() {
  const router = useRouter();

  return (
    <div className="pb-1 mb-2 border-b border-pink-50 text-pink-900 flex gap-2">
      <Button size={'icon'} variant={'outline'} className="rounded-full size-6" onClick={() => router.back()}>
        <ChevronLeft className="size-4" />
      </Button>
      <h2 className="font-cb">Files</h2>
    </div>
  );
}

export default FolderPageHeader;
