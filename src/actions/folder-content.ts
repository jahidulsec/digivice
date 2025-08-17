'use server';

import { revalidatePath } from 'next/cache';
import db from '../../db/db';

export const updateMostPopularStatus = async (id: number, popular: boolean) => {
  try {
    const validatedData = popular ? 1 : 0;

    const file = await db.folderContent.update({
      where: { id: id },
      data: {
        isPopular: validatedData,
      },
      include: {
        folder: {
          include: {
            doctor: true,
          },
        },
      },
    });

    revalidatePath(`/admin/doctor/${file.folder.doctor.slug}/${file.folderId}`);

    return {
      success: true,
      message: popular
        ? `${file.name} is added to most popular content`
        : `${file.name} is removed from most popular content`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
