import React, {Component} from 'react';
import ProfileHeader from './sections/ProfileHeader';
import ProfileExperience from './sections/ProfileExperience';
import ProfileCertifications from './sections/ProfileCertifications';
import ProfileEducation from './sections/ProfileEducation';
import ProfileSkills from './sections/ProfileSkills';
import ProfileFollowing from './sections/ProfileFollowing';
import ProfileSidebar from './sections/ProfileSidebar';
import ProfileAddSection from './sections/ProfileAddSection';
import {addInfo} from '../../reducers/profileReducer';
import axios from 'axios';
import { connect } from 'react-redux';
import "./profileStyles.scss";

class Profile extends Component {

  componentDidMount() {
    axios.post('/getUserInformation', {id: 1}).then(res => {
      this.props.addInfo(res.data);
    });
  }

  render() {
    return (
      <div className="profile-background">
        <div className="container">
          <div className="profile-col-left">
            <ProfileHeader />
            <div><span className="sm-text-gray">Add a section to your profile - </span><span className="smlr-text-gray">be discovered for your next career step.</span></div>
            <ProfileAddSection/>
            <div className="section-view-more">
              <div className="bottom-add">
                <div className="bottom-add-text">View More  ▽</div>
              </div>
            </div>
            <ProfileExperience />
            <ProfileCertifications/>
            <ProfileEducation/>
            <ProfileSkills/>
            <ProfileFollowing/>
          </div>
          <div className="profile-col-right">
            <ProfileSidebar />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addInfo: addInfo
}

function mapStateToProps(state) {
  return {
    languageShow: state.profile.languageShow
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
