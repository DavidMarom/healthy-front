// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Pie } from 'react-chartjs-2';

// export function _PieChart (user, EventsByUser) {

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

//     render() {
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


// const mapStateToProps = state => {
//     return {
//       activities: this.state.acitivityReducer.activities,
//       user: this.state.loggedinUser
//     }
// }

// export const PieChart = connect(mapStateToProps)(_PieChart)






