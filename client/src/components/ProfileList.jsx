import React from 'react';
import ReactDOM from 'react-dom';

const ProfileList = ({profiles, currentProfile}) => {
  return !profiles.length ? <div> No profiles are stored! </div> :
  <div>
    <ul>
    {profiles.map((profile, i) => {
      if (profile !== currentProfile) {
        return (<li>{ profile.name } </li>);
      } else {
        return (<li className="selectedProfile">{ profile.name } </li>);
      }
    })}
    </ul>
  </div>
};

export default ProfileList;