'use client';

import { FolderContent } from '@prisma/client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Play, Image as ImageIcon, Film } from 'lucide-react';

function ContentSection({ folderContent }: { folderContent: FolderContent[] }) {
  const [preview, setPreview] = useState<any>();

  return (
    <>
      <div className="  md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 justify-center items-center gap-2">
        {folderContent.map((item) => (
          <div className=" border rounded-md p-5 flex flex-col gap-2 justify-between bg-pink-50" key={item.id}>
            <div className="header flex gap-2 items-center mb-2 text-pink-700">
              {item.name.split('.').pop() != 'mp4' ? (
                <>
                  <ImageIcon className="size-4" />
                </>
              ) : (
                <>
                  <Film className="size-4" />
                </>
              )}
              <h5 className="text-sm ">{item.name}</h5>
            </div>
            {item.name.split('.').pop() != 'mp4' ? (
              <div className="w-full aspect-video relative" onClick={() => setPreview(item)}>
                <Image src={item.filePath} alt={item.name} fill objectFit="cover" />
              </div>
            ) : (
              <div className="w-full aspect-video relative" onClick={() => setPreview(item)}>
                <video src={item.filePath} />
                <div className="icon p-5 bg-pink-200 rounded-full absolute top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%]">
                  <Play className="size-6 fill-pink-500 stroke-pink-500" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-sm font-cb">Preview</DialogTitle>
          </DialogHeader>
          {preview != undefined && preview?.name != undefined && preview?.name.split('.').pop() != 'mp4' ? (
            <div className="w-full relative flex justify-center items-center">
              <Image src={preview?.filePath} alt={preview?.name} width={500} height={500} />
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

export default ContentSection;
