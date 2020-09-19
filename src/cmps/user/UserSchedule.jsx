// import { getByTitle } from '@testing-library/react'
import React from 'react'


export function UserSchedule({ activities }) {

  let table = []
  for (var i = 0; i < 7; i++) {
    table.push([]);
    for (var j = 0; j < 11; j++) {
      table[i].push('')
    }
  }
  if (activities) {
    activities.forEach(activity => {
      var hour = (activity.hour > 12) ? (activity.hour / 2) - 1 : activity.hour - 1;
      table[activity.dayInWeek - 1][hour] = activity.title;
    })
  }
  return (
    <table className="timetable fs14">
      <thead>
        <tr className="titleWrapper">
          <th>Time</th>
          <th>SUN</th>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
          <th>THE</th>
          <th>FRI</th>
          <th>SAT</th>
        </tr>
      </thead>
      <tbody className="timeWrapper">
        <tr>
        <td>0-2</td>
        <td>2-4</td>
        <td>4-6</td>
        <td>6-8</td>
        <td>8-10</td>
        <td>10-12</td>
        <td>12-14</td>
        <td>14-16</td>
        <td>16-18</td>
        <td>18-20</td>
        <td>20-22</td>
        <td>22-24</td>
      </tr>
      </tbody>
      {table.map((arr, idx) => <tbody key={idx}><tr key={idx} className="main-info-table">{arr.map((title, idx) => <td key={idx} className={(title) ? "yellow" : "whtie"}>{title.charAt(0) || ''}</td>)}</tr></tbody>)}
    </table>
  )
}
