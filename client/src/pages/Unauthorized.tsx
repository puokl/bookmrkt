import { useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";

type UnauthorizedProps = {};

const Unauthorized: React.FC<UnauthorizedProps> = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <Box as="section">
        <Text as="h1">Unauthorized</Text>
        <br />
        <Text as="p">You do not have access to the requested page.</Text>
        <Box>
          <Button onClick={goBack}>Go Back</Button>
        </Box>
      </Box>
    </>
  );
};
export default Unauthorized;
