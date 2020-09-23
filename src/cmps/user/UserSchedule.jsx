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
      var hour = Math.floor(activity.hour / 2);
      table[activity.dayInWeek - 1][hour] = activity.title;
    })
  }
  return (
    <table className="timetable fs14">
      {/* <thead>
        <tr className="titleWrapper">
          <th></th>
          <th>S</th>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
        </tr>
      </thead> */}
      {/* <tbody className="timeWrapper">
        <tr><td>00-02</td></tr>
        <tr><td>02-04</td></tr>
        <tr><td>04-06</td></tr>
        <tr><td>06-08</td></tr>
        <tr><td>08-10</td></tr>
        <tr><td>10-12</td></tr>
        <tr><td>12-14</td></tr>
        <tr><td>14-16</td></tr>
        <tr><td>16-18</td></tr>
        <tr><td>18-20</td></tr>
        <tr><td>20-22</td></tr>
        <tr><td>22-24</td></tr>
      </tbody> */}
      {table.map((arr, idx) =>
        <tbody
          key={idx}>
          <tr key={idx}
            className="main-info-table">
            {arr.map((title, idx) => <td key={idx} className={(title) ? "yellow" : "white"}>{'' || ''}</td>)}</tr></tbody>)}
    </table>
  )
}
