// import { func } from "prop-types";

import { blue } from "@material-ui/core/colors";

export const chartService = {
  getMembers,
  getTitles,
  findMaxCapacity,
  getIncomeFromEvent,
  getIncome,
  getRandomColor
}

function getTitles(activities){
    return activities.map(activity=> activity.title)
}

function getMembers(activities){
    return activities.map(activity=> activity.participants.length)
}

function getIncomeFromEvent(activities){
    return activities.map(activity=> activity.participants.length * activity.price)
}

function findMaxCapacity(activities){
    var max = -Infinity;
    activities.forEach(activity=>{
        if(max < activity.maxCapacity) max= activity.maxCapacity
    })
    return max;
}

function getIncome(incomeFromEvent){
    return incomeFromEvent.reduce(function(acc,val){
        return acc+val;
    },0)
}    

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
