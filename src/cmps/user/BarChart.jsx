// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Bar } from 'react-chartjs-2';


// class _MyBarChart extends Component {

//     getToysCategoryData = () => {
//         const { toys } = this.props;
//         let categoriesPrices = toys.reduce(function (acc, val) {
//             if (!acc[val.category]) acc[val.category] = 0;
//             acc[val.category] += val.price;
//             return acc;
//         }, {});
//         return categoriesPrices;
//     }

//     getToysData = () => {
//         let { toys } = this.props;
//         let categories = toys.reduce(function (acc, val) {
//             if (!acc[val.category]) acc[val.category] = 0;
//             acc[val.category]++;
//             return acc;
//         }, {});
//         return categories;
//     }

//     render() {
//         const { toys } = this.props;
//         const categories = this.getToysData();
//         const categoriesPrices = this.getToysCategoryData();
//         let prices = Object.values(categoriesPrices);
//         let cat = Object.values(categories);
//         let priceAvg = [];
//         prices.forEach((price, idx)=> priceAvg.push(price/ cat[idx]))
//         if (!Object.keys(categories).length) return <div>loading</div>

//         const data = {
//             labels: Object.keys(categories),
//             datasets: [
//                 {
//                     label: 'CATEGORY WITH PRICES',
//                     backgroundColor: 'rgba(295,149,88,0.2)',
//                     borderColor: 'rgba(255,99,14,1)',
//                     borderWidth: 1,
//                     hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//                     hoverBorderColor: 'rgba(255,99,132,1)',
//                     data: priceAvg
//                 }
//             ]
//         };
//         return (
//             <div>
//                 <Bar
//                     data={data}
//                     options={{
//                         maintainAspectRatio: false
//                     }}
//                 />
//             </div>
//         )
//     }
// }


// const mapStateToProps = state => {
//     return {
//         toys: state.toyReducer.toys,
//     }
// }

// export const MyBarChart = connect(mapStateToProps)(_MyBarChart)



