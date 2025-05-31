'use server';

import { z } from 'zod';
import db from '../../../db/db';
import { notFound } from 'next/navigation';

const addSchema = z.object({
  phone: z.string().min(11, 'At least 11 characters'),
  name: z.string().min(3, 'At least 3 characters'),
  email: z.string().optional(),
  doctorSlug: z.string().optional(),
});

export const addViewer = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null, toast: null };
  }

  const data = result.data;

  const doctor = await db.doctor.findUnique({ where: { slug: data.doctorSlug } });

  if (doctor == null) return notFound();

  try {
    await db.visit.create({ data: { 
      mobile: data.phone, 
      email: data.email, 
      name: data.name, 
      doctorId: doctor.id 
    } 
  });
    return { error: null, success: true, toast: null };
  } catch (error) {
    console.log(error);
  }
};
