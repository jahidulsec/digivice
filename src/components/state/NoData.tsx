import React from 'react';
import { MessageSquareOff } from 'lucide-react';

const NoData = () => {
  return (
    <div className="flex justify-center items-center flex-col py-20 text-gray-400 pointer-events-none">
      <MessageSquareOff className="size-10" />
      <span className="text-[11px]">No data</span>
    </div>
  );
};

export { NoData };
