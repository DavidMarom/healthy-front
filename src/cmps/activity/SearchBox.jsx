
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
<<<<<<< HEAD
=======
        const isStateTitleEmpty = this.state.title === ''
        let value;
        value=isStateTitleEmpty? this.props.searchBy.title : this.state.title
>>>>>>> 0b94e9f25bf02f481b9361472bb00741a0565e70
        return (
            <div className={cssClass}>
                <input className="search-input" name="title" type="text" value={this.state.searchBy.title} onChange={this.handleChange} />
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