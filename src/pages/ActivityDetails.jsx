import React, { Component } from "react";
import { activityService } from "../services/activityService.js";
import { saveActivity } from "../store/actions/activityActions";
import { updateUser } from "../store/actions/userActions";
import { userService } from "../services/userService.js";
import { connect } from "react-redux";
<<<<<<< HEAD
// import {ChatRoom} from '../cmps/ChatRoom.jsx'
// import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
// import ThreeDRotation from "@material-ui/icons/ThreeDRotation";
=======
import MapContainer from "../cmps/MapContainer";

>>>>>>> 7616c52cce95f86664c07b3ff96845a2396feeb9

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


export class _ActivityDetails extends Component {
  state = {
    activity: null,
<<<<<<< HEAD
    // user: {
    //   _id: "u106",
    //   fullName: "Debora faringham",
    //   imgUrl:
    //     "https://res.cloudinary.com/dygtul5wx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1600327803/sprint%204/users/74_cludfc.jpg",
    // },
    creator: ""
=======
    user: {
      _id: "u106",
      fullName: "Debora faringham",
      imgUrl:
        "https://res.cloudinary.com/dygtul5wx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1600327803/sprint%204/users/74_cludfc.jpg",
    },
    creator: "",
    avgRate: null,
    rateType : "simple-controlled"
>>>>>>> 7616c52cce95f86664c07b3ff96845a2396feeb9
  };

  componentDidMount() {
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
    creator.income += activity.price;
    this.props.updateUser(creator);
    activity.participants.push(user);
    this.props.saveActivity(activity);
  }

  onRate = (activity, value) => {
    activityService.addRate(activity, value);
    this.setState({rateType : "read-only"})
  };

  render() {
<<<<<<< HEAD
    const { value, setHover, labels, hover } = this.state;
    const { activity,  creator } = this.state;
    console.log(activity);
    const { user} = this.props
    
    if (!activity) return <h1>Loading...</h1>;
    // activity.imgUrls.map(img=>console.log(img))
=======
    const { value } = this.state;
    const { activity, user, creator } = this.state;
    if (!activity) return <h1>Loading...</h1>;

>>>>>>> 7616c52cce95f86664c07b3ff96845a2396feeb9
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
            <img className={`img${idx} gallery__img`} key={idx} src={img} alt="image of" />
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
            
            <div className=".col-center-middle">
            <p>Rate</p>

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
            <MapContainer pos={activity.location} />
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

// AIzaSyCTwmmUbksAqfSEKLn9fR4oSVbBimBrXvk