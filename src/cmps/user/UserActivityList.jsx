import React from 'react'
import { UserActivityPreview } from './UserActivityPreview'


export function UserActivityList({ activities , onRemove}) {
    if (!activities) return <div>you didn't creat any event yet</div>
    return (
        <div className="user-activity-list flex column">
            <h3>YOUR SERVICES</h3>
            {
                activities.map(activity => <UserActivityPreview activity={activity} key={activity._id} />)
            }

        </div>
    )
}