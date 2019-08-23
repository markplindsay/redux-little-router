'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmutablePersistentQueryLink = exports.ImmutableLink = undefined;

var _reactRedux = require('react-redux');

var _link = require('../../components/link');

var _propsToJs = require('./props-to-js');

var _propsToJs2 = _interopRequireDefault(_propsToJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return { location: state.get('router') };
};


var withLocation = (0, _reactRedux.connect)(mapStateToProps, _link.mapDispatchToProps);

var LinkWithLocation = withLocation((0, _propsToJs2.default)(_link.LinkComponent));
var PersistentQueryLinkWithLocation = withLocation((0, _propsToJs2.default)(_link.PersistentQueryLinkComponent));

exports.ImmutableLink = LinkWithLocation;
exports.ImmutablePersistentQueryLink = PersistentQueryLinkWithLocation;