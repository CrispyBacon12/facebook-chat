import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addComments } from '../actions';

class ConnectBar extends Component {
  constructor(props) {
    super(props);

    this.state = {videoId: ''};
    this.facebook = this.props.facebook;

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onSubmit}>
        <input className="form-control mr-2" type="text" value={this.state.videoId} onChange={this.onInputChange}/>
        <button type="submit" className="btn btn-primary">Connect!</button>
      </form>
    );
  }

  onInputChange(event) {
    this.setState({videoId: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    
    const connection = this.facebook.connectToStream(this.state.videoId, (comments) => {
      this.props.addComments(comments);
    });
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addComments}, dispatch);
}

export default connect(null, mapDispatchToProps)(ConnectBar)
