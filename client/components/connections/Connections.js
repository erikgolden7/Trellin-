import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {setConnections} from '../../reducers/connectionsReducer';
import axios from 'axios';
import './connections.scss';
// import ConnectionCard from './ConnectionCard';

class Connections extends Component {
	constructor(props){
	  super(props);
	  
  this.renderAllCard = this.renderAllCard.bind(this);
  this.renderCard = this.renderCard.bind(this);
  }
	
  
  
	renderAllCard() {
    if (this.props.user) {
      var cards = this.props.allConnections.map((conn, i) => {
        let name = conn.first + " " + conn.last;
        return (<div key={i} className="connection-item">
          <div className="conn section-shadow">
            <img className="connection-img" src={conn.picture} />
            <div className="conn-info">
              <div className="connection-name">{name}</div>
              <div className="connection-text">{conn.headline}</div>
            </div>
            <Link to="/profile"><button className="button-connect">View Profile</button></Link>
          </div>
        </div>)
      });
      return cards;
    }
  }
	
	renderCard() {
		if (this.props.user) {
			var card = this.props.connections.map((conn, i) => {
				let name = conn.first + " " + conn.last;
				return (<div key={i} className="connection-item">
          <div className="conn section-shadow">
            <img className="connection-img" src={conn.picture}/>
            <div className="conn-info">
              <div className="connection-name">{name}</div>
              <div className="connection-text">{conn.headline}</div>
            </div>
            <Link to="/profile">
              <button className="button-connect">View Profile</button>
            </Link>
          </div>
        </div>)
			});
			return card;
		}
	}

  render() {
    return (
      <div className="connection-bg">
        <div className="connection-top-box">
          <div className="connection-header">Suggested Connections</div>
	          <div className="connection-wrapper">{this.renderAllCard()}</div>
        </div>
        <div className="connection-bottom-box">
          <div className="connection-header">My Connections</div>
          <div className="connection-wrapper">{this.renderCard()}</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setConnections: setConnections
};

function mapStateToProps(state) {
  return {
    connections: state.user.connections,
    allConnections: state.user.allConnections,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
