import { STATUS_COLOR_LEVEL } from '$lib/constants';
import type { StatusLevelType } from '$lib/types/level';

export const getStatusLevel = (percent: number): StatusLevelType => {
  if (percent === 1) {
    return 'OPERATIONAL';
  } else if (percent >= 0.9) {
    return 'ACCEPTABLE';
  } else if (percent >= 0.25) {
    return 'UNSTABLE';
  } else {
    return 'CRITICAL';
  }
};

export const getStatusColor = (percent: number) => {
  if (percent === 1) {
    return STATUS_COLOR_LEVEL.OPERATIONAL;
  } else if (percent >= 0.9) {
    return STATUS_COLOR_LEVEL.ACCEPTABLE;
  } else if (percent >= 0.25) {
    return STATUS_COLOR_LEVEL.UNSTABLE;
  } else {
    return STATUS_COLOR_LEVEL.CRITICAL;
  }
};

/**
 * {@link https://github.com/sveltejs/language-tools/issues/1026#issuecomment-1002839154}
 *
 * Dirty trick to ignore svelte ts error.
 *
 * @param value any value
 * @returns same value with any as type
 */
export const ignoreSvelteTsError = (value: any) => value;
