import React, { Component } from "react";
import { activityService } from "../services/activityService.js";
import { saveActivity } from "../store/actions/activityActions";
import { updateUser } from "../store/actions/userActions";
import { userService } from "../services/userService.js";
import { connect } from "react-redux";
import { Reviews } from "../cmps/Reviews";
import { Chat } from "../cmps/Chat";

import SimpleMap from "../cmps/Map";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export class _ActivityDetails extends Component {

  state = {
    activity: null,
    user: userService.guestMode(),
    creator: "",
    avgRate: null,
    rateType: "simple-controlled"
  };

  componentDidMount() {

    let userBeforeChange = this.props.user;
    // before we have backend!
    if (userBeforeChange) {
      let user = {
        _id: userBeforeChange._id,
        fullName: userBeforeChange.fullName,
        imgUrl: userBeforeChange.imgUrl,
      };
      this.setState({ user });
    }
    this.loadActivity();
  }

  calcAvgRate = () => {
    let tempSum = 0;
    const arr = this.state.activity.rate;
    arr.map((rateValue) => (tempSum += rateValue));
    const tempAvg = tempSum / arr.length;
    this.setState({ avgRate: tempAvg });
  };

  loadActivity = () => {
    const activityId = this.props.match.params.activityId;

    activityService.getById(activityId).then((activity) => {
      this.setState({ activity }, () => {
        this.loadCreator(activity.createdBy._id);
        this.calcAvgRate();

      });
    });
  };

  loadCreator = (id) => {
    userService.getById(id).then((creator) => {
      this.setState({ creator });
    });
  };

  purchaseActivity(activity, user, creator) {
    if (user.id === 'guest') return
    if (creator.id === user.id) return
    creator.income += activity.price;
    this.props.updateUser(creator);
    activity.participants.push(user);
    this.props.saveActivity(activity);
  }

  renderDay(value) {
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

  onRate = (activity, value) => {
    activityService.addRate(activity, value);
    this.setState({ rateType: "read-only" });
  };

  render() {
    const { value } = this.state;
    const { activity, user, creator } = this.state;

    if (!activity) return <h2 className="center marg-top-50">Loading...</h2>;
    return (
      <div className="main-details-card">
        <h2 className="f20 title">{activity.title}</h2>
        <div className="in-line">
          <div className="green-star">★</div>
          <p>({(Math.round(this.state.avgRate * 100) / 100).toFixed(2)}) </p>

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
                {this.renderDay(activity.dayInWeek)} - {activity.hour}:00
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

            <div className=".event-buy">
              <div className="center">
                <p>Rate this event:</p>
              </div>
              <div className="center">
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend"></Typography>
                  <Rating
                    name={this.state.rateType}
                    value={value}
                    onChange={(event, newValue) => {
                      this.onRate(activity, newValue);
                    }}
                  />
                </Box>
              </div>

              {/* <div className="divider d-hi"></div> */}

              <Reviews activity={activity} user={this.state.user} />

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="event-right-side">
            <div className="event-buy">
              <div className="just-row">
                <div className="moneyback">
                  <i className="fas fa-money-bill-wave"></i>
                  <p>Money back guarentied</p>
                </div>
                {(Math.round(this.state.avgRate * 100) / 100).toFixed(2)}
                <div className="green-star">★</div>
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
                  onClick={() => this.purchaseActivity(activity, user, creator)}>
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
              <Chat topic={activity._id} />

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
    activities: state.activityReducer.activities,
    user: state.userReducer.loggedInUser,
  };
};
const mapDispatchToProps = {
  saveActivity,
  updateUser,
};

export const ActivityDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ActivityDetails);
