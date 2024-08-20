import FolderTable from '@/components/admin/doctor/folders/FolderTable';
import FolderHeader from '@/components/admin/doctor/folders/Header';
import React from 'react';
import db from '../../../../../db/db';
import { Prisma } from '@prisma/client';

export default async function DoctorFolderPage({ params }: { params: { slug: string } }) {
  return (
    <div className="my-6 container">
      <FolderHeader />

      <DataTable params={params} />
    </div>
  );
}

export type FolderProps = Prisma.FolderGetPayload<{ include: { admin: true; doctor: true } }>;

const DataTable = async ({ params }: { params: { slug: string } }) => {
  const folders = await db.folder.findMany({
    where: {
      doctor: {
        slug: params.slug,
      },
    },
    include: { doctor: true, admin: true },
  });

  return <FolderTable folders={folders as FolderProps[]} />;
};
