'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Folder } from '@prisma/client';
import { Folder as FolderIcon } from 'lucide-react';
import React, { useState } from 'react';
import FilesForm from './FilesForm';

function FolderContentHeader({ folder }: { folder: Folder }) {
  const [add, setAdd] = useState<boolean>(false);
  return (
    <>
      <div className="my-6 flex justify-between items-center gap-5">
        <div className="flex gap-2 items-center">
          <span className="size-10 flex justify-center items-center bg-gray-50 border rounded-full">
            <FolderIcon className="size-5" />
          </span>
          <h1 className="text-xl font-cb">{folder.name}</h1>
        </div>

        <Button
          onClick={() => {
            setAdd(true);
          }}
        >
          Add Files
        </Button>
      </div>

      {/* add folder dialog */}
      <Dialog open={add} onOpenChange={setAdd}>
        <DialogContent className="w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-sm">Add Files</DialogTitle>
          </DialogHeader>
          <FilesForm
            onClick={() => {
              setAdd(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FolderContentHeader;
