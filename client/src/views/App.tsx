import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTimeSlots } from "../application/selectors/time-slots";
import { pageLoaded } from "../application/actions/ui";
import { getLoading } from "../application/selectors/ui";
import Calender from "./Calender/Calender";
import LoadingText from "./Loader/LoadingText";
import { Container, Grid } from "semantic-ui-react";
import "./App.css";

const App: FC = () => {
  const dispatch = useDispatch();
  const allTimeSlots = useSelector(getAllTimeSlots);
  const loading = useSelector(getLoading);
  const companiesIndices: string[] = Object.keys(allTimeSlots);

  useEffect(() => {
    dispatch(pageLoaded);
  }, [dispatch]);

  return (
    <Container className="appContainer">
      <Grid className="calenderGrid" verticalAlign="middle">
        {loading ? (
          <LoadingText />
        ) : (
          <>
            {companiesIndices.map((companyName: string, index: number) => (
              <Grid.Column width={5} key={companyName}>
                <Calender index={index} companyName={companyName} />
              </Grid.Column>
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default App;
