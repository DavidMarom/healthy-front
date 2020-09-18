import { NavLink, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchBox } from './activity/SearchBox.jsx'
import eventBus from '../services/event-bus-service.js'


export class Header extends Component {

    state = {
        isHomePage: false
    }

    unsubscribeHome;
    unsubscribeOutOfHome;

    componentDidMount() {
        this.unsubscribeHome = eventBus.on('homePage', () => {
            this.setState({ isHomePage: true }, console.log('im home'))
        })

        this.unsubscribeOutOfHome = eventBus.on('out of homePage', () => {
            this.setState({ isHomePage: false }, console.log('out of homePage'))
        })
    }

    componentWillUnmount() {
        this.unsubscribeHome()
        this.unsubscribeOutOfHome()
    }

    render() {
        const { isHomePage } = this.state
        return <header className="main-header">
            <div className="logo">
                <NavLink to="/">Home</NavLink>
            </div>
            <div>
                <NavLink to="/activity">Explore</NavLink>
            </div>
            {!isHomePage && <SearchBox />}

            <div>
                <NavLink to={`/user`}>UserProfile</NavLink>
            </div>
        </header>
    }
}








// export function Header(props) {

//     return <header className="main-header">
//         <div className="logo">
//             <NavLink to="/">Home</NavLink>
//         </div>
//         <div>
//             <NavLink to="/activity">Explore</NavLink>
//         </div>
//       <SearchBox />

//         <div>
//             <NavLink to={`/user`}>UserProfile</NavLink>
//         </div>
//     </header>
// }

// {  window.location.href != 'http://localhost:3000/#/'&& <SearchBox />}