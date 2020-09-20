import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { loadActivities } from '../../store/actions/activityActions.js';
import { chartService} from '../../services/chartService.js';
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

//     getRandomColor = () => {
//         var letters = '0123456789ABCDEF';
//         var color = '#';
//         for (var i = 0; i < 6; i++) {
//           color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//       }

//     getToysData = () => {
//         let categories = activites.reduce(function (acc, val) {
//             if (!acc[val.category]) acc[val.category] = 0;
//             acc[val.category]++;
//             return acc;
//         }, {});
//        return categories;
//     }

    render(){
        const { user } = this.props;
        const { activities } = this.props;
        if (!user) return <div>loading</div>
        let eventsCreatedByUser = this.onUploadCreatedEvents(activities, user);

          //bild the bar variables:
          let titles = this.onGetTitles(eventsCreatedByUser)
          let incomeFromEvent = this.onGetIncomeFromEvent(eventsCreatedByUser)
          console.log(incomeFromEvent);

        return<div>pie</div>
    }

}
//         const categories = this.getToysData();
//         if (!Object.keys(categories).length) return <div>loading</div>
//         const size = Object.keys(categories).map((key) => [(key)]);
//         let bgc = [];
//         let bgcHover = [];
//         for (let i = 0; i < size.length; i++) {
//             bgc.push(toyService.getRandomColor());
//             bgcHover.push(toyService.getRandomColor());
//         }
//         const data = {
//             labels: Object.keys(categories),
//             datasets: [{
//                 data: Object.values(categories),
//                 backgroundColor: [...bgc],
//                 hoverBackgroundColor: [...bgcHover]
//             }]
//         };
//         return (
//             <div>
//                 <Pie data={data} />
//             </div>
//         )
//     }
// }


const mapStateToProps = state => {
    return {
        activities: state.activityReducer.activities
    }
}
const mapDispatchToProps = {
    loadActivities
}

export const PieChart = connect(mapStateToProps, mapDispatchToProps)(_PieChart)







