import { Text, Flex, Box, Button } from "@chakra-ui/react";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import { createSessionSchema } from "../schema/sessionSchema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { TypeOf } from "zod";
import { login } from "../redux/slices/authSlice";

type HomeProps = {};
type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Home: React.FC<HomeProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const credential = {
    email: "bob@gmail.com",
    password: "123456",
  };

  const handleLogin = async (credential: CreateSessionInput) => {
    try {
      dispatch(login(credential));
      navigate("/");
    } catch (error: any) {
      console.log("handleLogin() error", error);
    }
  };

  return user ? (
    <>
      <Flex direction="row">
        <Box w={{ base: "25%", lg: "13%" }} mb={{ base: 4, lg: 0 }}>
          <SideBar />
        </Box>
        <Box w={{ base: "75%", lg: "87%" }}>
          <ProductList />
        </Box>
      </Flex>
    </>
  ) : (
    <>
      {/* h="13vh" on layout */}
      <Flex
        minHeight="87vh"
        bg="gray.300"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Text mb={6}>
          Please{" "}
          <Text as="span" fontWeight="bold">
            Register
          </Text>{" "}
          and{" "}
          <Text as="span" fontWeight="bold">
            Log in
          </Text>{" "}
          to join our community!
        </Text>
        <Flex alignItems="center" justifyContent="center" direction="column">
          <Text>Or feel free to test the application with a guest account</Text>
          <Button
            onClick={() => handleLogin(credential)}
            bgColor="gray.400"
            mt={3}
          >
            Login as Bob
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default Home;
