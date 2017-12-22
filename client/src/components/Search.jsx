import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
	constructor (props) {
    super(props);
    this.state = {
      email: ''
    };

  }

  onChange (e) {
    this.setState({
      email: e.target.value
    });
  }

  handleSubmit () {
    this.props.handleSearch(this.state.email);
  }

  handleKey (e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render () {
    return (
      <div>
        Enter email: 
        <input 
        type="email" 
        value={this.state.email} 
        onChange={this.onChange.bind(this)} 
        onKeyPress={this.handleKey.bind(this)} 
        required />
        <button onClick={this.handleSubmit.bind(this)}>Search</button>
      </div>
    )
  }
}

export default Search;