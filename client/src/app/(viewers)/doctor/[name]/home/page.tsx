import { cache } from '@/lib/cache';
import { Metadata } from 'next';
import React from 'react';
import db from '../../../../../../db/db';
import PageBackground from '@/components/background/PageBackground';
import PageCardSection from '@/components/section/PageCardSection';
import Button from '@/components/doctorHome/Button';
import { infoIcon, pdfIcon, videoIcon } from '@/assets';

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
    <section className="relative  min-h-screen">
      {/* background */}
      <PageBackground />

      <PageCardSection>
        <div className="button-container px-6 my-14 flex flex-col gap-14">
          <Button src={videoIcon} name="Video" />
          <Button src={infoIcon} name="Infographic" />
          <Button src={pdfIcon} name="PDF" />
        </div>
      </PageCardSection>
    </section>
  );
}
