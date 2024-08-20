import FolderTable from '@/components/admin/doctor/folders/FolderTable';
import FolderHeader from '@/components/admin/doctor/folders/Header';
import React, { Suspense } from 'react';
import db from '../../../../../db/db';
import { Prisma } from '@prisma/client';
import TableSkeleton from '@/components/ui/TableSkeleton';

export default async function DoctorFolderPage({ params }: { params: { slug: string } }) {
  return (
    <div className="my-6 container">
      <FolderHeader />

      <Suspense fallback={<TableSkeleton />}>
        <DataTable params={params} />
      </Suspense>
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
