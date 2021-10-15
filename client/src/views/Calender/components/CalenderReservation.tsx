import { FC } from "react";
import { Header, Message } from "semantic-ui-react";

type CalenderReservationProps = {
  companyReservation: {
    day: string;
    timeSlot: string;
  };
};

const CalenderReservation: FC<CalenderReservationProps> = ({
  companyReservation,
}) => {
  const timeSlotToDisplay = companyReservation?.timeSlot.split("/").join(" - ");
  return (
    <>
      <Header as="h3" content="Reservation" />
      {companyReservation && (
        <Message positive>
          <b>{companyReservation.day}</b> {timeSlotToDisplay}
        </Message>
      )}
      {!companyReservation && (
        <Message visible>No booked reservation to show</Message>
      )}
    </>
  );
};

export default CalenderReservation;
