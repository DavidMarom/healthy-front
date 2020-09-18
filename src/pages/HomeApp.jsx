import React, { Component } from "react"
import { Jumbo } from "../cmps/Jumbo"
import { Suggested } from "../cmps/Suggested"
import eventBus from '../services/event-bus-service.js'

export class HomeApp extends Component {
  state = {};

  componentDidMount() {
    eventBus.emit('homePage')
  }

  componentWillUnmount() {
    eventBus.emit('out of homePage')
}

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
