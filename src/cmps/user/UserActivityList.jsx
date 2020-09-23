import React from 'react'
import { Link } from 'react-router-dom'
import { UserActivityPreview } from './UserActivityPreview'


export function UserActivityList({ activities, user, madeOfOperation ,onRemove ,onRemoveFromList}) {
    if (!activities) return <div>You have not created any events yet</div>
    return (
        <div className="user-activity-list flex column">
            {
                activities.map((activity,idx) => <UserActivityPreview activity={activity}
                    key={idx}
                    user={user}
                    onRemove={onRemove}
                    onRemoveFromList = {onRemoveFromList}
                    madeOfOperation={madeOfOperation} />)
            }
            {/* {(madeOfOperation === 'orgenizer')?<Link to={`/user/${user._id}`}>For More Details</Link>:''} */}
        </div>
    )
}
