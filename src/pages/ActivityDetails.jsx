import React, { Component } from 'react'
import { activityService } from '../services/activityService.js'
import {saveActivity} from "../store/actions/activityActions"
import { connect } from 'react-redux'
// import {ChatRoom} from '../cmps/ChatRoom.jsx'

export class _ActivityDetails extends Component {


    state = {
        activity: null,
        user: {
            _id: 'u102',
            fullName: 'Kuki Levana',
            imgUrl:'https://res.cloudinary.com/dygtul5wx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1600326115/sprint%204/users/koki_sjy2n7.jpg'
        }
    }

    componentDidMount() {
        this.loadActivity();
    }

    loadActivity() {
        console.log(this.props.match.params.activityId);
        const activityId = this.props.match.params.activityId;
        activityService.getById(activityId)
            .then(activity => {
                this.setState({ activity })
            })
    }

    purchaseActivity(activity, user){
        console.log(user);
        console.log(activity);
        activity.participants.push(user);
        this.props.saveActivity(activity);
    }


    render() {
        const { activity, user } = this.state;
        if (!activity) return <h1>Loading...</h1>
        return (
            <div className="main-details-card">
                <h2 className="f20 title">{activity.title}</h2>
                <div className="image-gallery">
                    {activity.imgUrls.map((img, idx) => <img className={`img${idx}`} key={idx} src={img} />)}
                </div>
                <div className="main-info-container flex sb">
                    <div className="main-info-card flex column">
                        <h3 className="det-name f28 fw6">{activity.createdBy.fullName}</h3>
                        <h5>{activity.location.address}</h5>
                        <p className="fs18 fw4 clr6">{activity.description}</p>
                    </div>
                    <div className="right-payment-area flex column sa">
                        <div className="payment-det">
                            <h4>Price: ${activity.price}</h4>
                            <button onClick={()=>this.purchaseActivity(activity,user)}>Buy this ITEM!</button>
                        </div>
                        <div className="attendings">
                            <h3>Attending</h3>
                            {activity.participants.map((participant, idx) => <img className="attending-img"key={idx} src={participant.imgUrl} />)}
                        </div>
                    </div>
                </div>
                <div className="lower-info-area flex">
                    <div className="flex column sa prefs">
                        <h2>properties</h2>
                        <div className="flex sa wrap">
                            {activity.tags.map((tag, idx) => <li key={idx}>{tag}</li>)}
                        </div>
                        <div className="tac">⭐⭐⭐⭐⭐</div>
                        {/* <div className="rev-det">Reviews
                        {activity.reviews.map((review, idx)=> {
                        <ul key={idx}>
                            <li>{review}</li>
                        </ul>})
    }
                        </div> */}
                    </div>
                    <div className="fitchers-info flex column">
                        <div className="box-area">CHAT AREA</div>
                        <div >MAP AREA</div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        activities: state.activityReducer.activities,
        // user: state.userReducer.loggedinUser;
    }
}
const mapDispatchToProps = {
    saveActivity
}

export const ActivityDetails = connect(mapStateToProps, mapDispatchToProps)(_ActivityDetails)