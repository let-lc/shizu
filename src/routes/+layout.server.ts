import { initialization } from '$lib/helpers/data';

import type { LayoutServerLoad } from './$types';

export const ssr = true;

export const load: LayoutServerLoad = async () => {
  initialization();
  return {};
};
