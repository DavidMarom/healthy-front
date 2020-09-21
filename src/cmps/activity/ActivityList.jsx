import React from "react";
import { Card } from '../Card.jsx'

export function ActivityList({ activities }) {
  return (
    <div className="cards-long-display marg-top-50">
      {
        activities.map((activity) => (
          
          <Card activity={activity} rate={activity.rate} key={activity._id} />
        ))
      }
    </div>
  );
}

