import { homeBgBottom, homeBgTop, welcome } from '@/assets';
import { Button } from '@/components/ui/button';
import { cache } from '@/lib/cache';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import db from '../../../../../db/db';

export const metadata: Metadata = {
  title: 'Welcome - Doctor Chamber',
};

export default async function DoctorPage({ params }: { params: { name: string } }) {
  const doctor = await db.doctor.findUnique({ where: { slug: params.name }, select: { fullName: true } });

  return (
    <section className="relative h-screen">
      {/* bg image top */}
      <div className="absolute right-0">
        <Image src={homeBgTop} alt="home-bg" width={400} height={400} />
      </div>

      {/* bg image bottom */}
      <div className="absolute bottom-0">
        <Image src={homeBgBottom} alt="home-bg" width={307} height={280} />
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
          <Button className="bg-p1 hover:bg-p1/75 font-cb" asChild>
            <Link href={`/doctor/${params.name}/login`}>
              <span>Next</span>
              <ChevronRight className="size-4 ml-4" />
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
