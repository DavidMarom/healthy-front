import { NavLink, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchBox } from './activity/SearchBox.jsx'


export class Header extends Component {
   
    state={
        isHomePage:false
    }

    componentDidMount() {
    //    const currUrl=window.location.href
    //    if(currUrl== 'http://localhost:3000/#/'){
    //        this.setState({isHomePage: true})
    //    }

    //    if(!this.props.match){
    //     this.setState({isHomePage: true})
    //    }
       
    }
    

    render(){
       const {isHomePage}=this.state
        return <header className="main-header">
        <div className="logo">
            <NavLink to="/">Home</NavLink>
        </div>
        <div>
            <NavLink to="/activity">Explore</NavLink>
        </div>
     { !isHomePage && <SearchBox /> }
        
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