import React from 'react'
import { Link } from 'react-router-dom'
// import { activityService } from '../../services/activityService'

export function UserActivityPreview({ activity, user, madeOfOperation, onRemove, onRemoveFromList }) {

    function renderDay(value) {
        let res = "";
        switch (value) {
            case 1:
                res = "Sunday";
                break;

            case 2:
                res = "Monday";
                break;

            case 3:
                res = "Tuesday";
                break;

            case 4:
                res = "wednesday";
                break;

            case 5:
                res = "Thursday";
                break;

            case 6:
                res = "Friday";
                break;

            case 7:
                res = "Saturday";
                break;

            default:
                break;
        }
        return res;
    }

    function showActivityDetails(ev){
        ev.preventDefault();
        ev.stopPropagation();
    }

    return (
        <Link to={`activity/${activity._id}`}>
            <div className="user-activity-preview flex">
                <img src={activity.imgUrls[0]} alt="" />
                <div className="flex column">
                    <h4 className="fs18">{activity.title}</h4>
                    <li className="fs14">{activity.location.address}</li>
                </div>

                {(madeOfOperation === 'organizer') ? (<Link to={`/activity/edit/${activity._id}`}>Edit</Link>) : ''}
                {(madeOfOperation === 'organizer') ? (<button onClick={(ev) => onRemove(ev, activity._id)}>Remove the event</button>) : ''}
                {(madeOfOperation === 'subscriber') ? (<button onClick={(ev) => onRemoveFromList(ev, activity, user)}>Remove from Your List</button>) : ''}
                <button onClick={(ev) => showActivityDetails(ev)}>arrow</button>)
                <section className="activity-info">
                    <div className="day-time flex">
                        <div>{`${renderDay(activity.dayInWeek)}-${activity.hour}:00`}</div>
                        <div>
                            {(madeOfOperation === 'organizer') && (
                                activity.participants.map((participant, idx) => {
                                    return (<div className="participant-info" key={idx}>
                                        <Link to={`/user/${participant._id}`}>
                                            <div className="flex">
                                                <div>{participant.fullName}</div>
                                                <img src={participant.imgUrl} alt=""/>
                                            </div>
                                        </Link>
                                    </div>)
                                }))}   
                        </div>
                    </div>

                </section>
            </div>
        </Link>
    )
}

