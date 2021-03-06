import React, { Component } from 'react';
import { connect } from 'react-redux';
import {saveId} from './reducers/userReducer';
import {allMessages} from './reducers/timelineReducer';
import {addInfo} from './reducers/profileReducer';
import {sendAllUsers} from './reducers/connectionsReducer';
import axios from 'axios';
import Nav from './components/nav/Nav.js';
import './reset.scss';
import './main.scss';

 class App extends Component {

  constructor(props) {
    super(props);
    if(!this.props.user.id) {
      axios.get('/auth/me').then( res => {
        axios.post('/getConnections', {id: res.data.id}).then((conns) => {
          res.data.connections = conns.data;
	        axios.post('/getAllUsers', {id: res.data.id}).then((allUsers) => {
            this.props.sendAllUsers(allUsers.data, conns.data, res.data.id);
            axios.get('/getMessages').then((mess) => {
	            this.props.saveId(res.data);
	            this.props.allMessages(mess.data, conns.data, res.data.id);
            })
          });
          axios.post('/getUserInformation', {id: res.data.id}).then(res => {
            this.props.addInfo(res.data);
          });
        })
      }).catch( err => {
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
};

const mapDispatchToActions = {
  saveId: saveId,
  allMessages: allMessages,
  addInfo: addInfo,
  sendAllUsers: sendAllUsers
};

export default connect(mapStateToProps, mapDispatchToActions)(App)
