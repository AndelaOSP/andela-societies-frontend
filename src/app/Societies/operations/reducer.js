import types from './types';
import initialState from '../../../reducers/initialState';

const society = (state = initialState.society, { type, payload }) => {
  switch (type) {
  case types.SOCIETY_PAGE_LOADING:
    return {
      ...state,
      loading: true,
    };
  case types.SOCIETY_PAGE_ERROR:
    return {
      ...state,
      error: payload.error,
    };
  case types.FETCH_SOCIETY_INFO_SUCCESS: {
    const {
      societyName,
      pointsEarned,
      usedPoints,
      remainingPoints,
      loggedActivities,
      activitiesLogged,
    } = payload;
    return {
      ...state,
      [societyName]: {
        ...state[societyName],
        pointsEarned,
        usedPoints,
        remainingPoints,
        loggedActivities,
        activitiesLogged,
      },
    };
  }
  case types.FETCH_SOCIETY_REDEMPTIONS_SUCCESS: {
    const { societyName } = payload;
    return {
      ...state,
      [societyName]: {
        ...state[societyName],
        redemptions: payload.redemptions,
      },
    };
  }
  default:
    return state;
  }
};

export default society;
