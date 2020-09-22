import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  loadActivities,
  saveActivity,
} from "../../store/actions/activityActions";
import { connect } from "react-redux";
import { UserActivityList } from "../../cmps/user/UserActivityList";
import { UserSchedule } from "../../cmps/user/UserSchedule";
import { userService } from "../../services/userService.js";
import { activityService } from "../../services/activityService.js";
import { updateUser } from "../../store/actions/userActions.js";

export class _UserDetails extends Component {
  state = {
    currUser: null,
    createdAct: {},
    participant: {},
  };

  componentDidMount() {
    const currUser = this.props.user
      ? this.props.user
      : userService.guestMode();
    this.setState({ currUser }, () =>
      this.props.loadActivities(this.state.currUser._id)
    );
  }

  onRemove = (_id) => {
    this.props.removeActivity(_id);
  };
  onRemoveFromList = (activity, user) => {
    // delete from the user list by canceling participant inside the activity object
    let idx = activityService.findIdxById(activity.participants, user._id);
    activity.participants.splice(idx, 1);

    // update activity
    this.props.saveActivity(activity);

    // update the orgenizer income
    userService.getById(activity.createdBy._id).then((user) => {
      user.income -= activity.price;
      this.props.updateUser(user);
    });
  };

  onUploadCreatedEvents = (activities, currUser) => {
    let act = activityService.uploadCreatedEvents(activities, currUser);
    return act;
  };

  onUploadPartOfEvents = (activities, currUser) => {
    return activityService.uploadPartOfEvents(activities, currUser);
  };

  render() {
    let { activities } = this.props;

    if (!Object.keys(activities).length) activities = null;
    const { currUser } = this.state;
    if (!currUser) return <div>loading..</div>;
    let eventsCreatedByUser = this.onUploadCreatedEvents(activities, currUser);
    let partOfEvents = this.onUploadPartOfEvents(activities, currUser);
    return (
      <div className="main-container">

        <div className="profile-top-bar">

          <div className="profile-bar-left">
            <h2>{currUser.fullName}</h2>
            <h4>{currUser.title}</h4>
            <h4>{currUser.email}</h4>
            <p className="bold">
              <div className="bold">Bio:{currUser.bio}</div>
            </p>

          </div>
          <div className="profile-bar-right">
            <img className="profile-pic" src={currUser.imgUrl} alt=""/>
            <p>change your photo</p>
          </div>


        </div>
        <div className="flex column">
          <div className="flex mt50 sb">
            <div className="flex column">
              {/* <p>Location: {currUser.location.address}</p> */}
              <Link to="/activity/add">Add A New Event</Link>
              <div className="main-info-container">
                <h3>Events I organized:</h3>
                {eventsCreatedByUser ? (
                  <UserActivityList
                    activities={eventsCreatedByUser}
                    user={currUser}
                    onRemove={this.onRemove}
                    onRemoveFromList={this.onRemoveFromList}
                    madeOfOperation={"orgenizer"}
                  />
                ) : (
                    ""
                  )}
              </div>
              <div className="main-info-container">
                <h3>Events I{`'`}m going to:</h3>
                {partOfEvents ? (
                  <UserActivityList
                    activities={partOfEvents}
                    user={currUser}
                    onRemove={this.onRemove}
                    onRemoveFromList={this.onRemoveFromList}
                    madeOfOperation={"subscriber"}
                  />
                ) : (
                    ""
                  )}
              </div>
            </div>
            <div className="flex column tac">
              <h4>Preferences</h4>
              <ul>
                {currUser.prefs.map((pref, idx) => (
                  <li className="tal" key={idx}>
                    {pref}
                  </li>
                ))}
              </ul>
              <div className="calender">
                <UserSchedule activities={partOfEvents} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    activities: state.activityReducer.activities,
    user: state.userReducer.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadActivities,
  saveActivity,
  updateUser,
};

export const UserDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserDetails);
