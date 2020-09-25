import React from "react";
import { ActivityPreview } from './ActivityPreview'

export function ActivityList({ activities }) {
  return (
    <div className="cards-long-display marg-top-50">
      {
        activities.map((activity) => (
          
          <ActivityPreview activity={activity} rate={activity.rate} key={activity._id} />
        ))
      }
    </div>
  );
}

