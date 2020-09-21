import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadActivities, removeActivity } from "../store/actions/activityActions"
import { ActivityFilter } from '../cmps/activity/ActivityFilter';
import { ActivityList } from '../cmps/activity/ActivityList';


class _ActivityApp extends Component {

    state = {
        filterBy: ''
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

    dummySetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy }, () => console.log(this.state.filterBy))
    }

    getActivitiesForDisplay = () => {
        const { filterBy } = this.state
        const activities = this.props.activities
        const searchBy = this.props.searchBy
        let filteredActivities;
        if (filterBy === 'Tel Aviv') {
            filteredActivities = activities.filter(activity => activity.tags.includes('telAviv'))
        }
        if (filterBy === 'Sports') {
            filteredActivities = activities.filter(activity => activity.tags.includes('sports'))
        }
        if (filterBy === 'Yoga') {
            filteredActivities = activities.filter(activity => activity.tags.includes('yoga'))
        }
        if (filterBy === 'Nutrition') {
            filteredActivities = activities.filter(activity => activity.tags.includes('nutrition'))
        }
        if (filterBy === 'Highest Rated') {
            filteredActivities = activities.filter(activity => activity.avgRate>=4)
        }
        if (filterBy === '') {
            filteredActivities = activities
        }
        if (!searchBy) {
            return filteredActivities
        }
        else {
            const filteredAndSearched = filteredActivities.filter(activity => activity.title.toLowerCase().includes(searchBy.title.toLowerCase()))
            return filteredAndSearched
        }
    }

    render() {
        const activities = this.getActivitiesForDisplay();
        if (!activities) return <div>Loading....</div>
        return (

            <div className="activity-app main-container marg-top-50">
                <div className="filter">
                    <ActivityFilter dummySetFilter={this.dummySetFilter} />
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