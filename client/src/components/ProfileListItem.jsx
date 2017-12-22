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
      <a>
        <li className={this.props.selected ? 'selected' : ''} onClick={this.handleClick.bind(this)}>
          {this.props.profile.email}
        </li>
      </a>
    );
  }
}

export default ProfileListItem;