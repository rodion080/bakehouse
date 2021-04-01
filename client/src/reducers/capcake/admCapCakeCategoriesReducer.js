import {
  SET_COUNT,
} from '../../_constants/admCapCakeCategoriesConstants';

const admCapCakeCatState = {
  count: 0,
};

export default function admCapCakeCategoriesReducer(state = admCapCakeCatState, action) {
  switch (action.type) {
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}

export const setCount = (count) => ({ type: SET_COUNT, payload: count });
