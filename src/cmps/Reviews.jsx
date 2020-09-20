import React, { Component } from "react";

export class Reviews extends Component {
  state = {
    activity: null,
  };

  componentDidMount() {
    this.setState({ activity: this.props.activity });
  }

  render() {
    if (!this.state.activity) return <h1>LOADING</h1>;
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
        <input className="review-input"></input>
      </section>
    );
  }
}
