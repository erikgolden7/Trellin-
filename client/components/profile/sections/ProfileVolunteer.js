import React, { Component } from 'react';
import ToolTip from 'react-portal-tooltip';
import SkyLight from 'react-skylight';
import { connect } from 'react-redux';
import {addVolunteer} from '../../../reducers/profileReducer';
import {deleteVolunteer} from '../../../reducers/profileReducer';
import axios from 'axios';
import moment from 'moment';

class ProfileVolunteer extends Component {
	constructor(props){
		super(props);

		this.state = {
			activeVolunteer1: false,
			activeVolunteer2: false,
			activeVolunteer3: false,
			activeVolunteer4: false,
			activeVolunteer5: false,
			activeVolunteer6: false,
			addVolu: {
				organization: '',
				role: '',
				cause: '',
				begdate: null,
				enddate: null,
				description: ''
			}
		};
		this.addNewVolunteer = this.addNewVolunteer.bind(this);
		this.saveOrganization = this.saveOrganization.bind(this);
		this.saveRole = this.saveRole.bind(this);
		this.saveCause = this.saveCause.bind(this);
		this.saveBeg = this.saveBeg.bind(this);
		this.saveEnd = this.saveEnd.bind(this);
		this.saveDescription = this.saveDescription.bind(this);
	}

	showVolunteer1() {this.setState({activeVolunteer1: true})}
	hideVolunteer1() {this.setState({activeVolunteer1: false})}

	showVolunteer2() {this.setState({activeVolunteer2: true})}
	hideVolunteer2() {this.setState({activeVolunteer2: false})}

	showVolunteer3() {this.setState({activeVolunteer3: true})}
	hideVolunteer3() {this.setState({activeVolunteer3: false})}

	showVolunteer4() {this.setState({activeVolunteer4: true})}
	hideVolunteer4() {this.setState({activeVolunteer4: false})}

	showVolunteer5() {this.setState({activeVolunteer5: true})}
	hideVolunteer5() {this.setState({activeVolunteer5: false})}

	showVolunteer6() {this.setState({activeVolunteer6: true})}
	hideVolunteer6() {this.setState({activeVolunteer6: false})}

	addNewVolunteer() {
		var volunteer = this.state.addVolu;
		volunteer.id = this.props.user.id;
		axios.post('/setVolunteer', volunteer).then(() => {
			this.props.addVolunteer(this.state.addVolu);
		});
	}

	saveOrganization(e) {
		this.setState({
			addVolu: {
				organization: e.target.value,
				role: this.state.addVolu.role,
				cause: this.state.addVolu.cause,
				begdate: this.state.addVolu.begdate,
				enddate: this.state.addVolu.enddate,
				description: this.state.addVolu.description
			}
		});
	}

	saveRole(e) {
		this.setState({
			addVolu: {
				organization: this.state.addVolu.organization,
				role: e.target.value,
				cause: this.state.addVolu.cause,
				begdate: this.state.addVolu.begdate,
				enddate: this.state.addVolu.enddate,
				description: this.state.addVolu.description
			}
		});
	}

	saveCause(e) {
		this.setState({
			addVolu: {
				organization: this.state.addVolu.organization,
				role: this.state.addVolu.role,
				cause: e.target.value,
				begdate: this.state.addVolu.begdate,
				enddate: this.state.addVolu.enddate,
				description: this.state.addVolu.description
			}
		});
	}

	saveBeg(e) {
		this.setState({
			addVolu: {
				organization: this.state.addVolu.organization,
				role: this.state.addVolu.role,
				cause: this.state.addVolu.cause,
				begdate: e.target.value,
				enddate: this.state.addVolu.enddate,
				description: this.state.addVolu.description
			}
		});
	}

	saveEnd(e) {
		this.setState({
			addVolu: {
				organization: this.state.addVolu.organization,
				role: this.state.addVolu.role,
				cause: this.state.addVolu.cause,
				begdate: this.state.addVolu.begdate,
				enddate: e.target.value,
				description: this.state.addVolu.description
			}
		});
	}

	saveDescription(e) {
		this.setState({
			addVolu: {
				organization: this.state.addVolu.organization,
				role: this.state.addVolu.role,
				cause: this.state.addVolu.cause,
				begdate: this.state.addVolu.begdate,
				enddate: this.state.addVolu.enddate,
				description: e.target.value
			}
		});
	}

	deleteVolunteer() {
		axios.delete('/delete/volunteer/' + this.props.user.id).then((res) => {
			this.props.deleteVolunteer();
		});
	}

