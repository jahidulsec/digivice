'use server';

import { z } from 'zod';
import db from '../../../db/db';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/lib/dal';

const addSchema = z.object({
  name: z.string().min(1),
  doctorSlug: z.string(),
});

export const addFolder = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null, toast: null };
  }

  const data = result.data;

  const doctor = await db.doctor.findFirst({ where: { slug: data.doctorSlug } });

  if (doctor == null) {
    return { error: null, success: null, toast: 'Something Went Wrong' };
  }

  const session = await getUser();

  if (!session) {
    return { error: null, success: null, toast: 'Invalid user, please login again' };
  }

  try {
    await db.folder.create({
      data: {
        name: data.name,
        doctorId: doctor.id as number,
        adminId: session.id as string,
      },
    });

    revalidatePath(`/admin/doctor/${data.doctorSlug}`);
    revalidatePath(`/doctor/${data.doctorSlug}/home`);

    return { error: null, success: 'Folder has been added', toast: null };
  } catch (error) {
    console.log(error);
    return { error: null, success: null, toast: 'Something went wrong' };
  }
};

export const updateFolder = async (id: number, prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null, toast: null };
  }

  const data = result.data;

  const folder = await db.folder.findUnique({ where: { id } });

  if (folder === null) {
    return { error: null, success: null, toast: 'Folder does not exist' };
  }

  const session = await getUser();

  if (!session) {
    return { error: null, success: null, toast: 'Invalid user, please login again' };
  }

  try {
    await db.folder.update({
      where: { id },
      data: {
        name: data.name,
      },
    });

    revalidatePath(`/admin/doctor/${data.doctorSlug}`);
    revalidatePath(`/doctor/${data.doctorSlug}/home`);

    return { error: null, success: 'Folder has been updated', toast: null };
  } catch (error) {
    console.log(error);
    return { error: null, success: null, toast: 'Something went wrong' };
  }
};

export const deleteFolder = async (id: number) => {
  const folder = await db.folder.findUnique({ where: { id }, include: { doctor: true } });

  if (folder == null) return notFound();

  await db.folder.delete({ where: { id } });

  revalidatePath(`/admin/doctor/${folder.doctor.slug}`);
  revalidatePath(`/doctor/${folder.doctor.slug}/home`);

  return;
};
