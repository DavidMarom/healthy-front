import React, { Component } from 'react'

export class ActivityFilter extends Component {

    state = {
        tags: [],
        maxPrice: '',
        proffesion:'',
        location:'',
        provider:''
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value }, () => this.props.onSetFilter(this.state))
    }
    

    render() {
        return (
            <form onSubmit={(ev) => ev.preventDefault()}>
             
            </form>
        )
    }

}