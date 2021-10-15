import { FC } from "react";
import { useSelector } from "react-redux";
import { getAllTimeSlots } from "../../../application/selectors/time-slots";
import { CalenderProps } from "../Calender";
import CalenderSlot from "./CalenderSlot";
import { Header } from "semantic-ui-react";

type CalenderListProps = {
  availableDaysKeys: string[];
} & CalenderProps;

const CalenderList: FC<CalenderListProps> = ({
  availableDaysKeys,
  companyName,
}) => {
  const allTimeSlots = useSelector(getAllTimeSlots);
  return (
    <>
      {availableDaysKeys.map((day: string) => (
        <div className={`calenderListFor${day}`} key={`${companyName}_${day}`}>
          <Header as="h2" block content={day} />
          {Object.keys(allTimeSlots[companyName][day]).map(
            (slot: any, index: number) => (
              <CalenderSlot
                id={index + 1}
                slotIndex={`${companyName}_${day}_${slot}`}
                key={`${companyName}_${day}_${slot}`}
              />
            )
          )}
        </div>
      ))}
    </>
  );
};

export default CalenderList;
