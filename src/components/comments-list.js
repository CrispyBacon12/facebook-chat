import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CommentsListItem from './comments-list-item';

class CommentsList extends Component {
  render() {
    return (
      <ul className="mt-4 mb-4 list-group">
        { this.props.comments.map(comment => <CommentsListItem comment={comment} />) }
      </ul>
    );
  }
}

function mapStateToProps({comments}) {
  return { comments };
}

export default connect(mapStateToProps)(CommentsList)
