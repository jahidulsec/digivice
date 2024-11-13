'use client';

import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function FolderPageHeader({folderName}: {folderName:string}) {
  const router = useRouter();

  return (
    <div className="pb-1 mb-2 px-6 my-10 text-p1 flex gap-2">
      <Button size={'icon'} variant={'outline'} className="rounded-full size-6" onClick={() => router.back()}>
        <ChevronLeft className="size-4" />
      </Button>
      <h2 className="font-cb">{folderName}</h2>
    </div>
  );
}

export default FolderPageHeader;
