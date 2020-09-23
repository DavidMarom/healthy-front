import React, { Component } from "react";
import { connect } from "react-redux";
import { loadActivities, removeActivity } from "../store/actions/activityActions";
import { ActivityFilter } from "../cmps/activity/ActivityFilter";
import { ActivityList } from "../cmps/activity/ActivityList";

class _ActivityApp extends Component {

    state = {
        filterBy: '',
        byDay: 0
    }
    componentDidMount() {
        this.props.loadActivities(this.props.searchBy);
        // this.props.loadActivities(this.state.filterBy);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.searchBy) return;
        if (prevProps.searchBy.title !== this.props.searchBy.title)
            this.props.loadActivities(this.props.searchBy)
        // this.props.loadActivities(this.state.filterBy);
    }

  
    onRemove = (_id) => {
        this.props.removeActivity(_id);
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    };

    dummySortByDays = (day) => {
        this.setState({ byDay: day })
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

    

>>>>>>> 4444c00074cfe77c5d491d050eed5db1546a0b28
>>>>>>> ee76e1483b9666bb02d978a048c7013499273e31
    calcAvgRate = (arr) => {
        let tempSum = 0;
        arr.map((rateValue) => (tempSum += rateValue));
        const tempAvg = tempSum / arr.length;
        return tempAvg;
    }


    getActivitiesForDisplay = () => {
        const activities = this.props.activities
        const { filterBy } = this.state
        const { byDay } = this.state
        let filteredActivities;
        let activitiesByDay;

        if (byDay === 0) activitiesByDay = activities
        else {
            activitiesByDay = activities.filter(activity => activity.dayInWeek === byDay)
        }

        if (filterBy === '') {
            filteredActivities = activitiesByDay
        }
        else if (filterBy === 'Highest Rated') {
            filteredActivities = activitiesByDay.filter(activity => {
                const avgRate = this.calcAvgRate(activity.rate)
                return (avgRate >= 4)
            })
        }
        else {
            filteredActivities = activitiesByDay.filter(activity =>
                activity.tags.includes(filterBy.toLowerCase()))
        }

        return filteredActivities
    }

    render() {
        // const activities =this.props.activities
        const activities = this.getActivitiesForDisplay();
        if (!activities) return <div>Loading....</div>
        return (

            <div className="activity-app main-container marg-top-50">
                <div className="filter">
                    <ActivityFilter onSetFilter={this.onSetFilter} dummySortByDays={this.dummySortByDays} />
                </div>
                <ActivityList activities={activities} onRemove={this.onRemove} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.activityReducer.activities,
        searchBy: state.activityReducer.searchBy,
    };
};
const mapDispatchToProps = {
    loadActivities,
    removeActivity,
};
export const ActivityApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ActivityApp);
