import React, { Component } from "react";
import { activityService } from "../services/activityService.js";
import { saveActivity } from "../store/actions/activityActions";
import { updateUser } from "../store/actions/userActions";
import { userService } from "../services/userService.js";
import { connect } from "react-redux";
// import {ChatRoom} from '../cmps/ChatRoom.jsx'

export class _ActivityDetails extends Component {
  state = {
    activity: null,
    user: {
      _id: "u106",
      fullName: "Debora faringham",
      imgUrl:
        "https://res.cloudinary.com/dygtul5wx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1600327803/sprint%204/users/74_cludfc.jpg",
    },
    creator: "",
  };

  componentDidMount() {
    this.loadActivity();
  }

  loadActivity = () => {
    console.log(this.props.match.params.activityId);
    const activityId = this.props.match.params.activityId;
    activityService.getById(activityId).then((activity) => {
      this.setState({ activity }, () =>
        this.loadCreator(activity.createdBy._id)
      );
    });
  };

  loadCreator = (id) => {
    userService.getById(id).then((creator) => {
      console.log("creator", creator);
      this.setState({ creator });
    });
  };

  purchaseActivity(activity, user, creator) {
    creator.income += activity.price;
    this.props.updateUser(creator);
    activity.participants.push(user);
    this.props.saveActivity(activity);
  }

  render() {
    const { activity, user, creator } = this.state;
    if (!activity) return <h1>Loading...</h1>;
    return (
      <div className="main-details-card">
        <h2 className="f20 title">{activity.title}</h2>
        <div className="in-line">
          <div className="green-star">★</div>
          <p>(4.93) </p>
          <p className="f20 title l-grey">{activity.subtitle}</p>
        </div>

        <div className="image-gallery">
          {activity.imgUrls.map((img, idx) => (
            <img className={`img${idx} gallery__img`} key={idx} src={img} />
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
                <img className="creator-img" src={activity.createdBy.imgUrl} />
              </div>
            </div>
            <div className="divider"></div>

            <div>
              <div className="marg-right">
                <i className="far fa-calendar-alt fa-lg"></i>
              </div>
              <p>
                {activity.dayInWeek} - {activity.hour}:00
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
            <p>Rate</p>
            <div className="tac">⭐⭐⭐⭐⭐</div>
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
              </div>
              <div className="center">
                <h2>Price: ${activity.price}</h2>
              </div>

              <button
                className="buy-btn"
                onClick={() => this.purchaseActivity(activity, user, creator)}
              >
                Sign me up!
              </button>
            </div>

            <div className="attendings">
              <h3>Attending</h3>
              {activity.participants.map((participant, idx) => (
                <img
                  className="attending-img"
                  key={idx}
                  src={participant.imgUrl}
                />
              ))}
            </div>
            <img src={require("../assets/img/map.jpg")} />
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
    // user: state.userReducer.loggedinUser;
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
