import { halfQ, homeBgBottom, homeBgTop, welcome } from '@/assets';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import db from '../../../../../db/db';
import Background from '@/components/background/Background';

export const metadata: Metadata = {
  title: 'Welcome - Digivice',
};

export default async function DoctorPage({ params }: { params: { name: string } }) {
  const doctor = await db.doctor.findUnique({ where: { slug: params.name }, select: { fullName: true, id: true } });
  await db.viewers.create({
    data: {
      doctorId: Number(doctor?.id),
    },
  });

  return (
    <section className="relative h-screen">
      <Background />

      {/* top half q */}
      <div className="absolute top-0 left-0 opacity-[8%]">
        <Image src={halfQ} alt="welcom" width={500} height={500} className="w-[12rem]" />
      </div>

      {/* advice content */}
      <div className="absolute top-9 left-10 ">
        <p className='flex flex-col items-end'>
          <h3 className="font-car text-3xl text-p1">Advice</h3>
          <h4 className="font-ar -mt-4 text-md text-muted-foreground">from</h4>
        </p>
      </div>

      {/* content */}
      <div className="content relative h-full flex justify-center items-end flex-col">
        <div className="relative flex justify-center items-end flex-col text-p1 pr-10">
          <div className="bg-p1 w-5 h-12 absolute right-0"></div>
          <h1 className="font-cb text-2xl">{doctor?.fullName}’s</h1>
          <h2 className="font-cr font-light">Digital Advice Room</h2>
        </div>
        {/* button */}

        <div className="flex justify-end pr-10 mt-10">
          <Button className="bg-p1 hover:bg-p1/75 px-4 py-1 h-auto rounded flex justify-center items-center" asChild>
            <Link href={`/doctor/${params.name}/login`} >
              <span className='font-cr'>Next</span>
              <ChevronRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 ">
        <Image src={welcome} alt="welcom" width={380} height={670} className="w-[8rem]" />
      </div>
    </section>
  );
}
