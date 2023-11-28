import { building, dev } from '$app/environment';
import { getServerList } from '$lib/helpers/data';

import type { PageServerLoad } from './$types';

export const prerender = true;
export const ssr = dev || !building;

export const load: PageServerLoad = async () => {
  return { servers: getServerList() };
};
