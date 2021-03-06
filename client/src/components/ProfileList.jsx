import React from 'react';
import ProfileListItem from './ProfileListItem.jsx';

const ProfileList = ({profiles, currentProfile, handleSelect}) => {
  return !profiles.length ? <div className="profileList"> No profiles are stored! </div> :
  <div className="profileList">
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