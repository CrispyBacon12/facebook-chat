import React, { Component } from 'react';

export default class CommentsListItem extends Component {
  render() {
    const { comment } = this.props;

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