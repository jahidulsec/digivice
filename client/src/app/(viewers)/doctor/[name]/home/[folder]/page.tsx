import type { Metadata } from 'next';
import { loginBg } from '@/assets';
import Image from 'next/image';
import React from 'react';
import FolderPageHeader from '@/components/folder/Header';
import { cache } from '@/lib/cache';
import db from '../../../../../../../db/db';
import ContentSection from '@/components/folder/ContentSection';
import { MessageSquareOff } from 'lucide-react';
import PageBackground from '@/components/background/PageBackground';
import PageCardSection from '@/components/section/PageCardSection';

export const metadata: Metadata = {
  title: 'Folder - Digivice',
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
      <section className="relative  min-h-screen">
        {/* background */}
        <PageBackground />

        <PageCardSection>
          <div className="px-6 my-14 flex flex-col gap-14">
            {folderContent.length > 0.0 ? (
              <ContentSection folderContent={folderContent} />
            ) : (
              <div className="flex justify-center items-center flex-col py-20 text-p1/50 pointer-events-none">
                <MessageSquareOff className="size-20" />
                <span className="text-[11px]">No data</span>
              </div>
            )}
          </div>
        </PageCardSection>
      </section>
    </>
  );
}

export default FolderPage;

// {folderContent.length > 0.0 ? (
//   <ContentSection folderContent={folderContent} />
// ) : (
//   <div className="flex justify-center items-center flex-col py-20 text-p1/50 pointer-events-none">
//     <MessageSquareOff className="size-20" />
//     <span className="text-[11px]">No data</span>
//   </div>
// )}
