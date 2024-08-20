'use client';

import React, { useState } from 'react';
import { EllipsisVertical, Eye, MessageSquareOff, Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { FolderContent } from '@prisma/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function FilesSections({ contents }: { contents: FolderContent[] }) {
  const [preview, setPreview] = useState<any>();

  if (contents.length == 0) {
    return (
      <div className="flex justify-center items-center flex-col py-20 text-gray-400 pointer-events-none">
        <MessageSquareOff className="size-10" />
        <span className="text-[11px]">No data</span>
      </div>
    );
  }

  return (
    <>
      <div className="my-6 flex gap-5">
        {contents.map((item) => (
          <div className=" border rounded-md p-5 flex flex-col gap-2 justify-between bg-gray-50" key={item.id}>
            <div className="header flex justify-between items-center ">
              <h5 className="text-sm">{item.name}</h5>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={'icon'} variant={'ghost'}>
                    <EllipsisVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="flex gap-2 items-center"
                    onClick={() => {
                      setPreview(item);
                    }}
                  >
                    <Eye className="size-4" />
                    <span>Preview</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex gap-2 items-center text-destructive focus:text-white focus:bg-destructive">
                    <Trash className="size-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {item.name.split('.').pop() != 'mp4' ? (
              <div className="w-[220px] aspect-square relative">
                <Image src={item.filePath} alt={item.name} fill objectFit="cover" />
              </div>
            ) : (
              <div className="w-[380px] aspect-video relative">
                <video src={item.filePath} controls />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* preview dialog */}
      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="w-[75vw]">
          <DialogHeader>
            <DialogTitle className="text-sm font-cb">Preview</DialogTitle>
          </DialogHeader>
          {preview != undefined && preview?.name != undefined && preview?.name.split('.').pop() != 'mp4' ? (
            <div className="w-full relative flex justify-center items-center">
              <Image src={preview?.filePath} alt={preview?.name} width={700} height={700} />
            </div>
          ) : (
            <div className="w-full aspect-video relative">
              <video src={preview?.filePath} controls />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
