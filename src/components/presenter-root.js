import React, {Component} from 'react';
import facebookConnector from '../services/facebook';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { approveComment } from '../actions';

import CommentsListItem from './comments-list-item';

class PresenterRoot extends Component {
  constructor(props) {
    super(props);

    this.facebook = facebookConnector();
    this.facebook.subscribeApprovals(comment => {
      this.props.approveComment(comment);
    });
  }

  render() {
    return (
      <ul className="mt-4 mb-4 list-group">
        { this.props.approvedComments.map(comment => <CommentsListItem key={comment.id} comment={comment} onClick={() => {}} />) }
      </ul>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({approveComment}, dispatch);
}

function mapStateToProps({ approvedComments }) {
  console.log("approved comments", approvedComments);
  return { approvedComments };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresenterRoot)