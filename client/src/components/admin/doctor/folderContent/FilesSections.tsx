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

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function FilesSections({ contents }: { contents: FolderContent[] }) {
  const [preview, setPreview] = useState<any>();
  const [delFile, setDelFile] = useState<any>();

  const [isPending, startTransition] = useTransition();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const thumbnailPluginInstance = thumbnailPlugin();

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
                <video poster={`/api/media/thumbnail/${item.id}`} src={`/api/media/${item.id}`} controls />
              </div>
            ) : item.filePath.split('.').pop() == 'pdf' ? (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                  <div className="w-full aspect-video overflow-hidden">
                    <Viewer fileUrl={`/api/media/${item.id}`} plugins={[thumbnailPluginInstance]} />
                  </div>
                </Worker>
              </>
            ) : (
              <div className="w-full aspect-video relative">
                <Image src={`/api/media/${item.id}`} alt={item.name} fill objectFit="cover" />
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
              <video poster={`/api/media/thumbnail/${preview.id}`} src={`/api/media/${preview.id}`} controls />
            </div>
          ) : preview != undefined && preview?.filePath != undefined && preview?.filePath.split('.').pop() == 'pdf' ? (
            <div className="h-[70vh] preview">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                <div className="w-full h-full overflow-hidden">
                  <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={`/api/media/${preview.id}`} />
                </div>
              </Worker>
            </div>
          ) : preview != undefined && preview?.filePath != undefined ? (
            <div className="w-full relative flex justify-center items-center">
              <Image src={`/api/media/${preview.id}`} alt={preview?.name} width={500} height={500} />
            </div>
          ) : (
            <></>
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
