const filteredObjectWithoutSelf = (key: string, value: string) =>
  Object.keys(key).filter((e) => e !== value);

/**
 *
 * @param allTimeSlots
 * @param bookedStartTime
 * @param bookedEndTime
 * @returns string[] overlapping times
 */
const getOverlappingTimeSlots = (
  allTimeSlots: any,
  bookedStartTime: string,
  bookedEndTime: string
): string[] => {
  return Object.keys(allTimeSlots).filter((currtimeSlot) => {
    const [currStartTime, currEndTime] = currtimeSlot.split("/");
    const bookedStartTime24 = convertTime(bookedStartTime);
    const bookedEndTime24 = convertTime(bookedEndTime);
    const currStartTime24 = convertTime(currStartTime);
    const currEndTime24 = convertTime(currEndTime);
    return (
      bookedStartTime24 < currEndTime24 && bookedEndTime24 > currStartTime24
    );
  });
};

const splitBy = (value: string, delimiter: string) => value.split(delimiter);

// covert time from 12h to 24h
const convertTime = (timeStr: any) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};
export default {
  filteredObjectWithoutSelf,
  getOverlappingTimeSlots,
  splitBy,
};
