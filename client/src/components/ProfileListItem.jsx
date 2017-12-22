import React from 'react';
import ReactDOM from 'react-dom';

class ProfileListItem extends React.Component {
  constructor (props) {
    super(props);
  }

  handleClick (e) {
    this.props.handleSelect(this.props.profile);
  }

  render () {
    return (
      <li>
        <a className={this.props.selected ? 'selected' : ''} onClick={this.handleClick.bind(this)}>
          {this.props.profile.email}
        </a>
      </li>
    );
  }
}

export default ProfileListItem;