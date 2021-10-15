import { FC } from "react";
import { Grid, Loader } from "semantic-ui-react";

const LoadingText: FC = () => {
  return (
    <Grid.Column textAlign="center">
      <Loader active inline="centered" content="Loading time slots" />
    </Grid.Column>
  );
};

export default LoadingText;
