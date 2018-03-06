import React from 'react';

import Notification from './Notification';

/**
 * Renders a list of notifications
 */
export default () => (
  <div className="notificationList">
    <div className="notificationList__content">
      <Notification />
      <Notification />
      <Notification />
    </div>
    <footer className="notificationList__footer">
      <button className="notificationList__clearButton">Clear notifications</button>
    </footer>
  </div>
);
