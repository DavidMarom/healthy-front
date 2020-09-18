import React from 'react'


export function UserSchedule({ user }) {
    return (
     <div className="schedule">
       <ul className="flex sb p0">
         <li>HOURS</li>
         <li>MON</li>
         <li>TUE</li>
         <li>WED</li>
         <li>THU</li>
         <li>FRI</li>
         <li>SAT</li>
         <li>SUN</li>
       </ul>
       <ul className="p0 tal hour">
         <li>1-3</li>
         <li>3-5</li>
         <li>5-7</li>
         <li>7-9</li>
         <li>9-11</li>
         <li>11-13</li>
         <li>13-15</li>
         <li>15-17</li>
         <li>17-19</li>
         <li>19-21</li>
         <li>21-23</li>
         <li>23-1</li>
       </ul>
     </div>
    )
}
