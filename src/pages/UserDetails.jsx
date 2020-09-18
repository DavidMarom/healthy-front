import React, { Component } from 'react'
// import { activityService } from '../services/activityService.js'
import { loadActivities } from "../store/actions/activityActions"
import { connect } from 'react-redux'
import { UserActivityList } from '../cmps/user/UserActivityList'
import { UserSchedule} from '../cmps/user/UserSchedule'

export class _UserDetails extends Component {
    state = {
        currUser: {
            _id: 'u101',
            fullName: 'Marckus Smtart',
            userName: 'Markus',
            location: {
                lat: 32.0605,
                lng: 34.8731,
                address: 'Ganei Tikva'
            },
            email: 'mar.k@gmail.com',
            bio: ' 29 years old Producer manager with 6 years experiance in software products. Experiance with both the creative and the technical sides of product managment.',
            imgUrl: 'https://res.cloudinary.com/dygtul5wx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1600327859/sprint%204/users/80_uimgpd.jpg',
            password: 'e43asl',
            income: 329,
            facebook: 'facebook.com',
            twitter: 'twitter.com',
            prefs: ['bascketball', 'intermediat diet', 'mediterian diet', 'samba']
        },
        createdAct: {},
        particiipant: {}
    }

    componentDidMount() {
        this.props.loadActivities(this.state.currUser._id)
    }

    uploadCreatedEvents = (activities, currUser) => {
        if (!activities) return null;
        return activities.filter(activity => activity.createdBy._id === currUser._id)
    }

    uploadPartOfEvents = (activities, currUser) => {
        if (!activities) return null;
        return activities.filter(activity => activity.participants.map(user => user._id === currUser._id))
    }


    render() {
        let { activities } = this.props;
        if (!Object.keys(activities).length) activities = null;
        const { currUser } = this.state;
        if (!currUser) return <div>loading..</div>
        let personalActivities = this.uploadCreatedEvents(activities, currUser);
        let partOfEvents = this.uploadPartOfEvents(activities, currUser);
        console.log('pp-', partOfEvents);
        return (
            <div className="main-container">
                <div className="flex column">
                    <img className="profile-pic" src={currUser.imgUrl} />
                    <p>change your perofile picture</p>
                    <div className="flex mt50 sb">
                        <div className="flex column">
                            <h3>{currUser.fullName}</h3>
                            <p>Location: {currUser.location.address}</p>
                            <p>Bio:{currUser.bio}</p>
                            <h4>{currUser.email}</h4>
                            <div className="main-info-container">
                                <h3>Events Im going to:</h3>
                                <UserActivityList activities={personalActivities} />
                            </div>
                            <div className="main-info-container">
                                <h3>Events I organize:</h3>
                                <UserActivityList activities={partOfEvents} />
                            </div>
                        </div>
                        <div className="flex column tac">
                            <h4>Preferences</h4>
                            <ul>{currUser.prefs.map((pref, idx) => <li className="tal" key={idx}>{pref}</li>)}</ul>
                            <div className="calender">
                                <UserSchedule activities={partOfEvents}/>
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
        user: state.userReducer.loggedinUser
    }
}

const mapDispatchToProps = {
    loadActivities
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)