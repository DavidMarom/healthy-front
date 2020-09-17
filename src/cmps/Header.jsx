import { NavLink, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export function Header(props) {
   
    return <header>
        <NavLink to="/">Home</NavLink>|
        <NavLink to="/activity">MAINPAGE</NavLink>|
    </header>
}
