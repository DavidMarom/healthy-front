import React, { Component } from 'react'

export class ActivityFilter extends Component {
 
    setFilterBy = (e) => {
        const filterBy = e.target.value
        this.props.dummySetFilter(filterBy)
    }

    sortByDays = (e) => {
        const dayAsNum = parseInt(e.target.value)
        this.props.dummySortByDays(dayAsNum)
    }

    render() {
        return (
            < div className="filter-bar" >
                <button className="chat-button pad-r-10 f-20" value='Highest Rated' onClick={(e) => this.setFilterBy(e, 'value')}>Highest Rated</button>
                <button className="chat-button pad-r-10 f-20" value='Sports' onClick={(e) => this.setFilterBy(e, 'value')}>Sports</button>
                <button className="chat-button pad-r-10 f-20" value='Yoga' onClick={(e) => this.setFilterBy(e, 'value')}>Yoga</button>
                <button className="chat-button pad-r-10 f-20" value='Nutrition' onClick={(e) => this.setFilterBy(e, 'value')}>Nutrition</button>
                <button className="chat-button pad-r-40 f-20" value='Tel Aviv' onClick={(e) => this.setFilterBy(e, 'value')}>Tel Aviv</button>
                <select className="drop-down f-20" onChange={this.sortByDays}>
                    {/* <option value='' disabled selected>By Day</option> */}
                    <option value='0'>All Days</option>
                    <option value='1'>Sunday</option>
                    <option value='2'>Monday</option>
                    <option value='3'>Tuesday</option>
                    <option value='4'>Wednesday</option>
                    <option value='5'>Thursday</option>
                    <option value='6'>Friday</option>
                    <option value='7'>Saturday</option>
                </select>
                <button className="chat-button pad-l-80 f-20" value='' onClick={(e) => this.setFilterBy(e, 'value')}>Clear</button>
            </div >
        )
    }

}