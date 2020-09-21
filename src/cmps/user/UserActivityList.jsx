import React from 'react'
import { Link } from 'react-router-dom'
import { UserActivityPreview } from './UserActivityPreview'


export function UserActivityList({ activities, user, madeOfOperation ,onRemove ,onRemoveFromList}) {
    if (!activities) return <div>you didn't creat any event yet</div>
    return (
        <div className="user-activity-list flex column">
            {
                activities.map(activity => <UserActivityPreview activity={activity}
                    key={activity._id}
                    user={user}
                    onRemove={onRemove}
                    onRemoveFromList = {onRemoveFromList}
                    madeOfOperation={madeOfOperation} />)
            }
            {(madeOfOperation === 'orgenizer')?<Link to={`/user/${user._id}`}>For More Details</Link>:''}
        </div>
    )
}
