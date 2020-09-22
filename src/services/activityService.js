import httpService from './httpService';

export const activityService = {
  query,
  getById,
  remove,
  getEmpty,
  update,
  // add
  save,
  addRate,
  uploadCreatedEvents,
  uploadPartOfEvents,
  findIdxById

}

function query(filterBy = {}) {
  // var queryStr
  // if (!filterBy.name && !filterBy.type) {
  //   return httpService.get('activity')
  // }
  // var queryStr = `?name=${filterBy.name}&type=${filterBy.type}`;
  // return httpService.get(`activity/${queryStr}`);

  return httpService.get(`activity`);
}



function getById(activityId) {
  return httpService.get(`activity/${activityId}`);
}

function remove(activityId) {
  return httpService.delete(`activity/${activityId}`);
}


function update(activity) {
  return httpService.put(`activity/${activity._id}`, activity)
}

// async function add(activity) {
//   const addedActivity = await httpService.post('activity/', activity);
//   return addedActivity
// }

async function save(activity) {
  if (activity._id) {
    return httpService.put(`activity/${activity._id}`, activity)
  } else {
    return httpService.post(`activity`, activity)
  }
}


function addRate(activity, rate) {
  if (rate != null) {
    activity.rate.push(rate)
    return httpService.put(`activity/${activity._id}`, activity)
  }
}

function getEmpty() {
  return {
    title: "",
    createdAt: "",
    description: "",
    location:{
      address: ""
    },
    imgUrls:[],
    participants:[],
    tags:[],
    rate:[],
    reviews:[],
    msgs:[]
  }
}


function uploadCreatedEvents(activities, currUser) {
  if (!activities) return null;
  return activities.filter(activity => activity.createdBy._id === currUser._id)
}

function uploadPartOfEvents(activities, currUser) {
  if (!activities) return null;
  var act = [];
  activities.forEach(activity => {
    activity.participants.forEach(user => {
      if (user._id === currUser._id) act.push(activity)
    })
  })
  return act;
}

function findIdxById(arr, id){
    return arr.findIndex(item=> item._id === id)
}


