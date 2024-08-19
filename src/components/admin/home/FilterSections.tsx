'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import DoctorForm from './DoctorForm';

export default function FilterSections() {
  const [addDoctor, setAddDoctor] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center gap-5 my-6">
        {/* filters */}
        <div className="filters">
          {/* search */}
          <div className="search relative">
            <Input title="Search" className="pl-10 w-[18rem]" id="search" placeholder="Search by doctor name" />
            <Label htmlFor="search" className="absolute top-[50%] -translate-y-[50%] left-3">
              <Search className="size-4" />
            </Label>
          </div>
        </div>
        {/* buttons */}
        <Button onClick={() => setAddDoctor(true)}>Add Doctor</Button>
      </div>

      {/* add doctor dialog */}
      <Dialog open={addDoctor} onOpenChange={setAddDoctor}>
        <DialogContent className="w-[75vw]">
          <DialogHeader>
            <DialogTitle className="text-sm">Add Doctor</DialogTitle>
          </DialogHeader>
          <DoctorForm onClose={() => setAddDoctor(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
