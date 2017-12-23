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
    this.handlePreviewSelect = this.handlePreviewSelect.bind(this);
    
  }

  componentDidMount () {
    this.getProfiles();
  }

  handleSelect (profile) {
    this.setState({
      currentProfile: profile
    });
  }

  handlePreviewSelect (e) {
    e.preventDefault();

    $.post({
			url: '/preview',
			contentType: 'text/plain',
			data: e.target.href
		})
    .then((htmlContent) => {
      console.log('received reply for preview', htmlContent);
      $('.preview').html(htmlContent);
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
      <div className="row">
        <h1>Profiler</h1>
        <div className="sidebar">
          <Search handleSearch={this.handleSearch} />
          <ProfileList 
            profiles={this.state.profiles} 
            currentProfile={this.state.currentProfile} 
            handleSelect={this.handleSelect}
          />
        </div>
        <Profile profile={this.state.currentProfile} handleClick={this.handlePreviewSelect} />
        <Preview profile={this.state.previewUrl} />
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));