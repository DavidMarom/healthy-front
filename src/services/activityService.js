import httpService from './httpService';

export const activityService = {
  query,
  getById,
  remove,
  getEmpty,
  // update,
  // add
  save

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

function getEmpty() {
  return {
    imgUrl: "",
    title: "",
    createdAt: "",
    description: "",
    address: "",
    price: ""
  }
}
