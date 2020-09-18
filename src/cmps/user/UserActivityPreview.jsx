import React from 'react'
import {Link} from 'react-router-dom'
import { activityService } from '../../services/activityService'

export function UserActivityPreview({activity, user}) {
    return (
        <div className="user-activity-preview flex">
        <img src ={activity.imgUrls[0]} alt=""/>
        <div className="flex column">
        <h4 className="fs18">{activity.title}</h4>
        <li className="fs14">{activity.location.address}</li>
        </div>
        <Link to ={`activity/${activity._id}`}>Details</Link>
        {(user !== null)?<Link to={`/activity/edit/${activity._id}`}>Edit</Link>:''}
        </div>
    )
}

