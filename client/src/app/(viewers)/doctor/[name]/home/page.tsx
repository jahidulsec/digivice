import { cache } from '@/lib/cache';
import { Metadata } from 'next';
import React from 'react';
import db from '../../../../../../db/db';
import PageBackground from '@/components/background/PageBackground';
import PageCardSection from '@/components/section/PageCardSection';
import Button from '@/components/doctorHome/Button';
import { Button as ButtonUi } from '@/components/ui/button';
import { folderIcon, infoIcon, pdfIcon, videoIcon } from '@/assets';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Link as LinkIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home - Digivice',
};

export default async function DoctorHome({ params }: { params: { name: string } }) {
  const [folders, socialLinks] = await Promise.all([
    db.folder.findMany({ where: { doctor: { slug: params.name } } }),
    db.socialMediaLinks.findMany({ where: { doctor: { slug: params.name } } }),
  ]);

  return (
    <section className="relative  min-h-screen">
      {/* background */}
      <PageBackground />

      <PageCardSection>
        <div className="button-container px-6 my-14 flex flex-col gap-14">
          {folders.map((item) => (
            <Button
              key={item.id}
              name={item.name}
              folderId={item.id.toString()}
              src={
                item.name.toLowerCase() === 'video'
                  ? videoIcon
                  : item.name.toLowerCase() === 'infographic'
                    ? infoIcon
                    : item.name.toLowerCase() === 'pdf'
                      ? pdfIcon
                      : folderIcon
              }
            />
          ))}
        </div>

        <section className="links flex items-center justify-center gap-3 mb-5">
          {socialLinks.map((item) => (
            <ButtonUi asChild variant={'outline'} size={'icon'}>
              <Link target="_blank" href={`https://${item.url}`} className="text-p1 rounded-full border-p1">
                {item.siteName.toLowerCase() === 'facebook' ? (
                  <Facebook />
                ) : item.siteName.toLowerCase() === 'instagram' ? (
                  <Instagram />
                ) : item.siteName.toLowerCase() === 'twiter' ? (
                  <Twitter />
                ) : (
                  <LinkIcon />
                )}
              </Link>
            </ButtonUi>
          ))}
        </section>
      </PageCardSection>
    </section>
  );
}
