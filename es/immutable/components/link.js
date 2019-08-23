import { connect } from 'react-redux';

import { LinkComponent, PersistentQueryLinkComponent, mapDispatchToProps } from '../../components/link';
import propsToJS from './props-to-js';

var mapStateToProps = function mapStateToProps(state) {
  return { location: state.get('router') };
};

var withLocation = connect(mapStateToProps, mapDispatchToProps);

var LinkWithLocation = withLocation(propsToJS(LinkComponent));
var PersistentQueryLinkWithLocation = withLocation(propsToJS(PersistentQueryLinkComponent));

export { LinkWithLocation as ImmutableLink, PersistentQueryLinkWithLocation as ImmutablePersistentQueryLink };