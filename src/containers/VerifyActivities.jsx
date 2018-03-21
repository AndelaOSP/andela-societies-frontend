import React from 'react';

import PageHeader from '../components/header/PageHeader';
import ActivityCard from '../components/activities/ActivityCard';
import MasonryLayout from '../containers/MasonryLayout';

import activities from '../fixtures/activities';

/**
 * @name VerifyActivities
 * @summary Renders My activities page
 * @return React node that displays the VerifyActivities page
 */
const VerifyActivities = () => (
  <div className='VerifyActivities'>
    <PageHeader title='Verify Activities' />
    <div className='activities'>
      <MasonryLayout
        columnCount={2}
        gap={20}
        items={
          activities.map(activity => (
            <ActivityCard
              category={activity.category}
              date={activity.date}
              description={activity.description}
              points={activity.points}
              status={activity.status}
              showUserDetails
            />
          ))
        }
      />
    </div>
  </div>
);
export default VerifyActivities;
