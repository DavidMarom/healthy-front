import React, { Component } from 'react'

export class ActivityFilter extends Component {
    state = {
        days: [{ 1: 'Sunday' }, { 2: 'Monday' }, { 3: 'Tuesday' }, { 4: 'Wednesday' }, { 5: 'Thursday' }, { 6: 'Friday' }, { 7: 'Saturday' }],
    }

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
            < div className="filter-btns" >
                <button className="filter-btn" value='Highest Rated' onClick={(e) => this.setFilterBy(e, 'value')}>Highest Rated</button>
                <button className="filter-btn" value='Sports' onClick={(e) => this.setFilterBy(e, 'value')}>Sports</button>
                <button className="filter-btn" value='Yoga' onClick={(e) => this.setFilterBy(e, 'value')}>Yoga</button>
                <button className="filter-btn" value='Nutrition' onClick={(e) => this.setFilterBy(e, 'value')}>Nutrition</button>
                <button className="filter-btn" value='Tel Aviv' onClick={(e) => this.setFilterBy(e, 'value')}>Tel Aviv</button>
                <button className="filter-btn" value='' onClick={(e) => this.setFilterBy(e, 'value')}>Clear</button>
                <select onChange={this.sortByDays} name=''>
                    <option value="" disabled selected>By Day</option>
                    <option value='0'>All Days</option>
                    <option value='1'>Sunday</option>
                    <option value='2'>Monday</option>
                    <option value='3'>Tuesday</option>
                    <option value='4'>Wednesday</option>
                    <option value='5'>Thursday</option>
                    <option value='6'>Friday</option>
                    <option value='7'>Saturday</option>
                </select>                
            </div >
        )
    }

}