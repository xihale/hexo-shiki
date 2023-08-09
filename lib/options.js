'use struct';

/**
 * 
 * @param {Array} argv the options needs
 * @param {Object} lower the base options
 * @param {Object} higher the higher options
 * @param {Object} opts default options
 */
function mix(options, lower, higher, opts={}){
  if((higher===null||higher===undefined)&&(lower===undefined||lower===null)) return opts;
  if(higher===undefined||higher===null) return lower;
  for(let key in options){
    key=options[key];
    if(higher[key]!==undefined) opts[key]=higher[key];
    else opts[key]=lower[key];
  }
  return opts;
}

module.exports = {mix}
