'use client';

import { FolderContent } from '@prisma/client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Play, Image as ImageIcon, Film, FileText } from 'lucide-react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function ContentSection({ folderContent }: { folderContent: FolderContent[] }) {
  const [preview, setPreview] = useState<any>();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const thumbnailPluginInstance = thumbnailPlugin();

  return (
    <>
      <div className=" cursor-pointer md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 justify-center gap-2">
        {folderContent.map((item) => (
          <div className=" border rounded-md p-5 flex flex-col gap-2 justify-between bg-white" key={item.id}>
            
            <div className="header flex gap-2 mb-2 items-start text-pink-700 min-w-10">
              {item.filePath.split('.').pop() == 'mp4' ? (
                <>
                  <Film className="size-4 min-w-4" />
                </>
              ) : item.filePath.split('.').pop() == 'pdf' ? (
                <>
                  <FileText className="size-4 min-w-4" />
                </>
              ) : (
                <>
                  <ImageIcon className="size-4 min-w-4" />
                </>
              )}
              <h5 className="text-sm line-clamp-2 -mt-1" title={item.name}>{item.name}</h5>
            </div>

            {item.filePath.split('.').pop() == 'mp4' ? (
              <div className="w-full aspect-video relative cursor-pointer" onClick={() => setPreview(item)}>
                <video
                  poster={`/api/media/thumbnail/${item.id}`}
                  src={`/api/media/${item.id}`}
                />
                <div className="icon p-5 bg-pink-100 rounded-full absolute top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%]">
                  <Play className="size-6 fill-pink-500 stroke-pink-500" />
                </div>
              </div>
            ) : item.filePath.split('.').pop() == 'pdf' ? (
              <div className="" onClick={() => setPreview(item)}>
                <div className="w-full aspect-video pointer-events-none">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                    <div className="w-full aspect-video overflow-hidden">
                      <Viewer
                        fileUrl={`/api/media/${item.id}`}
                        plugins={[thumbnailPluginInstance]}
                      />
                    </div>
                  </Worker>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video relative" onClick={() => setPreview(item)}>
                <Image
                  src={`/api/media/${item.id}`}
                  alt={item.name}
                  fill
                  objectFit="cover"
                />
              </div>
            )}
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
              <video
                poster={`/api/media/thumbnail/${preview.id}`}
                src={`/api/media/${preview.id}`}
                controls
                className='max-w-full w-full aspect-video'
              />
            </div>
          ) : preview != undefined && preview?.filePath != undefined && preview?.filePath.split('.').pop() == 'pdf' ? (
            <div className="h-[70vh]">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                <div className="w-full h-full preview">
                  <Viewer
                    plugins={[defaultLayoutPluginInstance]}
                    fileUrl={`/api/media/${preview.id}`}
                  />
                </div>
              </Worker>
            </div>
          ) : preview != undefined && preview?.filePath != undefined && (
            <>
              <div className="w-full relative flex justify-center items-center">
                <Image
                  src={`/api/media/${preview.id}`}
                  alt={preview?.name}
                  width={500}
                  height={500}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ContentSection;
