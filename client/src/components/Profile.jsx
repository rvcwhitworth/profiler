import React from 'react';

const Profile = ({profile, handleClick}) => (
  <div className="profile">
    <h3>{ profile.info.contactInfo ? profile.info.contactInfo.fullName : profile.email }</h3>
    { profile.info.photos ? profile.info.photos.map((photo, i) => (
      <img key={i} className="profileImage" src={photo.url} />
    )) : <img className="profileImage" src="./images/anon.png" />
  }
    <div className="platforms">
    { console.log(profile)}
      <ul>
      { profile.info.socialProfiles ? 
         profile.info.socialProfiles.map((prof, i) => (
           <li key={i}><a onClick={handleClick} href={prof.url}>{ prof.typeName }</a></li>
         )) : ''
      }
      </ul>
    </div>
  </div>
);

export default Profile;