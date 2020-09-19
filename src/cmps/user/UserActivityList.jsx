import { React, Link } from 'react'
import { UserActivityPreview } from './UserActivityPreview'


export function UserActivityList({ activities , user}) {
    if (!activities) return <div>you didn't creat any event yet</div>
    return (
        <div className="user-activity-list flex column">
            {
                activities.map(activity => <UserActivityPreview activity={activity} key={activity._id} user={user} />)
            }
            <Link to={`/user/${user._id}`}>For More Details</Link>
        </div>
    )
}
