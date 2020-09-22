import React, { Component } from "react";
import { connect } from "react-redux";
import { loadActivities } from "../store/actions/activityActions";

class _Articles extends Component {
  state = {
    activities: null,
  };

  componentDidMount() {
    this.props.loadActivities();
  }

  render() {
    return (
      <section>
        <div className="articles-row">
          <div className="article_a">
            <h2>Hot!</h2>
          </div>
          <div className="article_b">
            <h2>October</h2>
          </div>
        </div>
        <div className="articles-row">
          <div className="article_c">
            <h2>Article: sport in the modern age</h2>
          </div>
          <div className="article_a">
            <h2>New</h2>
          </div>
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

export const Articles = connect(mapStateToProps, mapDispatchToProps)(_Articles);
