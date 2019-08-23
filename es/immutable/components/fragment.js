import _compose from 'recompose/compose';

import { connect } from 'react-redux';


import { FragmentComponent, withIdAndContext } from '../../components/fragment';
import propsToJS from './props-to-js';

var mapStateToProps = function mapStateToProps(state) {
  return {
    location: state.get('router')
  };
};

// $FlowFixMe
export default _compose(connect(mapStateToProps), withIdAndContext, propsToJS)(FragmentComponent);