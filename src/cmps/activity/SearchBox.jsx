
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

    onClickSearchButton = () => {
        this.props.history.push('/activity')
    }


    render() {
        const cssClass = this.props.cssClass
        const isStateTitleEmpty = this.state.title == ''
        let value;
        value=isStateTitleEmpty? this.props.searchBy.title : this.state.title
        return (
            <div className={cssClass}>
                <input className="search-input" name="title" type="text" value={value} onChange={this.handleChange} />
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