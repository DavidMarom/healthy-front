import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {loadActivities, removeActivity, setFilterBy} from "../store/actions/activityActions"
import {ActivityFilter} from '../cmps/activity/ActivityFilter';
import {ActivityList} from '../cmps/activity/ActivityList';


class _ActivityApp extends Component {

    state={
        filterBy:''
    }

    componentDidMount() {
        this.props.loadActivities(this.state.filterBy);
    }

    onDelete = () => {  
    }

    onSetFilter = (filterBy={}) => {
        this.setState({ filterBy }, ()=> this.props.loadActivities(this.state.filterBy));
    }

    onRemove = (_id) => {
        this.props.removeActivity(_id)
    }


    render() {
        const {activities} = this.props;
        if (!activities) return <div>Loading....</div>
        return (
            <div className="activity-app">
                 <div className="filter">
                    <ActivityFilter onSetFilter={this.onSetFilter} />
                </div>
                <ActivityList activities={activities} onRemove = {this.onRemove}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activityReducer.activities
    }
}
const mapDispatchToProps = {
    loadActivities,
    removeActivity,
    // setFilterBy
}
export const ActivityApp = connect(mapStateToProps, mapDispatchToProps)(_ActivityApp)