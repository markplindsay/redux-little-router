'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose2 = require('recompose/compose');

var _compose3 = _interopRequireDefault(_compose2);

var _reactRedux = require('react-redux');

var _fragment = require('../../components/fragment');

var _propsToJs = require('./props-to-js');

var _propsToJs2 = _interopRequireDefault(_propsToJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    location: state.get('router')
  };
};

// $FlowFixMe

exports.default = (0, _compose3.default)((0, _reactRedux.connect)(mapStateToProps), _fragment.withIdAndContext, _propsToJs2.default)(_fragment.FragmentComponent);