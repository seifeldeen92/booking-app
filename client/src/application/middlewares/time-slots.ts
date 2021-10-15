import * as timeSlotsActions from "../actions/time-slots";
import * as uiActions from "../actions/ui";

interface Company {
  id: number;
  name: string;
  type: string;
  time_slots: TimeSlot[];
}

interface TimeSlot {
  start_time: string;
  end_time: string;
}

const localeTimeStringOptions: Intl.DateTimeFormatOptions | undefined = {
  hour: "2-digit",
  minute: "2-digit",
};

/**
 * @params Companies: Company[]
 * @returns mapped timeSlots object
 * ex:
 * * {
 * *  "Company 1": {
 * *    "Monday": {
 * *         08:00 AM/09:30 AM: { booked, blocked },
 * *         ............... etc
 * *     },
 * *     "Tuesday": {},
 * *     ............ etc
 * *  },
 * *  "Company 2": {},
 * *  ............. etc
 * * }
 */
const constructTimeSlotMap = (Companies: Company[]) => {
  const timeSlots: any = {};
  Companies.forEach((c: Company) => {
    const timeSlotsMap: any = {};

    // add company's name as key in timeSlotsMap
    timeSlots[c.name] = timeSlotsMap;

    // loop over all the time slots to extract day & time slots
    Object.values(c.time_slots).forEach(function (val: TimeSlot) {
      // get day
      const day = new Date(val.start_time).toLocaleDateString(undefined, {
        weekday: "long",
      });

      // truncate the iso start time to shorter readable time
      const start_time = new Date(val.start_time).toLocaleTimeString(
        [],
        localeTimeStringOptions
      );
      // truncate the iso end time to shorter readable time
      const end_time = new Date(val.end_time).toLocaleTimeString(
        [],
        localeTimeStringOptions
      );

      // set timeSlot as a key for the timeSlot obj and assign
      const timeSlot: any = {};
      timeSlot[`${start_time}/${end_time}`] = {
        booked: false,
        blocked: false,
      };

      /**
       * check if the timeSlotsMap have the "day" as key entry in the map
       * if not add it and if yes then append the timeSlot to the already existing
       * timeSlots in the "day" entry in the timeSlotsMap
       */
      if (!timeSlotsMap.hasOwnProperty(day)) {
        timeSlotsMap[day] = { ...timeSlot };
      } else {
        timeSlotsMap[day] = { ...timeSlotsMap[day], ...timeSlot };
      }
    });
  });
  return timeSlots;
};

const getFilteredCompaniesAndOverlappingSlots = (
  utils: any,
  timeSlot: any,
  oldTimeSlotsClone: { [x: string]: { [x: string]: any } },
  company: string,
  day: string
) => {
  /**
   * split the timeSlot to start & end time
   * example: timeSlot = 09:30 AM/10:00 AM
   * split to bookedStartTime = 09:30 AM &
   * bookedEndTime = 10:00 AM
   */
  const [bookedStartTime, bookedEndTime] = utils.splitBy(timeSlot, "/");

  /**
   * get the rest of companies that needs there time slots blocked
   */
  const filteredCompanies = utils.filteredObjectWithoutSelf(
    oldTimeSlotsClone,
    company
  );

  /**
   * get all time slots that are going to be potentially blocked
   */
  const listOfOverlappingTimeSlots = utils.getOverlappingTimeSlots(
    oldTimeSlotsClone[company][day],
    bookedStartTime,
    bookedEndTime
  );

  return [filteredCompanies, listOfOverlappingTimeSlots];
};

const timeSlotsLoadedFlow =
  ({ api }: any) =>
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: any) => {
    next(action);

    if (action.type === timeSlotsActions.LOAD_TIME_SLOTS) {
      try {
        // set page that it is loading
        dispatch(uiActions.setLoading(true));

        // Retrieve time slots from api
        const timeSlotsJSON = await api.timeSlots.getAllTimeSlots();

        /**
         * map timeSlotsJSON to the desired structure
         */
        const timeSlots = constructTimeSlotMap(timeSlotsJSON);

        /**
         * dispatch new states for page loading & time slots
         */
        dispatch(timeSlotsActions.loadTimeSlotsSuccess(timeSlots));
        dispatch(uiActions.setLoading(false));
      } catch (error) {
        dispatch(timeSlotsActions.loadTimeSlotsFailure(error));
      }
    }
  };

