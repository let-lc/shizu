import { redirect } from '@sveltejs/kit';

import { building, dev } from '$app/environment';

import type { PageLoad } from './$types';

export const ssr = dev || !building;
export const csr = dev || !building;

export const load: PageLoad = async () => {
  throw redirect(308, '/new/http');
};
