import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTimeSlots } from "../../../application/selectors/time-slots";
import {
  bookTimeSlot,
  unBookTimeSlot,
} from "../../../application/actions/time-slots";
import { Card, Button } from "semantic-ui-react";

type CalenderSlotProps = {
  id: number;
  slotIndex: string;
};

const CalenderSlot: FC<CalenderSlotProps> = ({ id, slotIndex }) => {
  const dispatch = useDispatch();
  const allTimeSlots = useSelector(getAllTimeSlots);

  const [companyName, day, timeSlot] = slotIndex.split("_");
  const slot = timeSlot.split("/").join(" - ");
  const { booked, blocked } = allTimeSlots[companyName][day][timeSlot];

  const bookThisTimeSlot = () => dispatch(bookTimeSlot(slotIndex));
  const unBookThisTimeSlot = () => dispatch(unBookTimeSlot(slotIndex));

  return (
    <Card fluid className={`slot-${id}`}>
      <Card.Content header={slot} />
      <Card.Content extra>
        {!booked && (
          <Button
            fluid
            color="blue"
            disabled={blocked}
            onClick={bookThisTimeSlot}
          >
            Book this slot
          </Button>
        )}
        {booked && (
          <Button fluid color="red" onClick={unBookThisTimeSlot}>
            Remove booking
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default CalenderSlot;
