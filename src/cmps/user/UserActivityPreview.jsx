import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { activityService } from '../../services/activityService'

export class UserActivityPreview extends Component {

    state = {
        pin: false,
        sign: '+'
    }

    componentDidMount() {
        let { activity, user, madeOfOperation, onRemove, onRemoveFromList } = this.props;
        this.setState({ activity: activity })
    }

    renderDay = (value) => {
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

    showActivityDetails = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.setState({ pin: !this.state.pin })
        this.state.pin ?
            this.setState({ sign: '+' }) :
            this.setState({ sign: '-' })

    }

    render() {
        let { activity, user, madeOfOperation, onRemove, onRemoveFromList } = this.props;
        if (!activity) return <h1>loading</h1>
        return (
            <section className="bg-white">
                <Link to={`activity/${activity._id}`}>

                    <div className="act-strip">
                        <div className="act-top strip">

                            <div className="img-40"><img src={activity.imgUrls[0]} alt="" /></div>
                            <div className="flex column event-title-dash">
                                <div>{activity.title}</div>
                                <div>{activity.location.address}</div>
                            </div>


                            <div className="day-time flex column">
                                <div>{`${this.renderDay(activity.dayInWeek)}`}</div>
                                <div>{`${activity.hour}:00`}</div>
                            </div>

                            <div className="just-row">
                                {(madeOfOperation === 'organizer') ? (<Link to={`/activity/edit/${activity._id}`}><i className="fas fa-user-cog"></i></Link>) : ''}
                                <div className="pad-10"></div>
                                {(madeOfOperation === 'organizer') ? (<button className="dash-btn" onClick={(ev) => onRemove(ev, activity._id)}><i className="far fa-trash-alt"></i></button>) : ''}
                            
                                {(madeOfOperation === 'subscriber') ? (<button onClick={(ev) => onRemoveFromList(ev, activity, user)}>Remove from Your List</button>) : ''}
                            </div>

                            

                            <div className="dash-right">
                                <button className="dash-btn" onClick={(ev) => this.showActivityDetails(ev)}>{this.state.sign}</button>
                            </div>
                        </div>

                        <div className={`${this.state.pin ? "pin-on" : "pin-off"}`}>
                            {(madeOfOperation === 'organizer') && (
                                activity.participants.map((participant, idx) => {
                                    return (<div className="participant-info" key={idx}>
                                        <Link to={`/user/${participant._id}`}>
                                            <div className="dash-attendie">
                                                <div className=".nav-override-color fs-10">{participant.fullName}</div>
                                                <img className="attending-img" src={participant.imgUrl} alt="" />
                                            </div>
                                        </Link>
                                    </div>)
                                }))}
                        </div>
                    </div>
                </Link>
            </section>
        )
    }
}

