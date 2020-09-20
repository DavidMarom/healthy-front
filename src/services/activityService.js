import httpService from './httpService';

export const activityService = {
  query,
  getById,
  remove,
  getEmpty,
  update,
  // add
  save,
  addRate

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

async function add(activity) {
  const addedActivity = await httpService.post('activity/', activity);
  return addedActivity
}

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

