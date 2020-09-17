import { NavLink, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export function Header(props) {
   console.log('props-', props)
    return <header>
        <NavLink to="/">Home</NavLink>|
        <NavLink to="/activity">Explore</NavLink>|
        <NavLink to={`/user`}>UserProfile</NavLink>
    </header>
}
