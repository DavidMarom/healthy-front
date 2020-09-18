import React, { Component } from "react";
import { SearchBox } from '../cmps/activity/SearchBox.jsx'


export function Jumbo(props) {
  return (
    <section>
      <div className="jumbo">
        <SearchBox cssClass={'jumbo-search'}/>
        <div className="v-space"></div>
        <div className="slogan">
          <h2>Live Healthy</h2>
          <h4>Health is a behaviour.</h4>
          <h4>Find out how.</h4>

        </div>
      </div>
    </section>
  );
}



