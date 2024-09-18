'use server';

import { notFound } from 'next/navigation';
import db from '../../../db/db';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/lib/dal';

export const addFiles = async (prevState: unknown, formData: FormData) => {
  try {
    const files = formData.getAll('file') as File[];
    const folderId = formData.get('folderId');
    const name = formData.get('name')?.toString();
    const doctorSlug = formData.get('doctorSlug');

    if (files[0].size == 0) {
      return { error: 'Please select a file', success: null, toast: null };
    }

    const folder = await db.folder.findUnique({ where: { id: Number(folderId) } });

    if (folder == null) {
      return { error: null, success: null, toast: 'Folder does not exist' };
    }

    const doctor = await db.doctor.findUnique({ where: { slug: doctorSlug as string } });

    if (doctor == null) {
      return { error: null, success: null, toast: 'Folder does not exist' };
    }

    const session = await getUser();

    if (!session) {
      return { error: null, success: null, toast: 'Invalid user, please login again' };
    }

    fs.mkdir(`public/assets/${doctorSlug}`, { recursive: true });

    for (let i = 0; i < files.length; i++) {
      const filePath = `/assets/${doctorSlug}/${crypto.randomUUID()}-${files[i].name}`;
      await fs.writeFile(`public${filePath}`, Buffer.from(await files[i].arrayBuffer()));

      await db.folderContent.create({
        data: {
          name: name || files[i].name,
          filePath: filePath,
          folderId: Number(folderId),
          adminId: session?.id as string,
        },
      });
    }

    revalidatePath(`/admin/doctor/${doctorSlug}/${folderId}`);
    revalidatePath(`/doctor/${doctorSlug}/home/${folderId}`);

    return { error: null, success: 'Files are added', toast: null };
  } catch (error) {
    console.log(error);
    return { error: null, success: null, toast: 'Something went wrong' };
  }
};

export const deleteFile = async (id: number) => {
  const file = await db.folderContent.findUnique({ where: { id }, include: { folder: { include: { doctor: true } } } });

  if (file == null) return notFound();

  await db.folderContent.delete({ where: { id } });

  try {
    // delete file and image when delete the product
    await fs.unlink(`public${file.filePath}`);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/doctor/${file.folder.doctor.slug}/${file.folderId}`);
  revalidatePath(`/doctor/${file.folder.doctor.slug}/home/${file.folderId}`);

  return;
};
