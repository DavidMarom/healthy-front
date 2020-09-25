import React, { Component } from "react";
import { activityService } from "../services/activityService.js";
import { saveActivity, loadActivity } from "../store/actions/activityActions";
import { updateUser } from "../store/actions/userActions";
import { userService } from "../services/userService.js";
import { connect } from "react-redux";
import { Reviews } from "../cmps/Reviews";
import { Chat } from "../cmps/Chat";

import SimpleMap from "../cmps/Map";




import { TheatersRounded } from "@material-ui/icons";

export class _ActivityDetails extends Component {

  state = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    user: userService.guestMode(),
    rateAddByUser: null
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    let user = this.props.user;
    if (user) {
      user = {
        _id: user._id,
        fullName: user.fullName,
        imgUrl: user.imgUrl,
      };
      this.setState({ user });
    }
    this.loadActivity();
  }

  loadActivity = () => {
    const activityId = this.props.match.params.activityId;
    if (activityId) this.props.loadActivity(activityId);
  }

  addReview = (txt) => {
    var newActivity = this.props.activity;
    const tmpReview = {
      "id": Date.now(),
      "txt": txt,
      "rate": (this.state.rateAddByUser || 5),
      "by": this.props.user
    }
    this.setState({ txt: '' })
    this.setState({ activity: newActivity })
    newActivity.reviews.push(tmpReview);
    this.props.saveActivity(newActivity);
  }

  onRate = (rate) => {
    this.setState({ rateType: "read-only", rateAddByUser: rate });
  };

  calcAvgRate = () => {
    let tempSum = 0;
    const rates = this.props.activity.reviews.map(review => review.rate);
    tempSum = rates.reduce(function (acc, val) {
      return acc + val
    }, 0);
    return ((Math.round((tempSum / rates.length) * 100) / 100).toFixed(2));
  }


  purchaseActivity() {
    let { activity, user } = this.props;
    let creator = activity.createdBy;
    if (creator._id !== user._id) {
      creator.income += activity.price;
      this.props.updateUser(creator);
      activity.participants.push(user);
      this.props.saveActivity(activity);
    }
  }



  render() {
    const { activity, user } = this.props;
    if (!activity) return<div className="loader"><img src={'https://res.cloudinary.com/dygtul5wx/image/upload/v1601042370/sprint%204/users/75_2_cf1ozr.gif'}/></div>
    let rate = this.calcAvgRate();
    rate = parseFloat(rate);
    return (
      <div className="main-details-card">
        <h2 className="f20 title">{activity.title}</h2>
        <div className="in-line">
          <div className="green-star">★</div>
          <p>{rate} </p>

          <p className="f20 title l-grey">{activity.subtitle}</p>
        </div>

        <div className="image-gallery">
          {activity.imgUrls.map((img, idx) => (
            <img
              className={`img${idx} gallery__img`}
              key={idx}
              src={img}
              alt=""
            />
          ))}
        </div>
        <div className="event-main-container">
          {/* LEFT SIDE */}
          <div className="event-left-side">
            <div className="event-creator-container">
              <div>
                <h2>{activity.createdBy.fullName}</h2>
                <h4>
                  <div className="l-grey">{activity.createdBy.title}</div>
                </h4>
              </div>

              <div>
                <img
                  alt=""
                  className="creator-img"
                  src={activity.createdBy.imgUrl}
                />
              </div>
            </div>
            <div className="divider"></div>

            <div>
              <div className="marg-right">
                <i className="far fa-calendar-alt fa-lg"></i>
              </div>
              <p>
                {this.state.days[activity.dayInWeek]} - {activity.hour}:00
              </p>
              <h5>{activity.location.address}</h5>
            </div>
            <div className="text-box">
              <p>{activity.description}</p>
            </div>

            <div className="divider d-hi"></div>

            <div className="just-row">
              <h2>Properties</h2>
              {activity.tags.map((tag, idx) => (
                <li key={idx}>{tag}</li>
              ))}
            </div>
            <div className="divider d-hi"></div>

            {(activity._id === this.props.match.params.activityId) ? (
              <div className=".event-buy">
                <Reviews activity={activity}
                  rate={rate}
                  addReview={this.addReview}
                  onRate={this.onRate}
                  rateAddByUser={this.state.rateAddByUser} />
              </div>
            ) : ''}
          </div>


          {/* RIGHT SIDE */}
          <div className="event-right-side">
            <div className="event-buy">
              <div className="just-row">
                <div className="moneyback">
                  <i className="fas fa-money-bill-wave"></i>
                  <p>Money back guarentied</p>
                </div>
                <div className="green-star">★</div>
                {rate}
              </div>
              <div className="center">
                <h2>Price: ${activity.price}</h2>
              </div>
              {(user._id === 'guest') ?
                (<button className="buy-btn"
                  onClick={() => this.props.history.push('/signUp')}>
                  Join Us NOW!
                </button>) : ''}

              {(activity.participants.length < activity.maxCapacity) ?
                (<button className="buy-btn"
                  onClick={() => this.purchaseActivity()}>
                  Sign me up!
                </button>) :
                (<button className="sold-out-btn">SOLD OUT!</button>)}
            </div>
            <div className="attendings">
              <h3>Attending</h3>
              {activity.participants.map((participant, idx) => (
                <img
                  alt=""
                  className="attending-img"
                  key={idx}
                  src={participant.imgUrl}
                />
              ))}
            </div>
            <div className="map-container">
              <SimpleMap center={activity.location} />
            </div>
            <div className="divider"></div>
            <div className="chat-container">
              <Chat topic={activity._id} name={user.fullName} />

            </div>
          </div>
          {/* END OF RIGHT SIDE */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activity: state.activityReducer.currActivity,
    user: state.userReducer.loggedInUser,
  };
};
const mapDispatchToProps = {
  saveActivity,
  updateUser,
  loadActivity
};

export const ActivityDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ActivityDetails);
