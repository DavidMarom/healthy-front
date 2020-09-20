import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { loadActivities } from "../../store/actions/activityActions"
import { connect } from 'react-redux'
import { UserActivityList } from '../../cmps/user/UserActivityList'
import { UserSchedule } from '../../cmps/user/UserSchedule'
import { userService } from "../../services/userService.js";
import { activityService } from '../../services/activityService.js';

export class _UserDetails extends Component {
    state = {
        currUser: null,
        createdAct: {},
        particiipant: {}
    }

    componentDidMount() {
        const currUser = (this.props.user)? this.props.user: userService.guestMode();
        this.setState({ currUser }, () => this.props.loadActivities(this.state.currUser._id))
    }

    onUploadCreatedEvents = (activities, currUser) => {
        let act = activityService.uploadCreatedEvents(activities, currUser)
        return act; 
        // if (!activities) return null;
        // return activities.filter(activity => activity.createdBy._id === currUser._id)
    }

    onUploadPartOfEvents = (activities, currUser) => {
        return activityService.uploadPartOfEvents(activities, currUser);
        // if (!activities) return null;
        // var act = [];
        // activities.forEach(activity => {
        //     activity.participants.forEach(user => {
        //         if (user._id === currUser._id) act.push(activity)
        //     })
        // })
        // return act;
    }


    render() {
        let { activities } = this.props;

        if (!Object.keys(activities).length) activities = null;
        const { currUser } = this.state;
        if (!currUser) return <div>loading..</div>
        let eventsCreatedByUser = this.onUploadCreatedEvents(activities, currUser);
        let partOfEvents = this.onUploadPartOfEvents(activities, currUser);
        return (
            <div className="main-container">
                <div className="flex column">
                    <img className="profile-pic" src={currUser.imgUrl} />
                    <p>change your perofile picture</p>
                    <div className="flex mt50 sb">
                        <div className="flex column">
                            <h3>{currUser.fullName}</h3>
                            {/* <p>Location: {currUser.location.address}</p> */}
                            <p>Bio:{currUser.bio}</p>
                            <h4>{currUser.email}</h4>
                            <Link to='/activity/add'>Add A New Event</Link>
                            <div className="main-info-container">
                                <h3>Events I organized:</h3>
                                {(eventsCreatedByUser)? <UserActivityList activities={eventsCreatedByUser} user={currUser}/>:''}
                            </div>
                            <div className="main-info-container">
                                <h3>Events Im going to:</h3>
                               {(partOfEvents)? <UserActivityList activities={partOfEvents} user={currUser} />: ''}
                            </div>
                        </div>
                        <div className="flex column tac">
                            <h4>Preferences</h4>
                            <ul>{currUser.prefs.map((pref, idx) => <li className="tal" key={idx}>{pref}</li>)}</ul>
                            <div className="calender">
                                <UserSchedule activities={partOfEvents} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {

    return {
        activities: state.activityReducer.activities,
        user: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    loadActivities
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)