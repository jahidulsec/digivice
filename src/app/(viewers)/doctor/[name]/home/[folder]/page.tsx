import type { Metadata } from 'next';
import React from 'react';
import FolderPageHeader from '@/components/folder/Header';
import db from '../../../../../../../db/db';
import ContentSection from '@/components/folder/ContentSection';
import { MessageSquareOff } from 'lucide-react';
import PageBackground from '@/components/background/PageBackground';
import PageCardSection from '@/components/section/PageCardSection';

export const metadata: Metadata = {
  title: 'Folder - Digivice',
};

async function FolderPage({ params }: { params: { name: string; folder: string } }) {
  const getFolderName = () => {
    return db.folder.findUnique({
      where: { id: Number(params.folder) },
      select: { name: true },
    });
  };

  const getDoctorFolderContent = () => {
    return db.folderContent.findMany({
      where: { folderId: Number(params.folder) },
      orderBy: [
        {
          isPopular: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  };

  const [folderContent, folder] = await Promise.all([getDoctorFolderContent(), getFolderName()]);

  return (
    <>
      <section className="relative min-h-full1">
        {/* background */}
        <PageBackground />

        <PageCardSection>
          <FolderPageHeader folderName={folder?.name as string} />
          <div className="px-6 flex mb-14 flex-col gap-14">
            {folderContent.length > 0 ? (
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
