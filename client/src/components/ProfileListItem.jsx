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
      <a className="profileListItem">
        <li className={this.props.selected ? 'selected' : ''} onClick={this.handleClick.bind(this)}>
          <img 
            className="profileListImage" 
            src={this.props.profile.info.photos ? this.props.profile.info.photos[0].url : './images/anon.png'}
          />
          { this.props.profile.info.contactInfo ? this.props.profile.info.contactInfo.fullName : this.props.profile.email }
        </li>
      </a>
    );
  }
}

export default ProfileListItem;