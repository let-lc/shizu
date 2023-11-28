import type {
  HttpMethodType,
  ServerConfigType,
  ValueFromType,
} from '$lib/types';

import type { StatusLevelType } from './types/level';

export const SERVER_TYPES: Array<ServerConfigType['serverType']> = [
  'http',
  'tcp',
];

export const HTTP_METHODS: Array<HttpMethodType> = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
];

export const VALUE_FROM: Array<{ value: ValueFromType; label: string }> = [
  { value: 'config', label: 'Configuration File' },
  { value: 'env', label: 'Environment Variable' },
];

export const STATUS_COLOR_LEVEL: Record<StatusLevelType, string> = {
  OPERATIONAL: '#22c55e',
  ACCEPTABLE: '#a3e635',
  UNSTABLE: '#facc15',
  CRITICAL: '#ef4444',
};
