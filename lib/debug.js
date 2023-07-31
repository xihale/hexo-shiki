'use strict';

const fs = require('fs');

/**
 * Writes the given log to the "hexo-shiki.log" file.
 *
 * @param {string} log - The log to be written. It can be an object or a string.
 * @return {undefined} This function does not return anything.
 */
function log(log){

  fs.writeFile("hexo-shiki.log", log+'\n', {
    flag: "a",
  },_=>{});
}

// init log file
fs.writeFile("hexo-shiki.log", "", {}, _=>{});

module.exports = {log};