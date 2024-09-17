import { loginBg } from '@/assets';
import Button from '@/components/doctorHome/Button';
import { cache } from '@/lib/cache';
import { FolderIcon, MessageSquareOff } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import db from '../../../../../../db/db';

export const metadata: Metadata = {
  title: 'Home - Doctor Chamber',
};

export default async function DoctorHome({ params }: { params: { name: string } }) {
  const getDoctorFolders = cache(
    () => {
      return db.folder.findMany({ where: { doctor: { slug: params.name } } });
    },
    [`/doctor/${params.name}/home`, 'getDoctorFolder'],
    { revalidate: 24 * 60 * 60 }
  );

  const folders = await getDoctorFolders();

  return (
    <section className="relative sm:flex sm:justify-center sm:items-center sm:min-h-screen sm:bg-pink-50/20 ">
      <div className="relative bg-[#f3dced] sm:bg-transparent sm:max-w-md sm:flex sm:rounded-md sm:shadow-sm sm:border sm:border-pink-300 sm:overflow-hidden">
        {/* background */}
        <div className="absolute w-screen min-h-screen sm:w-[450px]">
          <Image src={loginBg} alt="loginBg" width={360} height={640} className="w-full h-full object-cover" />
        </div>

        {/* contents */}
        <div className="content relative flex flex-col justify-center py-[5rem] px-10 min-h-[80vh] sm:h-full">
          {/* doctor card */}
          <div className="flex gap-2 items-center mb-5">
            <span className="size-10 flex justify-center items-center bg-pink-50 border rounded-full">
              <FolderIcon className="size-5" />
            </span>
            <h1 className="text-xl font-cb">folders</h1>
          </div>
          {/* buttons */}
          <div className="flex flex-col gap-10 px-5 py-10 justify-center w-full min-w-[300px] sm:min-h-[40vh] font-light border-2 rounded-md border-pink-100 bg-pink-300/40">
            {folders.length > 0 ? (
              folders.map((item) => <Button key={item.id} title={item.name} folderId={item.id} />)
            ) : (
              <>
                <div className="flex justify-center items-center flex-col py-20 text-gray-200 pointer-events-none">
                  <MessageSquareOff className="size-10" />
                  <span className="text-[11px]">No data</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
