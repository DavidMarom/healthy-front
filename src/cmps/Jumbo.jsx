import React from "react";
import { SearchBox } from '../cmps/activity/SearchBox.jsx'


export function Jumbo(props) {
  return (
    <section>
      <div className="jumbo">
        <div className="v-space"></div>
        <div className="slogan">
          {/* <h2>Live Healthy</h2> */}
          <div className="ff1">Health is a behaviour.</div>
          <div className="ff1">Find out how.</div>
        </div>
        <SearchBox cssClass={'jumbo-search'}/>
      </div>
    </section>
  );
}
