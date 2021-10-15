export const LOAD_TIME_SLOTS = "[time slots] load";
export const SET_TIME_SLOTS = "[time slots] set";
export const LOAD_TIME_SLOTS_SUCCESS = "[time slots] load success";
export const LOAD_TIME_SLOTS_FAILURE = "[time slots] load failure";
export const BOOK_TIME_SLOT = "[time slot] book";
export const UNBOOK_TIME_SLOT = "[time slot] unbook";
export const SET_RESERVATIONS = "[reservations] set";

interface timeSlots {
  [key: string]: object;
}

interface reservation {
  day: string;
  timeSlot: string;
}

export const loadTimeSlots = {
  type: LOAD_TIME_SLOTS,
};

export const loadTimeSlotsSuccess = (timeSlots: timeSlots) => ({
  type: LOAD_TIME_SLOTS_SUCCESS,
  payload: timeSlots,
});

export const loadTimeSlotsFailure = (error: any) => ({
  type: LOAD_TIME_SLOTS_FAILURE,
  payload: error,
});

export const bookTimeSlot = (timeSlotIndex: string) => ({
  type: BOOK_TIME_SLOT,
  payload: timeSlotIndex,
});

export const unBookTimeSlot = (timeSlotIndex: string) => ({
  type: UNBOOK_TIME_SLOT,
  payload: timeSlotIndex,
});

export const setTimeSlots = (timeSlots: timeSlots) => ({
  type: SET_TIME_SLOTS,
  payload: timeSlots,
});

export const setReservations = (reservations: reservation) => ({
  type: SET_RESERVATIONS,
  payload: reservations,
});
