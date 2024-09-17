import db from '../../../../../db/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const data = await db.visit.findMany({
      where: { doctorId: Number(id) },
    });

    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}
