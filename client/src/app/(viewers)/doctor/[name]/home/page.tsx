import { cache } from '@/lib/cache';
import { Metadata } from 'next';
import React from 'react';
import db from '../../../../../../db/db';
import PageBackground from '@/components/background/PageBackground';
import PageCardSection from '@/components/section/PageCardSection';
import Button from '@/components/doctorHome/Button';
import { folderIcon, infoIcon, pdfIcon, videoIcon } from '@/assets';

export const metadata: Metadata = {
  title: 'Home - Digivice',
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
    <section className="relative  min-h-screen">
      {/* background */}
      <PageBackground />

      <PageCardSection>
        <div className="button-container px-6 my-14 flex flex-col gap-14">
          {
            folders.map(item => (
              <Button key={item.id} name={item.name} folderId={item.id.toString()} src={
                item.name.toLowerCase() === 'video' ? videoIcon :
                item.name.toLowerCase() === 'infographic' ? infoIcon :
                item.name.toLowerCase() === 'pdf' ? pdfIcon : folderIcon
              } />
            ))
          }
        </div>
      </PageCardSection>
    </section>
  );
}
