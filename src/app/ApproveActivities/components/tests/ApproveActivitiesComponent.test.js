import React from 'react';
import { shallow } from 'enzyme';

import ApproveActivitiesComponent from '../ApproveActivitiesComponent';

import activities from '../../../Dashboard/operations/tests/fixtures';

describe('<ApproveActivitiesComponent />', () => {
  const setUpWrapper = ({ activities = [] } = {}) => {
    const props = {
      activities,
    };
    return shallow(<ApproveActivitiesComponent {...props} />);
  };

  it('should have a TableComponent', () => {
    const shallowWrapper = setUpWrapper();
    expect(shallowWrapper.find('TableComponent')).toHaveLength(1);
  });

  it('should have a description of no activities when activities prop is empty', () => {
    const shallowWrapper = setUpWrapper();
    expect(shallowWrapper.find('TableComponent').html()).toContain('There is no activities to approve');
  });

  it('should have activity table column names', () => {
    const shallowWrapper = setUpWrapper({ activities });
    expect(shallowWrapper.find('TableComponent').props().tableHeadings).toEqual([
      'Activity',
      'Date',
      'Points',
      'Description',
      'Actions',
    ]);
  });
});
