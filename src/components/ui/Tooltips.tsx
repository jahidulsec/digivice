import React from 'react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const Tooltips = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default Tooltips;
