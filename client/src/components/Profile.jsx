import React from 'react';
import ReactDOM from 'react-dom';

const Profile = ({profile}) => (
  <div className="profile">
    <h3>{ profile.info.contactInfo ? profile.info.contactInfo.fullName : profile.email }</h3>
    { profile.info.photos ? profile.info.photos.map((photo, i) => (
      <img key={i} className="profileImage" src={photo.url} />
    )) : <img className="profileImage" src="./images/anon.png" />
  }
    <div className="platforms">
    { console.log(profile)}
      { profile.info.socialProfiles ? 
         profile.info.socialProfiles.map((prof, i) => (
           <span key={i}><a href={prof.url}>{ prof.typeName }</a></span>
         )) : ''
      }
    </div>
  </div>
);

export default Profile;