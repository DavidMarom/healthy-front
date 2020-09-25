import React, { Component } from "react";
import { activityService} from "../services/activityService"
import { saveActivity } from '../store/actions/activityActions.js'
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { TheatersRounded } from "@material-ui/icons";

export class Reviews extends Component {
  state = {
    activity: null,
    txt: "",
    rateType: "simple-controlled",
    rateAddByUser: null
  }

  componentDidMount() {
    this.setState({ activity: this.props.activity });
  }

  updateField = (ev) => {
    this.setState({ txt: ev.target.value });
  }

  keyPressed = (ev) => {
    if ((this.state.txt !== '') && (ev.keyCode === 13)) this.addReview();
  }

  onRate = (activity, rate) => {
    activityService.addRate(activity, rate);
    this.setState({ rateType: "read-only", rateAddByUser: rate });
  };

  // addReview = (ev) => {
  //   ev.preventDefault();
  //   var newActivity = this.state.activity;
  //   const tmpReview = {
  //     "id": Date.now(),
  //     "txt": this.state.txt,
  //     "rate": (this.state.rateAddByUser || 5),
  //     "by": this.props.user
  //   }
  //   this.setState({ txt: '' })
  //   this.setState({ activity: newActivity })
  //   newActivity.reviews.push(tmpReview);
  //   // activityService.update(newActivity);
  //   this.props.saveActivity(activity);
  // }

  render() {
    if (!this.state.activity) return <h2>Loading..</h2>;
    const { reviews } = this.state.activity;
    return (
      <section className="review-container">
        <h2> Reviews</h2>
        <div className="review-add">
          <div className="flex review-rate">
            <p className="p-rate">Rate {'&'}review:</p>
            
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend"></Typography>
                <Rating 
                  name={this.state.rateType}
                  value={this.state.rateAddByUser || 5}
                  onChange={(event, newValue) => {
                    this.onRate(this.props.activity, newValue);
                  }}
                />
              </Box>
           
          </div>
          <form onSubmit={()=>this.props.addReview()}>
            <input
              className="review-input"
              value={this.state.txt}
              onKeyUp={this.keyPressed}
              onChange={this.updateField}
            ></input>
            <button className="chat-button">
              <i className="far fa-paper-plane fa-2x"></i>
            </button>
          </form>
        </div>

        {/* <div className="mb50"></div> */}

        {reviews.map((review, idx) => {
          return (
            <div key={idx}>
              <div key={idx} className="text-mid-left">
                <img src={review.by.imgUrl} className="attending-img marg-5" alt="" />
                <span className="MuiRating-root">{'★'}</span>{review.rate}
              </div>
              <div className="rev-txt">
                {review.txt}
              </div>
            </div>
          );
        })}

      </section>
    );
  }
}
