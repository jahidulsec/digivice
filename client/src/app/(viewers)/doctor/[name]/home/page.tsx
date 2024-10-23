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
    db.folder.findMany({
      where: { doctor: { slug: params.name } },
      include: {
        _count: {
          select: { folderContent: true },
        },
      },
    }),
    db.socialMediaLinks.findMany({ where: { doctor: { slug: params.name } } }),
  ]);

  return (
    <section className="relative  min-h-screen">
      {/* background */}
      <PageBackground />

      <PageCardSection>
        <div className="flex flex-col justify-between gap-5 min-h-[50vh]">
          <section className="button-container px-6 my-14 flex flex-col gap-14">
            {folders.map((item) => {
              if (item._count.folderContent == 0) return null;
              return (
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
              );
            })}
          </section>

          <section className="links flex items-center justify-center gap-3 mb-5">
            {socialLinks.map((item) => (
              <ButtonUi key={item.id} asChild variant={'outline'} size={'icon'} className="rounded-full">
                <Link target="_blank"
                 href={{pathname: item.url}} 
                 className="text-p1  border-p1">
                  {item.siteName.toLowerCase() === 'facebook' ? (
                    <Facebook className="size-4" />
                  ) : item.siteName.toLowerCase() === 'instagram' ? (
                    <Instagram className="size-4" />
                  ) : item.siteName.toLowerCase() === 'twiter' ? (
                    <Twitter className="size-4" />
                  ) : (
                    <LinkIcon className="size-4" />
                  )}
                </Link>
              </ButtonUi>
            ))}
          </section>
        </div>
      </PageCardSection>
    </section>
  );
}
