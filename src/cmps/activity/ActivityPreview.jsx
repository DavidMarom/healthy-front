import React from 'react'
import {Link} from 'react-router-dom'
import { activityService } from '../../services/activityService'

export function ActivityPreview({activity, onRemove}) {
    return (
        <div className="activity-preview">
        <img src ={activity.imgUrls[0]} alt=""/>
        <h4>{activity.title}</h4>
        <li>{activity.startsAt}</li>
        <p>{activity.description}</p>
        <li>{activity.location.address}</li>
        <h5>{activity.createdBy.fullName}</h5>
        <li>${activity.price}</li>
        <button onClick={()=> onRemove(activity._id)}>Delete</button>
        <Link to ={`activity/${activity._id}`}>Details</Link>
        </div>
    )
}

