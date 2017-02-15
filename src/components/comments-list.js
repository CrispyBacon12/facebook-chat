import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CommentsList extends Component { 
  render() {
    return (
      <ul className="mt-4 mb-4 list-group">
        { this.props.comments.map(this.renderComment) }
      </ul>
    );
  }

  renderComment(comment) {
    return (
      <li className="list-group-item flex-column align-items-start" key={comment.id}>
        <div className="d-flex w-100 justify-content-between">
          <p className="mb-1 text-primary">{comment.from.name}</p>
          <small>{comment.created_time}</small>
        </div>
        <p className="mb-1">{comment.message}</p>
      </li>
    );
  }
}

function mapStateToProps({comments}) {
  return { comments };
}

export default connect(mapStateToProps)(CommentsList)
