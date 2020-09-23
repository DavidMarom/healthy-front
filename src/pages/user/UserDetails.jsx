import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  loadActivities,
  saveActivity,
  removeActivity
} from "../../store/actions/activityActions";
import { connect } from "react-redux";
import { UserActivityList } from "../../cmps/user/UserActivityList";
import { UserSchedule } from "../../cmps/user/UserSchedule";
import { userService } from "../../services/userService.js";
import { activityService } from "../../services/activityService.js";
import { updateUser } from "../../store/actions/userActions.js";
import { UserDashbord } from "./UserDashbord.jsx";

export class _UserDetails extends Component {
  state = {
    currUser: null,
    createdAct: {},
    participant: {},
  };

  componentDidMount() {
    const { userId } = this.props.match.params;
    if (userId) {
      userService.getById(userId)
        .then(user => this.setState({ currUser: user }, () => this.props.loadActivities(this.state.currUser._id)))
    }
  }

  onRemove = (ev, _id) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.removeActivity(_id);
  };
  onRemoveFromList = (ev, activity, user) => {
    ev.preventDefault();
    ev.stopPropagation();
    // delete from the user list by canceling participant inside the activity object
    let idx = activityService.findIdxById(activity.participants, user._id);
    activity.participants.splice(idx, 1);

    // update activity
    this.props.saveActivity(activity);

    // update the organizer income
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
            {currUser.bio}

          </div>
          <div className="profile-bar-right">
            <img className="profile-pic" src={currUser.imgUrl} alt="" />
            <p>Change Photo</p>

            {/* <div className="calender">
                <UserSchedule activities={partOfEvents} />
              </div> */}
          </div>
        </div>

        <div className="pref-line">
          <h4>Preferences: </h4>
          {currUser.prefs.map((pref, idx) => (
            <div className="tal inline" key={idx}>
              {pref}
              {(idx < currUser.prefs.length - 1) ? (<p> • </p>) : (null)}
            </div>
          ))}
        </div>


        <div className="flex column">
          <div className="flex mt50 sb">
            <div className="flex column">
              {/* <p>Location: {currUser.location.address}</p> */}
              <Link to="/activity/add">Add A New Event</Link>
              <div className="main-info-container">
                {eventsCreatedByUser ? (<UserDashbord user={currUser} activities={eventsCreatedByUser} />) : ''}

                <h3>Events I organized:</h3>

                {eventsCreatedByUser ? (
                  <UserActivityList
                    activities={eventsCreatedByUser}
                    user={currUser}
                    onRemove={this.onRemove}
                    onRemoveFromList={this.onRemoveFromList}
                    madeOfOperation={"organizer"}
                  />
                ) : (null)}

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
  removeActivity
};

export const UserDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserDetails);
