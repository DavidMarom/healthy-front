import React from "react";
import { ActivityPreview } from "./ActivityPreview";
import { Card } from '../Card.jsx'

export function ActivityList({ activities, onRemove }) {
  return (
    <div className="cards-long-display marg-top-50">
      {
        // activities.map(activity => <ActivityPreview activity={activity} key={activity._id}  />)
        activities.map((activity) => (
          
          <Card activity={activity} rate={activity.rate} key={activity._id} />
        ))
      }
    </div>
  );
}

/* <ActivityPreview activity={activity} key={activity._id} onRemove={onRemove} */
