import React, { Component } from "react";
import { Jumbo } from "../cmps/Jumbo";
import { Suggested } from "../cmps/Suggested";

export class HomeApp extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <section>
        <Jumbo />
        <div className="sugg-container-wrap">
          <Suggested />
        </div>
      </section>
    );
  }
}
