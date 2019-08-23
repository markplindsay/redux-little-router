var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import qs from 'query-string';


export default (function (oldQuery, newQuery) {
  var mergedQuery = _extends({}, oldQuery, newQuery);
  var search = '?' + qs.stringify(mergedQuery);

  return {
    query: mergedQuery,
    search: search
  };
});