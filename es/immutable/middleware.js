import { isNavigationAction } from '../types';
import { handleNavigationAction } from '../middleware';

export default (function (_ref) {
  var history = _ref.history;
  return function (_ref2) {
    var getState = _ref2.getState;
    return function (next) {
      return function (action) {
        var query = getState().getIn(['router', 'query']);
        return isNavigationAction(action) ? handleNavigationAction({
          next: next,
          action: action,
          history: history,
          query: query && query.toJS()
        }) : next(action);
      };
    };
  };
});