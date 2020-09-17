import React, { Component } from "react";
import { connect } from "react-redux";
import { loadActivities } from "../store/actions/activityActions";

import { Card } from "../cmps/Card";

class _Suggested extends Component {
  state = {
    activities: null,
  };

  componentDidMount() {
    this.props.loadActivities();
  }

  render() {
    const { activities } = this.props;
    if (!activities) return <div>Loading....</div>;

    return (
      <section>
        <h3>Suggested for you:</h3>
        <p>Find lectures, trainers and suppliers around you</p>

        <div className="card-row">
          {activities.map((activity) => (
            <Card activity={activity} key={activity._id} />
          ))}
          

          
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.activityReducer.activities,
  };
};

const mapDispatchToProps = {
  loadActivities,
};

export const Suggested = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Suggested);

// return (
//   <section>
//     {activities.map((aaa) => console.log(aaa.imgUrls[0]))}
//     <div className="sugg-container">
//       <Card img={'./aaa.jpg'} />
//     </div>
//   </section>
// );
