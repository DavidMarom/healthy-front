import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BarChart } from '../../cmps/user/BarChart.jsx'
import { PieChart } from '../../cmps/user/PieChart.jsx'

import { userService } from '../../services/userService.js';

class _UserDashbord extends Component {

    state = {
        guest:{
                email: "guestMode@gmail.com",
                fullName : "Guest Mode",
                imgUrl : [ 
                    "https://res.cloudinary.com/dygtul5wx/image/upload/v1600549811/sprint%204/users/guest-user_z4inbq.jpg"
                ],
                prefs : [ 
                    'diet', 
                    'nutrition', 
                    'cardio', 
                    'sport', 
                    'well-being'
                ]
            },
            activities: null
        }

    render() {
        const { currUser } = this.state;
        return <div className="main-container">
            <div className="flex mt50 sb column">
                <div className="flex dashbord-info fs24 column">
                    <h3>GUEST MODE</h3>
                    <h3>Total Sales: $4500</h3>
                </div>
                <div className="flex no-wrap align-center sb">
                    <div className="bar m10">
                        <BarChart user={this.state.guest} />
                    </div>
                    <div>
                        <PieChart user={this.state.guest} />
                    </div>
                </div>
            </div>
        </div>
    }
}


const mapStateToProps = state => {

    return {
        activities: state.activityReducer.activities,
        user: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {

}

export const UserDashbord = connect(mapStateToProps, mapDispatchToProps)(_UserDashbord)