import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
// import { activityService } from '../../services/activityService'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class _UserActivityPreview extends Component {

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
                <div onClick={(ev) => {
                    ev.stopPropagation()
                    this.props.history.push(`/activity/${activity._id}`)
                }}>

                    <div className="act-strip nav-override-color">
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
                                {(madeOfOperation === 'organizer') ? (<Link to={`/activity/edit/${activity._id}`}><i className="fas fa-user-cog nav-override-color"></i></Link>) : ''}
                                <div className="pad-10"></div>
                                {(madeOfOperation === 'organizer') ? (<button className="dash-btn" onClick={(ev) => onRemove(ev, activity._id)}><i className="far fa-trash-alt"></i></button>) : ''}
                                {(madeOfOperation === 'subscriber') ?(<Button variant="outlined" onClick={(ev) => onRemoveFromList(ev, activity, user)}>Unsubscribe</Button>) : ''}
                            </div>



                            <div className="dash-right">
                                {(madeOfOperation === 'organizer') ? (
                                <button className="dash-btn" onClick={(ev) => this.showActivityDetails(ev)}>{this.state.sign}</button>):''}
                            </div>
                        </div>

                        <div className={`${this.state.pin ? "pin-on" : "pin-off"}`}>
                            {(madeOfOperation === 'organizer') && (
                                activity.participants.map((participant, idx) => {
                                    return (
                                        <div className="participant-info cp-unique" key={idx}>
                                            <div onClick={(ev) => {
                                                ev.stopPropagation()
                                                this.props.history.push(`/user/${participant._id}`)
                                            }}>
                                                <div className="dash-attendie">
                                                    <div className="attendie-cell">
                                                        <div><img className="attending-img" src={participant.imgUrl} alt="" /></div>
                                                        <div className=".nav-override-color">{participant.fullName}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                }))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export const UserActivityPreview = withRouter(_UserActivityPreview)
