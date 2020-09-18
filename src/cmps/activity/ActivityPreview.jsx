import React from 'react'
import { Link } from 'react-router-dom'
import { activityService } from '../../services/activityService'

export function ActivityPreview({ activity }) {
    return (
        <div className="activity-preview card">
            <Link to={`activity/${activity._id}`}>
                <div className="card-img">
                    <img className="img-fit" src={activity.imgUrls[0]} />
                </div>
                <h4>{activity.title}</h4>
                <li>{activity.startsAt}</li>
                <p>{activity.description}</p>
                <li>{activity.location.address}</li>
                <h5>{activity.createdBy.fullName}</h5>
                <li>${activity.price}</li>
            </Link>
        </div>
    )
}

