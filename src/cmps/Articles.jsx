import React, { Component } from "react";
import { connect } from "react-redux";
import { loadActivities } from "../store/actions/activityActions";
import { ActivityApp } from '../pages/ActivityApp';

import { Switch, Route, NavLink } from 'react-router-dom';
// import routes from './routes.js'

class _Articles extends Component {
  state = {
    activities: null,
  };

  componentDidMount() {
    this.props.loadActivities();
  }

  setFilterBy = (e) => {

  }

  render() {
    return (

      <section>
        <Switch>
          <Route exact component={ActivityApp} path='/activity/:filterBy?' />
        </Switch>

        {/* <NavLink to="/activity/?title=yoga">aaaaaaaa</NavLink> */}

        <div className="articles-row" >
          {/* <NavLink to="/activity/?title=sport"> */}

            <div className="article_a" >
              <h2>Sport</h2>
            </div>
          
          {/* </NavLink> */}

          <div className="article_b">
            <h2>Body {`&`} Mind</h2>
          </div>
        </div>

        <div className="articles-row">
          <div className="article_c">
            <h2>Nutrition</h2>
          </div>
          <div className="article_d">
            <h2>Free!</h2>
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
