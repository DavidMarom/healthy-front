import React from 'react'
import {Link} from 'react-router-dom'
import { activityService } from '../../services/activityService'

export function UserActivityPreview({activity, onRemove}) {
    return (
        <div className="user-activity-preview flex">
        <img src ={activity.imgUrls[0]} alt=""/>
        <h4>{activity.title}</h4>
        <li>{activity.location.address}</li>
        <button onClick={()=> onRemove(activity._id)}>Delete</button>
        <Link to ={`activity/${activity._id}`}>Details</Link>
        </div>
    )
}

