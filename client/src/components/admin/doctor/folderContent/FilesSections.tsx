'use client';

import React, { useState, useTransition } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { deleteFile } from '@/app/actions/files';

export default function FilesSections({ contents }: { contents: FolderContent[] }) {
  const [preview, setPreview] = useState<any>();
  const [delFile, setDelFile] = useState<any>();

  const [isPending, startTransition] = useTransition();

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
      <div className="my-6 grid sm:grid-cols-2 md:grid-cols-3 gap-5 flex-wrap">
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
                  <DropdownMenuItem
                    className="flex gap-2 items-center text-destructive focus:text-white focus:bg-destructive"
                    onClick={() => {
                      setDelFile(item.id);
                    }}
                  >
                    <Trash className="size-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {item.filePath.split('.').pop() == 'mp4' ? (
              <div className="w-full aspect-video relative">
                <video src={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${item.filePath}`} controls />
              </div>
            ) : item.filePath.split('.').pop() == 'pdf' ? (
              <>
                <object
                  type="application/pdf"
                  data={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${item.filePath}`}
                  className="pdf-thumbnail w-full overflow-hidden"
                ></object>
              </>
            ) : (
              <div className="w-full aspect-video relative">
                <Image src={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${item.filePath}`} alt={item.name} fill objectFit="cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* preview dialog */}
      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-sm font-cb">Preview</DialogTitle>
          </DialogHeader>
          {preview != undefined && preview?.filePath != undefined && preview?.filePath.split('.').pop() == 'mp4' ? (
            <div className="w-full aspect-video relative">
              <video src={process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME + '/' + preview?.filePath} controls />
            </div>
          ) : preview != undefined && preview?.filePath != undefined && preview?.filePath.split('.').pop() == 'pdf' ? (
            <div className="h-[70vh]">
              <object
                type="application/pdf"
                data={process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME + '/' + preview?.filePath}
                className="pdf-thumbnail w-full h-full overflow-hidden"
              ></object>
            </div>
          ) : (
            <div className="w-full relative flex justify-center items-center">
              <Image src={process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME + '/' + preview?.filePath} alt={preview?.name} width={500} height={500} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* alert delete vehicle modal */}
      <AlertDialog open={!!delFile} onOpenChange={setDelFile}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this Doctor and remove data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  await deleteFile(delFile);
                  toast.success('file has been deleted');
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
