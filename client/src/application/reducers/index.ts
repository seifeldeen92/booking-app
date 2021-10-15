import { combineReducers } from "redux";
import ui from "./ui";
import timeSlots from "./time-slots";

export default combineReducers({
  ui,
  timeSlots,
});
