import * as uiActions from "../actions/ui";
import * as timeSlotsActions from "../actions/time-slots";

const pageLoadedFlow =
  () =>
  ({ dispatch }: any) =>
  (next: (arg0: any) => void) =>
  (action: { type: any }) => {
    next(action);

    /**
     * interceptor for page loading action
     */
    if (action.type === uiActions.PAGE_LOADED) {
      // start the process of loading time slots as page renders
      dispatch(timeSlotsActions.loadTimeSlots);
    }
  };

export default [pageLoadedFlow];
