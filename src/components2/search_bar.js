import React, { Component } from 'react';
import _ from 'lodash';

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: 'Starting value' };
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.debounceSearch = _.debounce((term) => this.props.onSearchTermChange(term), 300);
  }

  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.onSearchSubmit}>
          <input 
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value )} />
          
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.debounceSearch(this.state.term);
  }

  onInputChange(term) {
    this.setState({term});
    this.debounceSearch(term);
  }

}
