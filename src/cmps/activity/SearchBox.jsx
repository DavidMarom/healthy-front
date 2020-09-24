
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setSearchBy } from '../../store/actions/activityActions'


export class _SearchBox extends Component {
    state = {
        searchBy: {
            title: ''
        },
    }
    
   
    componentDidMount() {
        console.log(this.props.location.search);
     const searchBy = new URLSearchParams(this.props.location.search).get('searchBy') || ''
     this.setState({ searchBy:{title:searchBy} }, () => this.props.setSearchBy(this.state.searchBy))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ searchBy: { ...this.state.searchBy, [field]: value } }, () => {
            this.props.setSearchBy(this.state.searchBy)
        })
    }

    onClickSearchButton = () => {
        const searchBy=this.state.searchBy.title
        this.props.history.push(`/activity?searchBy=${searchBy}`)
    }

    render() {
        const cssClass = this.props.cssClass
        return (
            <div className={cssClass}>
                <input className="search-input" autoComplete= "off" name="title" type="text" value={this.state.searchBy.title} onChange={this.handleChange} 
                placeholder="Find Activity that you like" />
                <div className="search-btn" onClick={this.onClickSearchButton}>
                    <i className="fas fa-search"></i>
                </div>
            </div>
        )
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
export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SearchBox))