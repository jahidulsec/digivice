'use client';

import { deleteDoctor } from '@/app/actions/doctor';
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
import { Doctor } from '@prisma/client';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Download, Edit, Folder, MessageSquareOff, QrCode, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import DoctorForm from './DoctorForm';
import QRCode from 'qrcode.react';
import { DoctorTableProps } from '@/app/admin/page';
import { formatNumber } from '@/lib/formatters';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

function DoctorTable({ doctors }: { doctors: DoctorTableProps[] }) {
  const [editDoctor, setEditDoctor] = useState<any>();
  const [delDoctor, setDelDoctor] = useState<any>();
  const [previewQR, setPreviewQR] = useState<any>();

  const [isPending, startTransition] = useTransition();

  const handleQrDownload = () => {
    const qrCode = document.getElementById('qrCodeEl') as HTMLCanvasElement;
    const qrCodeURL = qrCode.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = `${previewQR != undefined ? previewQR.slug : ''}.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  // export csv
  const convertToCSV = (objArray: object[]) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    console.log(array);
    let str = `Doctor - ${array[0].doctor.fullName} (${array[0].doctor.childId})  \r\n`;
    str += `\r\n`;
    str += "ID, Viewer's Name, Viewer's Email, Viewer's Mobile, Visited_at \r\n";

    for (let i = 0; i < array.length; i++) {
      let line = `${i + 1}`;
      for (let index in array[i]) {
        if (line !== '') line += ',';
        if (index !== 'doctor') {
          if (index !== 'createdAt') {
            line += array[i][index];
          } else {
            line += format(new Date(array[i][index]), 'dd LLL yyyy - h:mm aaa');
          }
        }
      }
      str += line + '\r\n';
    }
    return str;
  };

  const downloadCSV = async (id: number, name: string) => {
    const res = await fetch(`/api/visit/${id}`);
    const data = await res.json();
    if (data.length == 0) {
      toast.warning('No user login for this doctor');
      return;
    }
    const csvData = new Blob([convertToCSV(data)], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead className="text-center">Viewer&apos;s Count</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors.length > 0 ? (
            doctors.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.childId}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.designation}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell className="text-right">{formatNumber(item._count.Viewers)}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Tooltips title="Download Visits">
                    <Button
                      size={'icon'}
                      variant={'outline'}
                      className="rounded-full size-8"
                      onClick={() => {
                        downloadCSV(item.id, item.slug);
                      }}
                    >
                      <Download className="size-4" />
                    </Button>
                  </Tooltips>
                  <Tooltips title="QR Code">
                    <Button
                      size={'icon'}
                      variant={'outline'}
                      className="rounded-full size-8"
                      onClick={() => {
                        setPreviewQR(item);
                      }}
                    >
                      <QrCode className="size-4" />
                    </Button>
                  </Tooltips>

                  <Tooltips title="Folders">
                    <Button asChild size={'icon'} variant={'outline'} className="rounded-full size-8">
                      <Link href={`/admin/doctor/${item.slug}`}>
                        <Folder className="size-4" />
                      </Link>
                    </Button>
                  </Tooltips>
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
              <TableCell colSpan={7} align="center" className="py-20 text-gray-400 pointer-events-none">
                <MessageSquareOff className="size-10" />
                <span className="text-[11px]">No data</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* update doctor dialog */}
      <Dialog open={editDoctor} onOpenChange={setEditDoctor}>
        <DialogContent className="w-[75vw] p-0 ">
          <ScrollArea className="max-h-[85vh] px-6 my-6">
            <DialogHeader>
              <DialogTitle className="text-sm font-cb">Edit Doctor</DialogTitle>
            </DialogHeader>
            <DoctorForm doctor={editDoctor as Doctor} onClose={() => setEditDoctor(false)} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* alert delete vehicle modal */}
      <AlertDialog open={!!delDoctor} onOpenChange={setDelDoctor}>
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
                  await deleteDoctor(delDoctor);
                  toast.success('Doctor has been deleted');
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* update doctor dialog */}
      <Dialog open={previewQR} onOpenChange={setPreviewQR}>
        <DialogContent className="min-w-[18rem] md:max-w-[550px] aspect-square">
          <DialogHeader>
            <DialogTitle className="text-sm font-cb">QR Code</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center items-center sm:hidden">
            <QRCode
              id="qrCodeEl"
              size={220}
              value={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/doctor/${previewQR != undefined ? previewQR.slug : ''}`}
            />
          </div>

          <div className="justify-center items-center hidden sm:flex">
            <QRCode
              id="qrCodeEl"
              size={500}
              value={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/doctor/${previewQR != undefined ? previewQR.slug : ''}`}
            />
          </div>
          <Button type="button" onClick={handleQrDownload}>
            Download
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DoctorTable;
