import React from "react";
import {Link} from 'react-router-dom'

export function Card(props) {
  const activity=props.activity;
  console.log(activity);
  return (
    <section><Link to ={`activity/${activity._id}`}>
      <div className="card">
        <div className="card-img">
          <img src={activity.imgUrls[0]} />
        </div>
        <div className="card-text">{activity.title}
        </div>
        
      </div>
      </Link>
    </section>
  );
}