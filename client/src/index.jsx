import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Profile from './components/Profile.jsx';
import ProfileList from './components/ProfileList.jsx';
import defaultData from '../../data.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      profiles: defaultData,
      currentProfile: defaultData[0]
		}
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount () {
    this.getProfiles();
  }

  handleSelect (profile) {
    this.setState({
      currentProfile: profile
    });
  }

  handleSearch (email, cb) {
		$.post({
			url: '/profiles',
			contentType: 'text/plain',
			data: email
		})
		.done((response) => {
      cb();
      this.getProfiles();
		})
  }

  getProfiles () {
    $.get('/profiles')
    .done((profiles) => {
      console.log(profiles);
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
      <h1>Profiler</h1>
      <Search handleSearch={this.handleSearch} />
      <div className="row">
        <ProfileList 
          profiles={this.state.profiles} 
          currentProfile={this.state.currentProfile} 
          handleSelect={this.handleSelect}
        />
        <Profile profile={this.state.currentProfile} />
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));