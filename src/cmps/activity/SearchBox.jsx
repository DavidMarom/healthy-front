
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSearchBy } from '../../store/actions/activityActions'

export class _SearchBox extends Component {
    state = {
        title: ''
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value }, () => {
            this.props.setSearchBy(this.state)
            console.log(this.state);
        })
    }

    render() {
        return (
            <div className="main-search">
                <input className="search-input" name="title" type="text" value={this.state.name} onChange={this.handleChange} />
                <div className="search-btn">
                    <i className="fas fa-search"></i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {
    setSearchBy
}
export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(_SearchBox)