import React, { Component } from 'react'

export class ActivityFilter extends Component {

    state = {  
    }

    setFilterBy=(e)=>{
      const filterBy=e.target.value
      this.props.dummySetFilter(filterBy) 
    }
    
    render() {
        return (
            <div className="filter-btns">
                <button className="filter-btn" value='Highest Rated' onClick={(e)=>this.setFilterBy(e,'value')}>Highest Rated</button>  
                <button className="filter-btn" value='Sports' onClick={(e)=>this.setFilterBy(e,'value')}>Sports</button>  
                <button className="filter-btn" value='Yoga' onClick={(e)=>this.setFilterBy(e,'value')}>Yoga</button>
                <button className="filter-btn" value='Nutrition' onClick={(e)=>this.setFilterBy(e,'value')}>Nutrition</button>
                <button className="filter-btn" value='Tel Aviv' onClick={(e)=>this.setFilterBy(e,'value')}>Tel Aviv</button>
                <button className="filter-btn" value='' onClick={(e)=>this.setFilterBy(e,'value')}>Clear Results</button>
            </div>
        )
    }

}