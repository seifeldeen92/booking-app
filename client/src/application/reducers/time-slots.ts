import * as timeSlotsActions from "../actions/time-slots";

type TimeSlotAction = { type: string; payload?: object };

const initialState = {
  allTimeSlots: {},
  reservations: {},
  error: null,
};

export default (state = initialState, action: TimeSlotAction) => {
  switch (action.type) {
    case timeSlotsActions.LOAD_TIME_SLOTS_SUCCESS:
      return { allTimeSlots: action.payload, reservations: {}, error: null };
    case timeSlotsActions.SET_TIME_SLOTS:
      return { ...state, allTimeSlots: action.payload };
    case timeSlotsActions.SET_RESERVATIONS:
      return { ...state, reservations: action.payload };
    case timeSlotsActions.LOAD_TIME_SLOTS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