	render() {

		const style = {
			width: '50%',
			height: 'auto',
			marginTop: '-300px',
			marginLeft: '-25%',
			paddingBottom: '70px',
			padding: '30px',
		};
		var volunteerArray = [];
		if (this.props.conn.showConn) {
			if (this.props.conn.volunteerArray) {
				volunteerArray = this.props.conn.volunteerArray;
			} else {
				volunteerArray = this.props.volunteerArray;
			}
		} else {
			volunteerArray = this.props.volunteerArray;
		}
		var volunteers = volunteerArray.map((volu, i) => {
			return (
				<div key={i} className="awards-div">
					{volu.organization ? (
						<div>{volu.organization}</div>
					) : (
						<div>
							{this.props.conn.showConn ? null : (
								<div className="add-text-blue">Add Organization
									<div onMouseEnter={this.showVolunteer1.bind(this)} onMouseLeave={this.hideVolunteer1.bind(this)} id="Volunteer1" className="question-icon"></div>
									<ToolTip active={this.state.activeVolunteer1} position="right" arrow="center" parent="#Volunteer1">
										<div className="popup-pad">
											<div className="sm-text">Organization</div>
											<div className="profile-text">Text here...</div>
										</div>
									</ToolTip>
								</div>
							)}
						</div>
					)}
					{volu.role ? (
						<div>{volu.role}</div>
					) : (
						<div>
							{this.props.conn.showConn ? null : (
								<div className="add-text-blue">Add Role
									<div onMouseEnter={this.showVolunteer2.bind(this)} onMouseLeave={this.hideVolunteer2.bind(this)} id="Volunteer2" className="question-icon"></div>
									<ToolTip active={this.state.activeVolunteer2} position="right" arrow="center" parent="#Volunteer2">
										<div className="popup-pad">
											<div className="sm-text">Role</div>
											<div className="profile-text">Text here...</div>
										</div>
									</ToolTip>
								</div>
							)}
						</div>
					)}
					{volu.cause ? (
						<div>{volu.cause}</div>
					) : (
						<div>
							{this.props.conn.showConn ? null : (
								<div className="add-text-blue">Add Cause
									<div onMouseEnter={this.showVolunteer4.bind(this)} onMouseLeave={this.hideVolunteer4.bind(this)} id="Volunteer4" className="question-icon"></div>
									<ToolTip active={this.state.activeVolunteer4} position="right" arrow="center" parent="#Volunteer4">
										<div className="popup-pad">
											<div className="sm-text">Cause</div>
											<div className="profile-text">Text here...</div>
										</div>
									</ToolTip>
								</div>
							)}
						</div>
					)}
					{volu.begdate ? (
						<div>{moment(volu.begdate).format('LL')}</div>
					) : (
						<div>
							{this.props.conn.showConn ? null : (
								<div className="add-text-blue">Add Start Date
									<div onMouseEnter={this.showVolunteer3.bind(this)} onMouseLeave={this.hideVolunteer3.bind(this)} id="Volunteer3" className="question-icon"></div>
									<ToolTip active={this.state.activeVolunteer3} position="right" arrow="center" parent="#Volunteer3">
										<div className="popup-pad">
											<div className="sm-text">Date</div>
											<div className="profile-text">Text here...</div>
										</div>
									</ToolTip>
								</div>
							)}
						</div>
					)}
					{volu.enddate ? (
						<div>{moment(volu.enddate).format('LL')}</div>
					) : (
						<div>
							{this.props.conn.showConn ? null : (
								<div className="add-text-blue">Add End Date
									<div onMouseEnter={this.showVolunteer6.bind(this)} onMouseLeave={this.hideVolunteer6.bind(this)} id="Volunteer6" className="question-icon"></div>
									<ToolTip active={this.state.activeVolunteer6} position="right" arrow="center" parent="#Volunteer6">
										<div className="popup-pad">
											<div className="sm-text">Date</div>
											<div className="profile-text">Text here...</div>
										</div>
									</ToolTip>
								</div>
							)}
						</div>
					)}
					{volu.description ? (
						<div>{volu.description}</div>
					) : (
						<div>
							{this.props.conn.showConn ? null : (
								<div className="add-text-blue">Add Description
									<div onMouseEnter={this.showVolunteer5.bind(this)} onMouseLeave={this.hideVolunteer5.bind(this)} id="Volunteer5" className="question-icon"></div>
									<ToolTip active={this.state.activeVolunteer5} position="right" arrow="center" parent="#Volunteer5">
										<div className="popup-pad">
											<div className="sm-text">Description</div>
											<div className="profile-text">Text here...</div>
										</div>
									</ToolTip>
								</div>
							)}
						</div>
					)}
				</div>
			)
		});
		return (
			<div className="education-box">
				<div className="title-text-gray">Volunteering Experience
					{this.props.conn.showConn ? null : (
						<div className="trash" onClick={this.deleteVolunteer.bind(this)}></div>
					)}
				</div>
				<div className="box-info">
					{volunteers}
				</div>
				{this.props.conn.showConn ? null : (
					<div className="bottom-add">
						<div className="bottom-add-text" onClick={() => this.refs.volunteer.show()}>Add volunteer
						</div>
					</div>
				)}
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
  addVolunteer: addVolunteer,
	deleteVolunteer: deleteVolunteer
};

function mapStateToProps(state) {
	return {
		volunteerArray: state.profile.volunteerArray,
		user: state.user,
		conn: state.connProfile
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileVolunteer);
