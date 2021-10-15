import { FC } from "react";
import { useSelector } from "react-redux";
import {
  getAllTimeSlots,
  getAllReservations,
} from "../../application/selectors/time-slots";
import CalenderReservation from "./components/CalenderReservation";
import CalenderList from "./components/CalenderList";
import { Header, Segment } from "semantic-ui-react";
import "./Calender.css";

export type CalenderProps = {
  index?: number;
  companyName: string;
};

const Calender: FC<CalenderProps> = ({ index, companyName }) => {
  const allTimeSlots = useSelector(getAllTimeSlots);
  const reservations = useSelector(getAllReservations);

  const companyReservation = reservations[companyName];
  const availableDaysKeys = Object.keys(allTimeSlots[companyName]);

  return (
    <>
      <Segment textAlign="center">
        <Header as="h2" content={companyName} />
      </Segment>
      <Segment>
        <CalenderReservation companyReservation={companyReservation} />
      </Segment>
      <Segment className="calender" textAlign="center" id={`calender_${index}`}>
        <CalenderList
          companyName={companyName}
          availableDaysKeys={availableDaysKeys}
        />
      </Segment>
    </>
  );
};

export default Calender;
