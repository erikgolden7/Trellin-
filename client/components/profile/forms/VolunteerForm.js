import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import {addVolunteer} from '../../../reducers/profileReducer';
import { connect } from 'react-redux';
import axios from 'axios';

class VolunteerForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			organization: '',
			role: '',
			cause: '',
			begdate: null,
			enddate: null,
			description: ''
		}
		this.addNewVolunteer = this.addNewVolunteer.bind(this);
		this.saveOrganization = this.saveOrganization.bind(this);
		this.saveRole = this.saveRole.bind(this);
		this.saveCause = this.saveCause.bind(this);
		this.saveBeg = this.saveBeg.bind(this);
		this.saveEnd = this.saveEnd.bind(this);
		this.saveDescription = this.saveDescription.bind(this);
	}

	addNewVolunteer() {
		var volunteer = this.state;
		volunteer.id = this.props.user.id;
		axios.post('/setVolunteer', volunteer).then(() => {
			this.props.addVolunteer(this.state);
		});
	}

	saveOrganization(e) {
		this.setState({ organization: e.target.value });
	}

	saveRole(e) {
		this.setState({ role: e.target.value });
	}

	saveCause(e) {
		this.setState({ cause: e.target.value });
	}

	saveBeg(e) {
		this.setState({ begdate: e.target.value });
	}

	saveEnd(e) {
		this.setState({ enddate: e.target.value });
	}

	saveDescription(e) {
		this.setState({ description: e.target.value });
	}

	render() {

		// Style formatting of form popup container
		const style = {
			width: '50%',
			height: 'auto',
			marginTop: '-300px',
			marginLeft: '-25%',
			paddingBottom: '70px',
			padding: '30px',
		};

		return (

		<div className="add-section">
			{/*Volunteering Experience Section*/}
			<div className="icon-box">
				<div className="icon8"></div>
			</div>
			<div className="mini-info-box">

				{/*Volunteering Experience popup form*/}
				<div className="section-title-text">Volunteering Experience</div>
				<div className="gray-text">1 in 5 managers hired someone because of their volunteer experiences.</div>
			</div>
			<div className="section-info"></div>
			<button className="bottom-add" onClick={() => this.refs.volunteer.show()}><div className="bottom-add-text-section">Add volunteering experience</div></button>
			<SkyLight dialogStyles={style} hideOnOverlayClicked ref="volunteer" title="Add Volunteering Experience">
				<div className="form-title">Organization</div>
				<input className="form-input" type="text" onChange={this.saveOrganization}/>
				<div className="form-title">Role</div>
				<input className="form-input" type="text" onChange={this.saveRole}/>
				<div className="form-title">Cause</div>
				<input className="form-input" type="text" onChange={this.saveCause}/>
				<div className="form-title">Date</div>
				<div className="form-title">From Year</div>
				<input className="form-input" type="date" id="myMonth" onChange={this.saveBeg}/>
				<div className="form-title">To Year (or expected)</div>
				<input className="form-input" type="date" id="myMonth" onChange={this.saveEnd}/>
				<div>
					<label className="switch">
						<input className="form-input" type="checkbox" />
						<div className="slider round"></div>
					</label>
					I currently volunteer here
				</div>
				<div className="form-title">Description</div>
				<div>
					<textarea rows="6" cols="127" onChange={this.saveDescription}/>
				</div>
				<div className="form-btn">
					<button className="button-dark-blue" onClick={(event) => { this.addNewVolunteer(); this.refs.volunteer.hide()}}>Save</button>
				</div>
			</SkyLight>
		</div>

		)
	}
}

const mapDispatchToProps = {
  addVolunteer: addVolunteer
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerForm);
