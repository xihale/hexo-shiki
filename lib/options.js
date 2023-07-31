'use struct';

/**
 * 
 * @param {Array} argv the options needs
 * @param {*} lower the base options
 * @param {*} higher the higher options
 */
function mix(options, lower, higher){
  let opts={};
  if(lower===undefined&&higher===undefined) return opts;
  if(higher===undefined) return lower;
  for(let key in options){
    key=options[key];
    if(higher[key]!==undefined) opts[key]=higher[key];
    else opts[key]=lower[key];
  }
  return opts;
}

module.exports = {mix}