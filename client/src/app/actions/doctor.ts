'use server';

import { z } from 'zod';
import db from '../../../db/db';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/lib/dal';
import { Prisma } from '@prisma/client';

const phoneRegex = new RegExp(/^01(\d{9})$/)

const addSchema = z.object({
  fullName: z.string().min(1),
  designation: z.string(),
  email: z.union([
    z.literal(''),
    z.string().email()
  ]),
  mobile: z.string().regex(phoneRegex, 'At least 11 numbers and startwith 01'),
  childId: z.coerce.number().min(1, 'At least a number'),
});

export const addDoctor = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null, toast: null };
  }

  const data = result.data;

  const slug =
    Number(data.childId || 0) + '-' + data.fullName.replaceAll('.', '').split(' ').join('-').toLowerCase();

  try {
    const session = await getUser();

    if (!session) {
      return { error: null, success: null, toast: 'Invalid user, please login again' };
    }

    const doctor = await db.doctor.create({
      data: {
        fullName: data.fullName,
        designation: data.designation,
        email: data.email,
        mobile: '+88'+ data.mobile,
        childId: data.childId,
        adminId: session?.id as string,
        slug: slug,
      },
    });

    // create initial three folders
    await db.folder.createMany({
      data: [
        {
          name: 'Video',
          doctorId: doctor.id,
          adminId: session?.id as string, 
        },
        {
          name: 'Infographic',
          doctorId: doctor.id,
          adminId: session?.id as string, 
        },
        {
          name: 'PDF',
          doctorId: doctor.id,
          adminId: session?.id as string, 
        },
      ]
    })

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/' + doctor.slug);

    return { error: null, success: 'Doctor has been added', toast: null };
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === 'P2002') {
        return { error: null, success: null, toast: 'This ID already exist' };
      }
    }
    console.log(error);
    return { error: null, success: null, toast: 'Something went wrong' };
  }
};

export const updateDoctor = async (id: number, prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null, toast: null };
  }

  const doctor = await db.doctor.findUnique({ where: { id } });

  if (doctor == null) {
    return { error: null, success: null, toast: 'Doctor is not exists' };
  }

  const data = result.data;

  const slug = data.childId + '-' + data.fullName.replaceAll('.', '').split(' ').join('-').toLowerCase();

  try {
    const session = await getUser();

    if (!session) {
      return { error: null, success: null, toast: 'Invalid user, please login again' };
    }

    if (session == null) {
      throw new Error('invalid user');
    }

    await db.doctor.update({
      where: { id },
      data: {
        fullName: data.fullName,
        designation: data.designation,
        email: data.email,
        childId: data.childId,
        mobile: "+88" +data.mobile,
        adminId: session?.id as string,
        slug: slug,
      },
    });

    revalidatePath('/');
    revalidatePath('/admin');

    return { error: null, success: 'Doctor has been updated', toast: null };
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === 'P2002') {
        return { error: null, success: null, toast: 'This ID already exist' };
      }
    }
    console.log(error);
    return { error: null, success: null, toast: 'Something went wrong' };
  }
};

export const deleteDoctor = async (id: number) => {
  const doctor = await db.doctor.findUnique({ where: { id } });

  if (doctor == null) return notFound();

  await db.doctor.delete({ where: { id } });

  revalidatePath('/admin');
};
