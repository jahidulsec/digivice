'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { useState } from 'react';
import FolderForm from './FolderForm';
import { ArrowLeft, Folder } from 'lucide-react';
import Link from 'next/link';

function FolderHeader() {
  const [addFolder, setAddFolder] = useState(false);

  return (
    <>
      <div className="my-6 flex justify-between items-center gap-5">
        <div className="flex items-center gap-5">
          <Button size={'icon'} variant={'ghost'} className="rounded-full" asChild>
            <Link href={'/admin'}>
            <span className="sr-only">Move to previous page</span>
              <ArrowLeft />
            </Link>
          </Button>
          <div className="flex gap-2 items-center">
            <span className="size-10 flex justify-center items-center bg-gray-50 border rounded-full">
              <Folder className="size-5" />
            </span>
            <h1 className="text-xl font-cb">Folder</h1>
          </div>
        </div>

        <Button
          onClick={() => {
            setAddFolder(true);
          }}
        >
          Add Folder
        </Button>
      </div>

      {/* add folder dialog */}
      <Dialog open={addFolder} onOpenChange={setAddFolder}>
        <DialogContent className="w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-sm">Add Folder</DialogTitle>
          </DialogHeader>
          <FolderForm onClick={() => setAddFolder(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FolderHeader;
