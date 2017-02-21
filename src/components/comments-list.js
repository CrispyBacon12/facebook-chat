import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { approveComment } from '../actions';

import CommentsListItem from './comments-list-item';

class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.onCommentClick = this.onCommentClick.bind(this);
    this.facebook = props.facebook;
  }

  render() {
    return (
      <ul className="mt-4 mb-4 list-group">
        { this.props.comments.map(comment => <CommentsListItem key={comment.id} comment={comment} approvedComments={this.props.approvedComments} onClick={this.onCommentClick} />) }
      </ul>
    );
  }

  onCommentClick(comment) {
    this.facebook.broadcastApproveComment(comment);
    this.props.approveComment(comment);
  }
}

function mapStateToProps({comments, approvedComments}) {
  return { comments, approvedComments };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({approveComment}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)
