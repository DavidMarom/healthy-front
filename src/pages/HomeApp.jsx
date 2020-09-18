import React, { Component } from "react"
import { connect } from 'react-redux'

import { Jumbo } from "../cmps/Jumbo"
import { Suggested } from "../cmps/Suggested"
import eventBus from '../services/event-bus-service.js'
import { setSearchBy } from '../store/actions/activityActions.js'

export class _HomeApp extends Component {


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


const mapStateToProps = state => {
  return {
      searchBy: state.activityReducer.searchBy
  }
}

const mapDispatchToProps = {
  setSearchBy
}
export const HomeApp = connect(mapStateToProps, mapDispatchToProps)(_HomeApp)
