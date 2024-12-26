import path from 'path';
import { promises as fs } from 'fs';
import mime from 'mime'; // You need to install this package
import db from '../../../../../../db/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const fileLocation = await db.folderContent.findUnique({
      where: { id: Number(id) },
      select: {
        thumbnailPath: true,
      },
    });

    console.log(fileLocation);

    if (!fileLocation || !fileLocation.thumbnailPath) throw new Error('No file');

    const filePath = path.join(process.cwd(), `public`, fileLocation.thumbnailPath);

    // Check if the file exists
    const fileExists = await fs.stat(filePath);

    if (!fileExists) {
      throw new Error('No file');
    }

    // Get the MIME type based on the file extension
    const mimeType = mime.getType(filePath);

    if (!mimeType) {
      throw new Error('Unsupported file type');
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath);

    // Set the correct content type

    return new Response(fileBuffer);
  } catch (error) {
    console.log(error);
    return new Response('');
  }
}
