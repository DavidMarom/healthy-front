import React from 'react'
import { ActivityPreview } from './ActivityPreview'
// import { Card } from '../Card.jsx'

export function ActivityList({ activities , onRemove}) {
    return (
        <div className="activity-list cardsnew">
            {
                activities.map(activity => <ActivityPreview activity={activity} key={activity._id} onRemove={onRemove} />)
            }

        </div>
    )
}


/* <ActivityPreview activity={activity} key={activity._id} onRemove={onRemove} */
