import React from 'react'
import { ActivityPreview } from './ActivityPreview'

export function ActivityList({ activities , onRemove}) {
    return (
        <div className="activity-list">
            {
                activities.map(activity => <ActivityPreview activity={activity} key={activity._id} onRemove={onRemove} />)
            }

        </div>
    )
}
