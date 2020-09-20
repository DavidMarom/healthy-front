export const chartService = {
  getMembers,
  getTitles,
  findMaxCapacity,
  getIncomeFromEvent
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