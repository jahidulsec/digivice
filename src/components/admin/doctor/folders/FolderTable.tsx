'use client';

import { deleteDoctor } from '@/app/actions/doctor';
import { FolderProps } from '@/app/admin/doctor/[slug]/page';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Tooltips from '@/components/ui/Tooltips';
import { formatDate } from '@/lib/formatters';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Edit, MessageSquareOff, Trash, Folder as FolderIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import FolderForm from './FolderForm';

function FolderTable({ folders }: { folders: FolderProps[] }) {
  const [editFolder, setEditFolder] = useState<any>();
  const [delFolder, setDelFolder] = useState<any>();

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {folders.length > 0 ? (
            folders.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <FolderIcon className="size-4" />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.doctor.fullName}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>{item.admin?.name}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Tooltips title="Edit">
                    <Button
                      size={'icon'}
                      variant={'outline'}
                      className="rounded-full size-8"
                      onClick={() => setEditFolder(item)}
                    >
                      <Edit className="size-4" />
                    </Button>
                  </Tooltips>
                  <Tooltips title="Delete">
                    <Button
                      size={'icon'}
                      variant={'destructive'}
                      className="rounded-full size-8"
                      onClick={() => setDelFolder(item.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </Tooltips>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center" className="py-20 text-gray-400 pointer-events-none">
                <MessageSquareOff className="size-10" />
                <span className="text-[11px]">No data</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* update doctor dialog */}
      <Dialog open={editFolder} onOpenChange={setEditFolder}>
        <DialogContent className="w-[75vw]">
          <DialogHeader>
            <DialogTitle className="text-sm font-cb">Edit Doctor</DialogTitle>
          </DialogHeader>
          <FolderForm onClick={() => setEditFolder(false)} folder={editFolder} />
        </DialogContent>
      </Dialog>

      {/* alert delete vehicle modal */}
      <AlertDialog open={!!delFolder} onOpenChange={setDelFolder}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this Doctor and remove data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  await deleteDoctor(delFolder);
                  toast.success('Vehicle has been deleted');
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default FolderTable;
