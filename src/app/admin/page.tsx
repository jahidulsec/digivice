import DoctorTable from '@/components/admin/home/DoctorTable';
import FilterSections from '@/components/admin/home/FilterSections';
import React, { Suspense } from 'react';
import db from '../../../db/db';
import { Doctor } from '@prisma/client';
import PagePagination from '@/components/ui/PagePagination';
import TableSkeleton from '@/components/ui/TableSkeleton';

export default async function DashboardHomePage({ searchParams }: { searchParams: { q: string; p: string } }) {
  return (
    <div className="container my-6">
      {/* filters and buttons */}
      <FilterSections />

      {/* table */}
      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function DataTable({ searchParams }: { searchParams: { q: string; p: string } }) {
  let count;
  let doctors;
  const limit = 20;

  if (searchParams.q) {
    [doctors, count] = await Promise.all([
      db.doctor.findMany({
        where: {
          fullName: { contains: searchParams.q },
        },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.doctor.count({
        where: {
          fullName: { contains: searchParams.q },
        },
      }),
    ]);
  } else {
    [doctors, count] = await Promise.all([
      db.doctor.findMany({
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.doctor.count(),
    ]);
  }

  return (
    <>
      <DoctorTable doctors={doctors as Doctor[]} />

      <div className="border-t pt-5">
        <PagePagination limit={limit} count={count} />
      </div>
    </>
  );
}
