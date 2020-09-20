import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BarChart} from '../../cmps/user/BarChart.jsx'
import { PieChart} from '../../cmps/user/PieChart.jsx'

import { userService } from '../../services/userService.js';

class _UserDashbord extends Component {

    state = {
        currUser: userService.guestMode(),
        activities: null
    }

    componentDidMount() {
        const { userId } = this.props.match.params;
        console.log(userId)
        if (userId) {
            userService.getById(userId)
                .then(user => this.setState({ currUser: user }))
        }
    }

    render() {
        const { currUser } = this.state;
        return <div className="main-container">
            <div className="flex mt50 sb">
                <div className="flex column">
                    <h3>{currUser.fullName}</h3>
                    <h3>Total Sales: ${currUser.income}</h3>
                </div>
                <div className= "bar">
                    <BarChart user={currUser}/>
                </div>
                <div>
                    <PieChart user={currUser}/>
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