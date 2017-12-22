import React from 'react';
import ReactDOM from 'react-dom';

const Profile = ({profile}) => (
  <div className="profile">
    This is the stringified selected profile! {JSON.stringify(profile)}
  </div>
);

export default Profile;