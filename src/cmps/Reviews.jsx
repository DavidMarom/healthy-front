import React, { Component } from "react";
import {activityService} from "../services/activityService"

export class Reviews extends Component {
  state = {
    activity: null,
    txt: "",
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

  addReview = () => {
    var newActivity = this.state.activity;
    const tmpReview={
      "id": Date.now(),
      "txt": this.state.txt,
      "rate": 5,
      "by": {
        "_id": "u102",
        "fullName": "Kuki Levana",
        "imgUrl": "https://res.cloudinary.com/dygtul5wx/image/upload/ar_1:1,b_rgb:262c35,bo_5px_solid_rgb:000000,c_fill,g_auto,r_max,w_1000/v1600326115/sprint%204/users/koki_sjy2n7.jpg"
      }
    }
    this.setState({txt:''})
    this.setState({activity:newActivity})
    newActivity.reviews.push(tmpReview);
    activityService.update(newActivity);
  }

  render() {
    if (!this.state.activity) return <h2>Loading..</h2>;
    const { reviews } = this.state.activity;
    return (
      <section>
        <h2> Reviews</h2>
        {reviews.map((review, idx) => {
          return (
            <div key={idx} className="text-mid">
              <img src={review.by.imgUrl} className="attending-img marg-5" />
              {review.txt}
            </div>
          );
        })}
        <div className="d-hi"></div>
        <h3>Add your own review:</h3>

        <form onSubmit={this.addReview}>
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
      </section>
    );
  }
}
