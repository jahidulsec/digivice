import DoctorTable from '@/components/admin/home/DoctorTable';
import FilterSections from '@/components/admin/home/FilterSections';
import React from 'react';
import db from '../../../db/db';
import { Doctor } from '@prisma/client';

export default async function DashboardHomePage() {
  return (
    <div className="container my-6">
      {/* filters and buttons */}
      <FilterSections />

      {/* table */}
      <DataTable />
    </div>
  );
}

async function DataTable() {
  const doctors = await db.doctor.findMany();

  return (
    <>
      <DoctorTable doctors={doctors as Doctor[]} />
    </>
  );
}
