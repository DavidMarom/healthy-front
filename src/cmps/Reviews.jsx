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

  addReview = (ev) => {
    ev.preventDefault();
    var newActivity = this.state.activity;
    const tmpReview={
      "id": Date.now(),
      "txt": this.state.txt,
      "rate": 5,
      "by": this.props.user
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
            <div key={idx} className="text-mid-left">
              <img src={review.by.imgUrl} className="attending-img marg-5" alt="" />
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
