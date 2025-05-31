import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import db from '../../../../db/db';
import { getUser } from '@/lib/dal';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File;
    const thumbnail = formData.get('thumbnail') as File;
    const folderId = formData.get('folderId');
    const name = formData.get('name')?.toString();
    const doctorSlug = formData.get('doctorSlug');

    if (file.size == undefined || file.size == 0) {
      return NextResponse.json({ status: 'error', message: 'Please select a file' }, { status: 400 });
    }

    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(fileArrayBuffer);

    const validFileType = [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'video/mp4',
      'application/pdf',
    ];
    const validThumbnailType = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/avif'];

    if (!validFileType.includes(file.type)) {
      return NextResponse.json(
        { status: 'error', message: `This ${file.name.split('.').pop()} is not acceptable` },
        { status: 400 }
      );
    }

    if (thumbnail && thumbnail?.size && !validThumbnailType.includes(thumbnail.type)) {
      return NextResponse.json({ status: 'error', message: 'Thumbail should be image type' }, { status: 400 });
    }

    const folder = await db.folder.findUnique({ where: { id: Number(folderId) } });

    if (folder == null) {
      return NextResponse.json({ status: 'error', message: 'Folder not found' }, { status: 400 });
    }

    const doctor = await db.doctor.findUnique({ where: { slug: doctorSlug as string } });

    if (doctor == null) {
      return NextResponse.json({ status: 'error', message: 'Folder does not exist' }, { status: 400 });
    }

    const session = await getUser();


    if (!session) {
      return NextResponse.json({ status: 'error', message: 'Invalid user, please login again' }, { status: 401 });
    }

    fs.mkdir(`public/assets/${doctorSlug}`, { recursive: true });

    const filePath = `/assets/${doctorSlug}/${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(`public${filePath}`, fileBuffer);

    let thumbnailPath = '';

    if (thumbnail.size != undefined) {
      const thumbArrayBuffer = await file.arrayBuffer();
      const thumbBuffer = new Uint8Array(thumbArrayBuffer);
      thumbnailPath = `/assets/${doctorSlug}/${crypto.randomUUID()}-${thumbnail.name}`;
      await fs.writeFile(`public${thumbnailPath}`, thumbBuffer);
    }

    await db.folderContent.create({
      data: {
        name: name || file.name,
        filePath: filePath,
        thumbnailPath: thumbnailPath,
        folderId: Number(folderId),
        adminId: session?.id as string,
      },
    });

    revalidatePath(`/admin/doctor/${doctorSlug}/${folderId}`);
    revalidatePath(`/doctor/${doctorSlug}/home/${folderId}`);

    return NextResponse.json({ status: 'success', message: 'Succesfully added' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 'fail', message: (e as any).message }, { status: 400 });
  }
}
