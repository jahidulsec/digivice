'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Tooltips from '@/components/ui/Tooltips';
import { Doctor } from '@prisma/client';
import { Edit, MessageSquareOff, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function DoctorTable({ doctors }: { doctors: Doctor[] }) {
  const [editDoctor, setEditDoctor] = useState<any>();
  const [delDoctor, setDelDoctor] = useState<any>();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors.length > 0 ? (
            doctors.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.designation}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Tooltips title="Edit">
                    <Button
                      size={'icon'}
                      variant={'outline'}
                      className="rounded-full size-8"
                      onClick={() => setEditDoctor(item)}
                    >
                      <Edit className="size-4" />
                    </Button>
                  </Tooltips>
                  <Tooltips title="Delete">
                    <Button
                      size={'icon'}
                      variant={'destructive'}
                      className="rounded-full size-8"
                      onClick={() => setDelDoctor(item.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </Tooltips>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" className="py-20 border-b text-gray-400 pointer-events-none">
                <MessageSquareOff className="size-10" />
                <span className="text-[11px]">No data</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default DoctorTable;
