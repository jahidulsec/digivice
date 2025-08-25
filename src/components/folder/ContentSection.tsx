'use client';

import { FolderContent } from '@prisma/client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Play, Image as ImageIcon, Film, FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';

function ContentSection({ folderContent }: { folderContent: FolderContent[] }) {
  const [preview, setPreview] = useState<any>();

  return (
    <>
      <div className="isolate cursor-pointer md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 justify-center gap-2">
        {folderContent.map((item) => (
          <div
            className="relative border rounded-md p-5 flex flex-col gap-2 justify-between bg-background"
            key={item.id}
          >
            <div className="header flex gap-2 mb-2 items-start text-pink-700 min-w-10">
              <FileIcon type={item.filePath.split('.').pop() as string} />
              <h5 className="text-sm line-clamp-2 -mt-1" title={item.name}>
                {item.name}
              </h5>
            </div>

            {item.isPopular ? (
              <div className="absolute right-6 top-14  z-[1] bg-p3 text-p2 px-4 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
            ) : null}

            <div className="bg-muted rounded-md overflow-hidden">
              <FilePreview
                type={item.filePath.split('.').pop() as string}
                onClick={() => {
                  if (item.filePath.split('.').pop() !== 'pdf') {
                    setPreview(item);
                  }
                }}
                item={item}
              />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="w-[85vw]">
          <DialogHeader>
            <DialogTitle className="text-sm font-cb">Preview</DialogTitle>
          </DialogHeader>
          {preview != undefined && preview?.filePath != undefined && preview?.filePath.split('.').pop() == 'mp4' ? (
            <div className="w-full aspect-video relative overflow-hidden">
              <Player playsInline poster={`/api/media/thumbnail/${preview.id}`} src={`/api/media/${preview.id}`} />
            </div>
          ) : (
            preview != undefined &&
            preview?.filePath != undefined && (
              <div className="max-h-[70vh] overflow-y-auto">
                <div className="w-full relative flex justify-center items-center">
                  <Image src={`/api/media/${preview.id}`} alt={preview?.name} width={500} height={500} />
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const FileIcon = ({ type }: { type: string }) => {
  if (type === 'mp4') return <Film className="size-4 min-w-4" />;
  else if (type === 'pdf') return <FileText className="size-4 min-w-4" />;
  else return <ImageIcon className="size-4 min-w-4" />;
};

const FilePreview = ({ item, type, onClick }: { item: any; type: string; onClick: () => void }) => {
  if (type === 'mp4')
    return (
      <div className="w-full aspect-video relative cursor-pointe" onClick={onClick}>
        <video
          className="w-full aspect-video"
          poster={`/api/media/thumbnail/${item.id}`}
          src={`/api/media/${item.id}`}
        />
        <div className="icon p-5 bg-pink-100 rounded-full absolute top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%]">
          <Play className="size-6 fill-pink-500 stroke-pink-500" />
        </div>
      </div>
    );
  else if (type === 'pdf')
    return (
      <Link href={`/api/media/${item.id}`} target="_blank">
        <div className="w-full aspect-video pointer-events-none">
          <div className="relative w-full aspect-video">
            {item.thumbnailPath ? (
              <Image src={`/api/media/thumbnail/${item.id}`} alt="thumbail" fill objectFit="cover" />
            ) : (
              <div className="flex justify-center items-center h-full">
                <ExternalLink size={50} className="fill-pink-500/20 stroke-pink-400" />
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  else
    return (
      <div className="relative w-full aspect-video" onClick={onClick}>
        {item.thumbnailPath ? (
          <Image src={`/api/media/thumbnail/${item.id}`} alt="thumbail" fill objectFit="cover" />
        ) : (
          <Image src={`/api/media/${item.id}`} alt={item.name} fill objectFit="cover" />
        )}
      </div>
    );
};

export default ContentSection;
