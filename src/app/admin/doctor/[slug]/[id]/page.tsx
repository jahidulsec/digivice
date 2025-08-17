import FolderContentHeader from '@/components/admin/doctor/folderContent/Header';
import React, { Suspense } from 'react';
import db from '../../../../../../db/db';
import { Folder } from '@prisma/client';
import FilesSections from '@/components/admin/doctor/folderContent/FilesSections';

export default async function FolderContentPage({ params }: { params: { id: string } }) {
  const folder = await db.folder.findUnique({ where: { id: Number(params.id) } });

  return (
    <div className="container my-6">
      <FolderContentHeader folder={folder as Folder} />

      <Suspense fallback={<p>loading...</p>}>
        <DataView params={params} />
      </Suspense>
    </div>
  );
}

const DataView = async ({ params }: { params: { id: string } }) => {
  const contents = await db.folderContent.findMany({
    where: { folderId: Number(params.id) },
    orderBy: [
      {
        isPopular: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
  });

  return <FilesSections contents={contents} />;
};
