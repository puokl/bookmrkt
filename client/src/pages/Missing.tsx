import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type MissingProps = {};

const Missing: React.FC<MissingProps> = () => {
  return (
    <>
      <Text as="article">
        <Text as="h1">Oops!</Text>
        <Text as="p">Page Not Found</Text>
        <Box>
          <Link to="/">Visit our Homepage</Link>
        </Box>
      </Text>
    </>
  );
};
export default Missing;
