import { DataTable } from '@/components/admin/home/DataTable';
import FilterSections from '@/components/admin/home/FilterSections';
import React from 'react';

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
