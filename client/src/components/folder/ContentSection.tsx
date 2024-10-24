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


  React.useEffect(() => {
    console.log(preview)
  }, [preview])

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
                  poster={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${item.thumbnailPath}`}
                  src={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${item.filePath}`}
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
                        fileUrl={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${item.filePath}`}
                        plugins={[thumbnailPluginInstance]}
                      />
                    </div>
                  </Worker>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video relative" onClick={() => setPreview(item)}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${item.thumbnailPath || item.filePath}`}
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
            <div className="w-full aspect-video relative">
              <video
                poster={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${preview?.thumbnailPath}`}
                src={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${preview?.filePath}`}
                controls
              />
            </div>
          ) : preview?.filePath != undefined && preview?.filePath.split('.').pop() == 'pdf' ? (
            <div className="h-[70vh]">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                <div className="w-full h-full preview">
                  <Viewer
                    plugins={[defaultLayoutPluginInstance]}
                    fileUrl={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}${preview.filePath}`}
                  />
                </div>
              </Worker>
            </div>
          ) : (
            <>
              <div className="w-full relative flex justify-center items-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN_NAME}/${preview?.filePath}`}
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
