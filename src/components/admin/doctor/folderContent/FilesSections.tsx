import React from 'react';
import db from '../../../../../db/db';

export default async function FilesSections({ params }: { params: { id: string } }) {
  const contents = await db.folderContent.findMany({ where: { folderId: Number(params.id) } });

  return <div className="my-6"></div>;
}
