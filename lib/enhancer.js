'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeToStoreAndHistory = exports.createHistoryListener = exports.createStoreSubscriber = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _types = require('./types');

var _actions = require('./actions');

var _matchCache = require('./util/match-cache');

var _matchCache2 = _interopRequireDefault(_matchCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStoreSubscriber = exports.createStoreSubscriber = function createStoreSubscriber(getState, dispatch, createMatcher) {
  return function (currentMatcher) {
    var _getState = getState(),
        routes = _getState.routes,
        pathname = _getState.pathname,
        search = _getState.search,
        hash = _getState.hash,
        updateRoutes = _getState.updateRoutes;

    if (updateRoutes) {
      currentMatcher = createMatcher(routes);
      dispatch((0, _actions.didReplaceRoutes)());
      dispatch((0, _actions.replace)({ pathname: pathname, search: search, hash: hash }));
    }

    return currentMatcher;
  };
};

var createHistoryListener = exports.createHistoryListener = function createHistoryListener(dispatch) {
  return function (currentMatcher, location, action) {
    _matchCache2.default.clear();

    var match = currentMatcher(location.pathname);
    var payload = _extends({}, location, match, {
      query: _queryString2.default.parse(location.search || '')
    });

    // Other actions come from the user, so they already have a
    // corresponding queued navigation action.
    if (action === 'POP') {
      dispatch({
        type: _types.POP,
        payload: payload
      });
    }

    dispatch((0, _actions.locationDidChange)(payload));
  };
};

var subscribeToStoreAndHistory = exports.subscribeToStoreAndHistory = function subscribeToStoreAndHistory(_ref) {
  var getState = _ref.getState,
      dispatch = _ref.dispatch,
      createMatcher = _ref.createMatcher,
      matchRoute = _ref.matchRoute,
      subscribeToStore = _ref.subscribeToStore,
      subscribeToHistory = _ref.subscribeToHistory;

  var storeSubscriber = createStoreSubscriber(getState, dispatch, createMatcher);
  var historyListener = createHistoryListener(dispatch);

  var currentMatcher = matchRoute;

  // Replace the matcher when replacing routes
  subscribeToStore(function () {
    currentMatcher = storeSubscriber(currentMatcher);
  });

  subscribeToHistory(function (location, action) {
    return historyListener(currentMatcher, location, action);
  });
};

exports.default = function (_ref2) {
  var history = _ref2.history,
      matchRoute = _ref2.matchRoute,
      createMatcher = _ref2.createMatcher;
  return function (createStore) {
    return function (userReducer, initialState, enhancer) {
      var store = createStore(userReducer, initialState, enhancer);
      var dispatch = store.dispatch,
          subscribeToStore = store.subscribe;
      var subscribeToHistory = history.listen;


      var getState = function getState() {
        var routerState = store.getState().router;
        var _routerState$options = routerState.options;
        _routerState$options = _routerState$options === undefined ? {} : _routerState$options;
        var updateRoutes = _routerState$options.updateRoutes;

        return _extends({}, routerState, { updateRoutes: updateRoutes });
      };

      subscribeToStoreAndHistory({
        getState: getState,
        dispatch: dispatch,
        createMatcher: createMatcher,
        matchRoute: matchRoute,
        subscribeToStore: subscribeToStore,
        subscribeToHistory: subscribeToHistory
      });

      return _extends({}, store, {
        matchRoute: matchRoute
      });
    };
  };
};