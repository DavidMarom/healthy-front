import { activityService } from '../../services/activityService.js'

export function loadActivities(filterBy={}) {
  console.log('Im in loadActivities');
    return async dispatch => {
        const activities = await activityService.query(filterBy);
        dispatch({ type: 'SET_ACTIVITIES', activities })
      };
}


export function removeActivity(activityId) {
    return async dispatch => {
        await activityService.remove(activityId)
        dispatch({ type: 'REMOVE_ACTIVITY', activityId })
      };
}

export function saveActivity(activity) {
    return async dispatch => {
        const actionType = activity._id ? 'EDIT_ACTIVITY' : 'ADD_ACTIVITY';
        const _activity = await activityService.save(activity);
        dispatch({ type: actionType, _activity })
      };
}

export function setFilterBy(filterBy) {
  
}
