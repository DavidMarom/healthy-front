import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadActivities, removeActivity} from "../store/actions/activityActions"
import { ActivityFilter } from '../cmps/activity/ActivityFilter';
import { ActivityList } from '../cmps/activity/ActivityList';


class _ActivityApp extends Component {

    state = {
        filterBy: '',
    }

    componentDidMount() {
        this.props.loadActivities(this.state.filterBy);
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.searchBy);
        if (!prevProps.searchBy) return;
        if (prevProps.searchBy.title !== this.props.searchBy.title) this.props.loadActivities(this.state.filterBy)
    }

  
    onSetFilter = (filterBy = {}) => {
        this.setState({ filterBy }, () => this.props.loadActivities(this.state.filterBy));
    }

    onRemove = (_id) => {
        this.props.removeActivity(_id)
    }

    getActivitiesForDisplay = () => {
        const activities = this.props.activities
        const searchBy = this.props.searchBy
        if (!searchBy) {
            return activities
        }
        const searchedActivities = activities.filter(activity => activity.title.toLowerCase().includes(searchBy.title.toLowerCase()))
        return searchedActivities
    }


    render() {
        const activities = this.getActivitiesForDisplay();
        if (!activities) return <div>Loading....</div>
        return (
            <div className="activity-app">
                <div className="filter">
                <ActivityFilter onSetFilter={this.onSetFilter} />
                </div>
                <ActivityList activities={activities} onRemove={this.onRemove} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activityReducer.activities,
        searchBy: state.activityReducer.searchBy
    }
}
const mapDispatchToProps = {
    loadActivities,
    removeActivity,

}
export const ActivityApp = connect(mapStateToProps, mapDispatchToProps)(_ActivityApp)