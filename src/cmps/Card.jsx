import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Card extends Component {
  state = {
    activity: null,
    user: null,
    creator: "",
  };

  calcAvgRate = (arr) => {
    let tempSum = 0;
    arr.map((rateValue) => (tempSum += rateValue));
    const tempAvg = tempSum / arr.length;
    return tempAvg;
  };

  render() {
    const { activity } = this.props;
    if (!activity) return <div>Loading....</div>;

    const avg = this.calcAvgRate(this.props.rate);

    return (
      <section>
        <Link to={`activity/${activity._id}`}>
          <div className="card">
            <div className="card-img">
              <img className="img-fit" src={activity.imgUrls[0]} alt="" />
            </div>
            <div className="card-text">
              <div className="rate-display">
                <div className="green-star">★ </div>                
                {(Math.round(avg * 100) / 100).toFixed(2)}
                {` (`}{activity.rate.length}{`)`}
              </div>
              <div>
                <div className="green">{activity.title}</div>{` - `}
                {activity.subtitle}
              </div>
              <div className="bold">
              $ {activity.price}
              </div>
            </div>
          </div>
        </Link>
      </section>
    );
  }
}