/**
 *
 * @param {utils, dispatch, getState, next, action }
 * @returns void
 * This is the bookTimeSlotsFlow responsible for capturing the user's action
 * and manipulate the data before the dispatch continues
 */
const bookTimeSlotsFlow =
  ({ utils }: any) =>
  ({ dispatch, getState }: any) =>
  (next: any) =>
  (action: any) => {
    // create a clone from timeSlots state objects `reservations` & `allTimeSlots`
    const oldReservationsClone = { ...getState().timeSlots.reservations };
    const oldTimeSlotsClone = { ...getState().timeSlots.allTimeSlots };

    // Book time slot interception block
    if (action.type === timeSlotsActions.BOOK_TIME_SLOT) {
      /**
       * Split action.payload to extract company name, day & timeSlot
       * ex: C1_Monday_09:00 AM/10:00 AM => `C1`, `Monday` & `09:00 AM/10:00 AM`
       */
      const [company, day, timeSlot] = utils.splitBy(action.payload, "_");

      /**
       * if the reservations list don't have a reservation for the given
       * company start reservation and booking the desired slot
       */
      if (!oldReservationsClone.hasOwnProperty(company)) {
        // set required time slot to be booked
        oldTimeSlotsClone[company][day][timeSlot] = {
          booked: true,
          blocked: false,
        };

        // set reservation
        oldReservationsClone[company] = { day, timeSlot };

        const [filteredCompanies, listOfOverlappingTimeSlots] =
          getFilteredCompaniesAndOverlappingSlots(
            utils,
            timeSlot,
            oldTimeSlotsClone,
            company,
            day
          );
        /**
         * loop over filteredCompanies and block their time slots
         * that overlaps with the currently booked slot
         */
        filteredCompanies.forEach((companyName: string) => {
          listOfOverlappingTimeSlots.forEach((toBeBlockedSlot: string) => {
            oldTimeSlotsClone[companyName][day][toBeBlockedSlot] = {
              booked: false,
              blocked: true,
            };
          });
        });

        /**
         * dispatch new states for reservations and time slots
         */
        dispatch(timeSlotsActions.setReservations(oldReservationsClone));
        dispatch(timeSlotsActions.setTimeSlots(oldTimeSlotsClone));
      }
    }

    // Unbook time slot interception block
    if (action.type === timeSlotsActions.UNBOOK_TIME_SLOT) {
      /**
       * Split action.payload to extract company name, day & timeSlot
       * ex: C1_Monday_09:00 AM/10:00 AM => `C1`, `Monday` & `09:00 AM/10:00 AM`
       */
      const [company, day, timeSlot] = utils.splitBy(action.payload, "_");

      // un book desired time slot
      oldTimeSlotsClone[company][day][timeSlot] = {
        booked: false,
        blocked: false,
      };

      // delete the company's reservation from reservations obj
      delete oldReservationsClone[company];

      const [filteredCompanies, listOfOverlappingTimeSlots] =
        getFilteredCompaniesAndOverlappingSlots(
          utils,
          timeSlot,
          oldTimeSlotsClone,
          company,
          day
        );
      /**
       * loop over filteredCompanies and unblock all their time slots
       * that overlaps with the currently unbooked slot
       */
      filteredCompanies.forEach((companyName: string) => {
        listOfOverlappingTimeSlots.forEach((toBeUnBlockedSlot: string) => {
          oldTimeSlotsClone[companyName][day][toBeUnBlockedSlot] = {
            booked: false,
            blocked: false,
          };
        });
      });

      /**
       * dispatch new states for reservations and time slots
       */
      dispatch(timeSlotsActions.setReservations(oldReservationsClone));
      dispatch(timeSlotsActions.setTimeSlots(oldTimeSlotsClone));
    }

    next(action);
  };

export default [timeSlotsLoadedFlow, bookTimeSlotsFlow];
