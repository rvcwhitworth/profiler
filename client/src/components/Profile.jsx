import React from 'react';

const Profile = ({profile, handleClick}) => {
  const clickHandler = (e) => handleClick(profile);

  return (
    <div className="profile">
      <div className="profileHeader">
        <h2>{ profile.info.contactInfo ? profile.info.contactInfo.fullName : profile.email }</h2>
        <button className="deleteProfile" onClick={clickHandler}>Delete</button>
      </div>
      { profile.info.photos ? profile.info.photos.map((photo, i) => (
        <img key={i} className="profileImage" src={photo.url} />
      )) : <img className="profileImage" src="./images/anon.png" />
    }
      <div className="platforms">
      { console.log(profile)}
        { profile.info.socialProfiles ? 
          profile.info.socialProfiles.map((prof, i) => (
            <span key={i}><a href={prof.url} target="_blank"><img className="subImage" src={`images/${prof.type}.png`}/></a></span>
          )) : ''
        }
      </div>
      <div className="profileInfo">
        <h3>Demographic Info</h3>
          {profile.info.demographics && profile.info.demographics.locatoinGeneral ? 
          <p>Location: {profile.info.demographics.locationGeneral}</p> : 
          <em>No location data found</em>}

          {profile.info.demographics && profile.info.demographics.gender ?
          <p>Gender: {profile.info.demographics.gender}</p> :
          <em>No gender data found</em>}

        <h3>Organization Info</h3>
            {profile.info.organizations ? (
              <ul>
              {profile.info.organizations.map((org, i) => {
                return <li key={i}>{org.name}: {org.title}</li>
              })}
              </ul>
            ) : <em>No organization data found</em>}
      </div>
    </div>
  )
};

export default Profile;