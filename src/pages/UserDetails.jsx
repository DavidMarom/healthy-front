import React, { Component } from 'react'
import { activityService } from '../services/activityService.js'
import { loadActivities } from "../store/actions/activityActions"
import { updateUser } from "../store/actions/userActions"
import { userService } from '../services/userService.js'
import { connect } from 'react-redux'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {UserActivityList} from '../cmps/user/UserActivityList'


export class _UserDetails extends Component {
    state = {
        currUser: {
            _id: 'u106',
            fullName: 'Marckus Smtart',
            userName: 'Markus',
            imgUrl: 'https://res.cloudinary.com/dygtul5wx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1600327859/sprint%204/users/80_uimgpd.jpg',
            password: 'e43asl',
            income: 329,
            prefs: ['bascketball', 'intermediat diet', 'mediterian diet', 'samba']
        },
    }

    componentDidMount() {
        this.props.loadActivities(this.state.currUser._id)
    }

    render() {
        let activities = this.props.activities;
        console.log(activities);
        if (!Object.keys(activities).length) activities = null;
        const { currUser } = this.state;
        if (!currUser) return <div>loading..</div>
        return (
            <div className="main-container">
                <div className="prodile-header">
                    <img className="profile-pic" src={currUser.imgUrl} />
                    <h3>{currUser.fullName}</h3>
                </div>
                <div className="main-info-container">
                    <UserActivityList activities={activities}/>
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