'use struct';

export interface ShikiOptions {
  enable?: boolean;
  theme?: string;
}

const defaultOptions:ShikiOptions = {
  enable: false,
  theme: "one-dark-pro"
}

/**
 * 
 * @param {Object} lower base options
 * @param {Object} higher higher priority
 * @param {Object} opts default options
 */
export function mix(lower:ShikiOptions, higher:ShikiOptions):ShikiOptions{
  if((higher===null||higher===undefined)&&(lower===undefined||lower===null)) return defaultOptions;
  if(higher===undefined||higher===null) return lower;
  return Object.assign(defaultOptions, lower, higher);
}

export default {
  mix
}