'use strict';

import fs from 'node:fs';

/**
 * Writes the given log to the "hexo-shiki.log" file.
 *
 * @param {string} log - The log to be written. It can be an object or a string.
 * @return {undefined} This function does not return anything.
 */
export function log(log){

  fs.writeFile("hexo-shiki.log", log+'\n', {
    flag: "a",
  },_=>{});
}

// init log file
fs.writeFile("hexo-shiki.log", "", {}, _=>{});
