import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Card extends Component {
  state = {
    activity: null,
    user: null,
    creator: "",
  };

  calcAvgRate = (arr) => {
    let sum = 0;
    arr.map((rateValue) => (sum += rateValue));
    const avg = sum / arr.length;
    return (Math.round(avg * 100) / 100).toFixed(2);
  };

  render() {
    const { activity } = this.props;
    if (!activity) return <div>Loading....</div>;

    const avg = this.calcAvgRate(this.props.rate);

    return (
      <section className="card-section">
        <div className="card">

          <Link to={`activity/${activity._id}`}>
            <div className="card-img">
              <img className="img-fit" src={activity.imgUrls[0]} alt="" />
            </div>

            <div className="card-text ">
              <div className="card-text-row">
                <div className="rate-display">
                  <div><div className="green-star">★ </div>{avg}{` (`}{activity.rate.length}{`)`}</div>
                </div>
                <div>{activity.participants.length}{'/'}{activity.maxCapacity}</div>
              </div>
              <div className="flex column">
                <div className="green">{activity.title}</div>
                <div>{activity.subtitle}</div>
                <div className="add-20"></div>
              </div>

              <div className="card-text-row">
                <div className="card-text-row">
                  <img className="attending-img inline" src={activity.createdBy.imgUrl} alt="" />
                  <div className="fw6">{activity.createdBy.fullName}</div>
                </div>

                <div className="bold">$ {activity.price}</div>


              </div>
            </div>
          </Link>

        </div>
      </section>
    );
  }
}
