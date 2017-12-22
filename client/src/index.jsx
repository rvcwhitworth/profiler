import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Profile from './components/Profile.jsx';
import ProfileList from './components/ProfileList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      profiles: [],
      currentProfile: null
		}
		this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount () {
    this.getProfiles();
  }

  handleSearch (email) {
		$.post({
			url: '/profiles',
			contentType: 'text/plain',
			data: email
		})
		.then((response) => {
			console.log(response);
		})
  }

  getProfiles () {
    $.get('/profiles')
    .done((profiles) => {
        this.setState({
            profiles: profiles,
            currentProfile: profiles[0]
        })
    })
  }

  render () {
    return (<div>
      <h1>Profiler</h1>
      <Search handleSearch={this.handleSearch} />
      <ProfileList profiles={this.state.profiles} currentProfile={this.state.currentProfile} />
      <Profile profile={this.state.currentProfile} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));