const initialState = {
    activities: []
}

export function activityReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACTIVITIES':
            return {
                ...state,
                activities: action.activities
            }

            case 'EDIT_ACTIVITY':
                return {
                    ...state,
                    activities: state.activity.map(activity => {
                        if (action.activity._id === activity._id) return action.activity
                        return activity;
                    })
                }
            case 'ADD_ACTIVITY':
                return {
                    ...state, activities: [...state.activity, action.activity]
                }
            case 'REMOVE_ACTIVITY':
                return { ...state, activities: state.activitys.filter(activity => activity._id !== action.activityId) }
            default:
                return state
        }
    }
