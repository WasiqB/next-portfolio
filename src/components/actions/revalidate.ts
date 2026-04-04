'use server';

import { updateTag } from 'next/cache';

export async function revalidateAction(tag: string) {
  if (!tag) return;
  console.info(`Revalidating tag: ${tag}`);
  updateTag(tag);
}
