import { getByTitle } from '@testing-library/react'
import React from 'react'


export function UserSchedule({ activities }) {

    return (
     <div class="timetable fs14">
       <ul className="titleWrapper">
         <li>Time</li>
         <li>MON</li>
         <li>TUE</li>
         <li>WED</li>
         <li>THU</li>
         <li>FRI</li>
         <li>SAT</li>
         <li>SUN</li>
       </ul>
       <ul className="timeWrapper">
         <li>0-2</li>
         <li>2-4</li>
         <li>4-6</li>
         <li>6-8</li>
         <li>8-10</li>
         <li>10-12</li>
         <li>12-14</li>
         <li>14-16</li>
         <li>16-18</li>
         <li>18-20</li>
         <li>20-22</li>
         <li>22-24</li>
       </ul>
     </div>
    )
}
