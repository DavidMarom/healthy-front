import React, { Component } from 'react'
import { loadActivities } from "../../store/actions/activityActions"
import { connect } from 'react-redux'
import { UserActivityList } from '../../cmps/user/UserActivityList'
import { UserSchedule } from '../../cmps/user/UserSchedule'
import { userService } from "../../services/userService.js";

export class _UserDetails extends Component {
    state = {
        currUser: null,
        createdAct: {},
        particiipant: {}
    }

    componentDidMount() {
        const currUser = this.props.user;
        this.setState({ currUser }, () => this.props.loadActivities(this.state.currUser._id))
    }

    uploadCreatedEvents = (activities, currUser) => {
        if (!activities) return null;
        return activities.filter(activity => activity.createdBy._id === currUser._id)
    }

    uploadPartOfEvents = (activities, currUser) => {
        if (!activities) return null;
        var act = [];
        activities.forEach(activity => {
            activity.participants.forEach(user => {
                if (user._id === currUser._id) act.push(activity)
            })
        })
        return act;
    }


    render() {
        let { activities } = this.props;

        if (!Object.keys(activities).length) activities = null;
        const { currUser } = this.state;
        if (!currUser) return <div>loading..</div>
        let eventsCreatedByUser = this.uploadCreatedEvents(activities, currUser);
        let partOfEvents = this.uploadPartOfEvents(activities, currUser);
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
                            <div className="main-info-container">
                                <h3>Events Im going to:</h3>
                                {(eventsCreatedByUser)? <UserActivityList activities={eventsCreatedByUser} user={null}/>:''}
                            </div>
                            <div className="main-info-container">
                                <h3>Events I organize:</h3>
                                <UserActivityList activities={partOfEvents} user={currUser} />
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