import { halfQ, homeBgBottom, homeBgTop, welcome } from '@/assets';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import db from '../../../../../db/db';
import Background from '@/components/background/Background';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Welcome - Digivice',
};

export default async function DoctorPage({ params }: { params: { name: string } }) {
  const doctor = await db.doctor.findUnique({
    where: { slug: params.name },
    select: { fullName: true, id: true, designation: true },
  });

  if (doctor == null) {
    return notFound();
  }

  await db.viewers.create({
    data: {
      doctorId: Number(doctor?.id),
    },
  });

  return (
    <section className="relative">
      <Background />

      {/* top half q */}
      <div className="fixed top-0 left-0 opacity-[8%]">
        <Image src={halfQ} alt="welcom" width={500} height={500} className="w-[12rem]" />
      </div>

      {/* advice logo */}
      <div className="fixed top-9 left-10 ">
        <div className="flex flex-col items-end">
          <h3 className="font-car text-3xl text-p1">Advice</h3>
          <h4 className="font-ar -mt-4 text-md text-muted-foreground">from</h4>
        </div>
      </div>

      {/* content */}
      <div className="fixed top-[50%] -translate-y-[50%] right-0">
        <div className="content relative flex justify-center items-end flex-col">
          <div className="relative flex justify-center items-end flex-col text-p1 pr-10">
            <div className="bg-p1 w-5 h-12 absolute right-0"></div>
            <h1 className="font-cb text-2xl">{doctor?.fullName}</h1>
            <h2 className="font-cr font-light">{doctor?.designation || 'Digital Advice Room'}</h2>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-end pr-10 mt-10">
          <Button className="bg-p1 hover:bg-p1/75 px-4 py-1 h-auto rounded flex justify-center items-center" asChild>
            <Link href={`/doctor/${params.name}/login`}>
              <span className="font-cr">Next</span>
              <ChevronRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 ">
        <Image src={welcome} alt="welcom" width={380} height={670} className="w-[8rem]" />
      </div>

      <div className="fixed bottom-0 h-5 w-full bg-p2"></div>
    </section>
  );
}
