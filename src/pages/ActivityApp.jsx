import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadActivities, removeActivity } from "../store/actions/activityActions"
import { ActivityFilter } from '../cmps/activity/ActivityFilter';
import { ActivityList } from '../cmps/activity/ActivityList';


class _ActivityApp extends Component {

    state = {
        filterBy: '',
        byDay: 0
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
        this.setState({ filterBy }, () => console.log(this.state.filterBy))
    }

    dummySortByDays = (day) => {
        this.setState({ byDay: day }, () => { console.log(this.state.byDay); })
    }


    onRemove = (_id) => {
        this.props.removeActivity(_id)
    }

    calcAvgRate = (arr) => {
        let tempSum = 0;
        arr.map((rateValue) => (tempSum += rateValue));
        const tempAvg = tempSum / arr.length;
        return tempAvg;
    }


    getActivitiesForDisplay = () => {
        const { filterBy } = this.state
        const activities = this.props.activities
        const searchBy = this.props.searchBy
        const { byDay } = this.state
        let filteredActivities;
        let activitiesByDay;


        if (byDay === 0) activitiesByDay = activities
        else {
            activitiesByDay = activities.filter(activity => activity.dayInWeek === byDay)
        }

        if (filterBy === 'Tel Aviv') {
            filteredActivities = activitiesByDay.filter(activity => activity.tags.includes('telAviv'))
        }
        if (filterBy === 'Sports') {
            filteredActivities = activitiesByDay.filter(activity => activity.tags.includes('sports'))
        }
        if (filterBy === 'Yoga') {
            filteredActivities = activitiesByDay.filter(activity => { activity.tags.includes('yoga') })
        }
        if (filterBy === 'Nutrition') {
            filteredActivities = activitiesByDay.filter(activity => activity.tags.includes('nutrition'))
        }
        if (filterBy === 'Highest Rated') {
            filteredActivities = activitiesByDay.filter(activity => {
                const avgRate = this.calcAvgRate(activity.rate)
                return (avgRate >= 4)
            })
        }

        if (filterBy === '') {
            filteredActivities = activitiesByDay

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
                    <ActivityFilter dummySetFilter={this.dummySetFilter} dummySortByDays={this.dummySortByDays} />
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