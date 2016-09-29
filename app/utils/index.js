import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/';

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
