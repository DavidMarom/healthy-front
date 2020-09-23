import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js'
import { loadActivities } from '../../store/actions/activityActions.js';
import { chartService } from '../../services/chartService.js';
import { activityService } from '../../services/activityService.js';


class _PieChart extends Component {


    state = {
        activities: null
    }

    componentDidMount() {
        const { user } = this.props;
        this.props.loadActivities(user._id)
    }

    onUploadCreatedEvents = (activities, currUser) => {
        let act = activityService.uploadCreatedEvents(activities, currUser)
        return act;
    }

    onGetTitles = (eventsCreatedByUser) => {
        return chartService.getTitles(eventsCreatedByUser)
    }

    onGetIncomeFromEvent = (eventsCreatedByUser) => {
        return chartService.getIncomeFromEvent(eventsCreatedByUser)
    }

    onGetIncome = (incomeFromEvent) => {
        return chartService.getIncome(incomeFromEvent)
    }

    onGetRandomColor = () => {
        return chartService.getRandomColor()
    }

    render() {
        const { user } = this.props;
        const { activities } = this.props;
        if (!user) return <div>loading</div>
        let eventsCreatedByUser = this.onUploadCreatedEvents(activities, user);

        //bild the bar variables:
        let titles = this.onGetTitles(eventsCreatedByUser)
        let incomeFromEvent = this.onGetIncomeFromEvent(eventsCreatedByUser)
        let income = this.onGetIncome(incomeFromEvent)
        if (income !== user.income) user.income = income;

        let bgc = [];
        let bgcHover = [];
        incomeFromEvent.map(() => {
            bgc.push(this.onGetRandomColor())
            bgcHover.push(this.onGetRandomColor())
            return null;
        })

        const data = {
            datasets: [{
                data: incomeFromEvent,
                backgroundColor: [...bgc],
                hoverBackgroundColor: [...bgcHover]
            }],
            labels: titles
        };
        return (
            <div>
                <h3 className="tac">Income By Events</h3>
                <Pie
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        pieceLabel: {
                            render: 'value',
                            fontSize: 14,
                            fontStyle: 'bold',
                            fontColor: '#000'
                        }
                    }
                    }
                    width={400}
                    height={400}
                />
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
    loadActivities
}

export const PieChart = connect(mapStateToProps, mapDispatchToProps)(_PieChart)







