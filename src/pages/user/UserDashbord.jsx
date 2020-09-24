import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BarChart } from '../../cmps/user/BarChart.jsx'
import { PieChart } from '../../cmps/user/PieChart.jsx'

export class UserDashbord extends Component {

    state = {
        user: null,
        activities: null
    }

    componentDidMount() {
        const { user, activities } = this.props;
        this.setState({ user, activities })
    }

    render() {
        const { user } = this.state;
        if(!user) return <div>loading</div>
        return (
            <div className="flex mt50 sb column mb50">
                <div className="flex dashbord-info fs24 column">
                    <h3>Total Sales: <span className="money">${user.income}</span></h3>
                </div>
                <div className="flex no-wrap align-center sb mb50">
                    <div className="bar m10">
                        <BarChart user={user} />
                    </div>
                    <div>
                        <PieChart user={user} />
                    </div>
                </div>
            </div>
        )
    }
}
