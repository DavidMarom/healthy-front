import React from 'react'
import {Link} from 'react-router-dom'
import { activityService } from '../../services/activityService'

export function UserActivityPreview({activity, user, madeOfOperation, onRemove, onRemoveFromList}) {
    return (
        <div className="user-activity-preview flex">
        <img src ={activity.imgUrls[0]} alt=""/>
        <div className="flex column">
        <h4 className="fs18">{activity.title}</h4>
        <li className="fs14">{activity.location.address}</li>
        </div>
        <Link to ={`activity/${activity._id}`}>Details</Link>
        {(madeOfOperation === 'orgenizer')?(<Link to={`/activity/edit/${activity._id}`}>Edit</Link>):''}
        {(madeOfOperation === 'orgenizer')?(<button onClick = {()=> onRemove(activity._id)}>Remove the event</button>):''}
        {(madeOfOperation === 'subscriber')?(<button onClick = {()=> onRemoveFromList(activity, user)}>Remove from Your List</button>):''}
        </div>
    )
}

