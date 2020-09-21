import React, { Component } from 'react'

export class ActivityFilter extends Component {
    state = {
        days: [{ 1: 'Sunday' }, { 2: 'Monday' }, { 3: 'Tuesday' }, { 4: 'Wednesday' }, { 5: 'Thursday' }, { 6: 'Friday' }, { 7: 'Saturday' }],
    }

    setFilterBy = (e) => {
        const filterBy = e.target.value
        this.props.dummySetFilter(filterBy)
    }

    render() {
        const { days } = this.state
        return (
            < div className="filter-btns" >
                <button className="filter-btn" value='Highest Rated' onClick={(e) => this.setFilterBy(e, 'value')}>Highest Rated</button>
                <button className="filter-btn" value='Sports' onClick={(e) => this.setFilterBy(e, 'value')}>Sports</button>
                <button className="filter-btn" value='Yoga' onClick={(e) => this.setFilterBy(e, 'value')}>Yoga</button>
                <button className="filter-btn" value='Nutrition' onClick={(e) => this.setFilterBy(e, 'value')}>Nutrition</button>
                <button className="filter-btn" value='Tel Aviv' onClick={(e) => this.setFilterBy(e, 'value')}>Tel Aviv</button>
                <select className="filter-sel" onChange={(e) => this.setFilterBy(e)} >
                    
                    {days.map((day, idx) => <option key={idx} value={parseInt(Object.keys(day))}>{Object.values(day)}</option>)}
                </select>
                <button className="filter-btn" value='' onClick={(e) => this.setFilterBy(e, 'value')}>Clear</button>
            </div >
        )
    }

}