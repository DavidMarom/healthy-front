import React from 'react'
import { ActivityPreview } from './ActivityPreview'
import { Card } from '../Card.jsx'

export function ActivityList({ activities , onRemove}) {
    return (
        <div className="activity-list flex wrap">
            {
                activities.map(activity => <Card activity={activity} key={activity._id} />)
            }

        </div>
    )
}


{/* <ActivityPreview activity={activity} key={activity._id} onRemove={onRemove} */}
