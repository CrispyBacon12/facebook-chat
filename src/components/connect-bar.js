import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connectToStream } from '../actions';

class ConnectBar extends Component {
  constructor(props) {
    super(props);

    this.state = {videoId: '1415411995149859'};

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

    this.props.connectToStream(this.state.videoId);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({connectToStream}, dispatch);
}

export default connect(null, mapDispatchToProps)(ConnectBar)