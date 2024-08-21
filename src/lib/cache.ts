import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';

type CallBack = (...arg: any[]) => Promise<any>;

export function cache<T extends CallBack>(
  cb: T,
  keyparts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  return nextCache(reactCache(cb), keyparts, options);
}
