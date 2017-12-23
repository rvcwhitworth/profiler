import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Profile from './components/Profile.jsx';
import ProfileList from './components/ProfileList.jsx';
import defaultData from '../../data.json';
import Preview from './components/Preview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      profiles: defaultData,
      currentProfile: defaultData[0],
      previewUrl: null
		}
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    
  }

  componentDidMount () {
    this.getProfiles();
  }

  handleSelect (profile) {
    this.setState({
      currentProfile: profile
    });
  }

  handleDelete (profile) {
    $.ajax({
      method: 'DELETE',
			url: '/profiles',
			contentType: 'text/plain',
			data: profile.email
		})
		.done((response) => {
      this.getProfiles();
		});
  }

  handleSearch (email, cb) {
		$.post({
			url: '/profiles',
			contentType: 'text/plain',
			data: email
		})
		.done((response) => {
      this.getProfiles();
		}).catch((error) => {
      window.alert('No information found for this email!');
    })
  }

  getProfiles () {
    $.get('/profiles')
    .done((profiles) => {
      if (profiles.length) {
        this.setState({
            profiles: profiles,
            currentProfile: profiles[0]
        })
      }
    })
  }

  render () {
    return (<div>
        <div className="sidebar">
          <h1>Profiler</h1>
          <Search handleSearch={this.handleSearch} />
          <ProfileList 
            profiles={this.state.profiles} 
            currentProfile={this.state.currentProfile} 
            handleSelect={this.handleSelect}
          />
        </div>
      <Profile profile={this.state.currentProfile} handleClick={this.handleDelete} />
       { /** <Preview profile={this.state.previewUrl} /> **/ }
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));