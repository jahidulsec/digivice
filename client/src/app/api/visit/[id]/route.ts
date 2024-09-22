import db from '../../../../../db/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const data = await db.visit.findMany({
      where: { doctorId: Number(id) },
      select: {
        name: true, 
        email: true, 
        mobile: true,
        createdAt: true,
        doctor: {select: {fullName: true, childId: true}}
      },
      
    });

    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}
