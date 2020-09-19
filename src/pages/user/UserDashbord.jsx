import React, { Component } from 'react'
import { connect } from 'react-redux'

class _UserDashbord extends Component {
    render(){
        return <div>dashbord</div>
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