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


  render() {
    return (

      <section>
        <Switch>
          <Route exact component={ActivityApp} path='/activity/:filterBy?' />
        </Switch>

        <div className="articles-row" >

          <NavLink to="/activity?tag=sport" className="article_a" >
            <div>
              <h2>Sport</h2>
            </div>
          </NavLink>

          <NavLink to="/activity?tag=yoga" className="article_b" >
            <div>
              <h2>Body {`&`} Mind</h2>
            </div>
          </NavLink>

        </div>

        <div className="articles-row">

          <NavLink to="/activity?tag=nutrition" className="article_c">
            <div >
              <h2>Nutrition</h2>
            </div>
          </NavLink>

          <NavLink to="/activity?tag=outdoor" className="article_d">
            <div>
              <h2>Outdoor</h2>
            </div>
            </NavLink>

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
