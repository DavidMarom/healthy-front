import React from "react";
import { SearchBox } from '../cmps/activity/SearchBox.jsx'


export function Jumbo(props) {
  return (
    <section>
      <div className="jumbo">
        <div className="v-space"></div>
        <div className="slogan">
          <h2>Live Healthy</h2>
          <h2>Health is a behaviour.</h2>
          <h2>Find out how.</h2>
        </div>
        <SearchBox cssClass={'jumbo-search'}/>
      </div>
    </section>
  );
}
