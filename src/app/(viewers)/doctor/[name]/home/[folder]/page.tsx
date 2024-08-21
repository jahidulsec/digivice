import type { Metadata } from 'next';
import { loginBg } from '@/assets';
import Image from 'next/image';
import React from 'react';
import FolderPageHeader from '@/components/folder/Header';
import { cache } from '@/lib/cache';
import db from '../../../../../../../db/db';
import { DialogHeader } from '@/components/ui/dialog';
import ContentSection from '@/components/folder/ContentSection';
import { MessageSquareOff } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Folder - Doctor Chamber',
};

async function FolderPage({ params }: { params: { name: string; folder: string } }) {
  const getDoctorFolderContent = cache(
    () => {
      return db.folderContent.findMany({ where: { folderId: Number(params.folder) } });
    },
    [`/doctor/${params.name}/home/${params.folder}`, 'getDoctorFolderContent'],
    { revalidate: 24 * 60 * 60 }
  );

  const folderContent = await getDoctorFolderContent();

  return (
    <>
      <section className="relative ">
        <div className="relative bg-[#f3dced] ">
          {/* background */}
          <div className="absolute">
            <Image src={loginBg} alt="loginBg" width={360} height={640} className="w-full h-full object-cover" />
          </div>

          {/* contents */}
          <div className="content relative flex justify-center py-[5rem] px-10 min-h-screen sm:h-full">
            <div className=" px-5 py-10 sm:py-5 w-full min-w-[360px] min-h-[85vh] h-fit font-light border-2 rounded-md border-pink-100 bg-pink-300/40">
              {/* header */}
              <FolderPageHeader />

              {folderContent.length > 0.0 ? (
                <ContentSection folderContent={folderContent} />
              ) : (
                <div className="flex justify-center items-center flex-col py-20 text-black pointer-events-none">
                  <MessageSquareOff className="size-20" />
                  <span className="text-[11px]">No data</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FolderPage;
