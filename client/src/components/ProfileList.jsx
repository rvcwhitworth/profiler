import React from 'react';
import ReactDOM from 'react-dom';
import ProfileListItem from './ProfileListItem.jsx';

const ProfileList = ({profiles, currentProfile, handleSelect}) => {
  return !profiles.length ? <div> No profiles are stored! </div> :
  <div>
    <ul>
    {profiles.map((profile, i) => (
        <ProfileListItem 
          key={i} 
          handleSelect={ handleSelect } 
          profile={ profile } 
          selected={ currentProfile === profile } 
        />
    ))}
    </ul>
  </div>
};

export default ProfileList;