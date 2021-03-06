import React, { Component } from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';


class ProfileSidebar extends Component {
	constructor(props){
	super(props);
		this.fillMeter=this.fillMeter.bind(this)
	}


	// Beginner 0-25
	// Intermediate 25-50
	// Expert 50=75
	// All Star 75-100

	fillMeter(percent) {
	let pixels = (percent / 100) * 90;
	$(".fill").css('top', (82 - pixels) + "px");
	$(".level").css('top', (67 - pixels) + "px");
	$(".fill").css('height', pixels + "px");

	if (percent <= 0) {
		$(".level").css("top", "67px");
		$(".level").text("Noob");
	} else if (percent <= 25) {
		$(".fill").css('background', "#FF6D3E");
		$(".level").text("Noob");
	} else if (percent <= 50) {
		$(".fill").css('background', "#F2C548");
		$(".level").text("Intermediate");
	} else if (percent <= 75) {
		$(".fill").css('background', "#2F9CE1");
		$(".level").text("Expert");
	} else if (percent <= 100) {
		$(".level").text("All Star");
		$(".fill").css('background', "#287EB6");
	} else if (percent <= 99) {
		$(".level").css("top", "0");
	}
}


	render () {
		$(document).ready(() => {
			const percent = this.props.profileStrength/41 * 100;
			this.fillMeter(percent);
		});

		return (

			<div>
				<div id="test" className="sidebar-box">
					{this.props.conn.showConn ? (null) : (
						<div>
							<h5 className="prof-strength-title">Profile Strength</h5>
							<div className="profile-strength">
								<div className="profile-strength-wrap">
									<div className="mask">
										<div className="fill"></div>
									</div>
									<span className="level"/>
								</div>
							</div><hr/>
						</div>
					)}
					<div className="advertisement"></div>
					<hr/>
					<span className="sm-text">Who's Viewed Your Profile</span>
				</div>
				<div className="course-box">
					<div><span className="sm-text">Add new skills with these courses</span></div>
					<hr/>
					<hr/>
					<hr/>
				</div>
			</div>

		)
	}
}


function mapStateToProps(state) {
	return {
		profileStrength: state.profile.profileStrength,
		conn: state.connProfile
	}
}

export default connect(mapStateToProps)(ProfileSidebar);
