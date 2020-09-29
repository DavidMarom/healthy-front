import React, { Component } from 'react'

export class ActivityFilter extends Component {
 
    setFilterBy = (e) => {
        const filterBy = e.target.value
        this.props.onSetFilter(filterBy)
    }

    sortByDays = (e) => {
        const dayAsNum = parseInt(e.target.value)
        this.props.dummySortByDays(dayAsNum)
    }

    render() {
        return (
            < div className="filter-bar" >
                <button className="chat-button pad-r-10 f-20" value='Highest Rated' onClick={(e) => this.setFilterBy(e, 'value')}>Popular</button>
                <button className="chat-button pad-r-10 f-20" value='Sports' onClick={(e) => this.setFilterBy(e, 'value')}>Sports</button>
                <button className="chat-button pad-r-10 f-20" value='Yoga' onClick={(e) => this.setFilterBy(e, 'value')}>Yoga</button>
                <button className="chat-button pad-r-10 f-20" value='Nutrition' onClick={(e) => this.setFilterBy(e, 'value')}>Nutrition</button>
                <button className="chat-button pad-r-10 f-20" value='Advanced' onClick={(e) => this.setFilterBy(e, 'value')}>Advanced</button>
                <button className="chat-button pad-r-10 f-20" value='Begieners' onClick={(e) => this.setFilterBy(e, 'value')}>Beginners</button>
                {/* <button className="chat-button pad-r-10 f-20" value='WellBeing' onClick={(e) => this.setFilterBy(e, 'value')}>Well Being</button> */}
                <button className="chat-button pad-r-10 f-20" value='mindfullness' onClick={(e) => this.setFilterBy(e, 'value')}>Mindfullness</button>
                <button className="chat-button pad-r-40 f-20" value='TelAviv' onClick={(e) => this.setFilterBy(e, 'value')}>Tel Aviv</button>
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
                <button className="chat-button pad-l-40 f-20 d-grey" value='' onClick={(e) => this.setFilterBy(e, 'value')}>Clear</button>
            </div >
        )
    }

}