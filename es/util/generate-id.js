
/**
 * Returns a psuedo-unique identifier used by fragments
 * to track match status within MatchCache.
 * @returns {String} id
 */
export default (function () {
  var radix = 16;
  var length = 8;
  return (Math.random() * Date.now()).toString(radix).slice(0, length);
});