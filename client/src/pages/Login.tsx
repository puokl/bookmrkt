import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import getGoogleOAuthURL from "../utils/getGoogleUrl";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { createSessionSchema } from "../schema/sessionSchema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state: any) => state.auth);

  const [loginError, setLoginError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const handleLogin = async (values: CreateSessionInput) => {
    try {
      dispatch(login(values));
      navigate("/");
    } catch (error: any) {
      setLoginError(error.message);
      console.log("handleClick() error", error);
    }
  };

  const googleUr = getGoogleOAuthURL();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Flex m={4} minHeight="80vh" alignItems="center" justifyContent="center">
        <Box as="form" onSubmit={handleSubmit(handleLogin)} maxW="250px">
          <FormControl isRequired>
            <Box mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@mail.com"
                {...register("email")}
              />
              <Text as="p">{errors.email?.message?.toString()}</Text>
            </Box>
            <Box mb={3}>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
              />
              <Text as="p">{errors.password?.message?.toString()}</Text>
            </Box>
            <Text as="p">{loginError}</Text>
            <Flex alignItems="center" justifyContent="center" mt={6}>
              <Button type="submit">SUBMIT</Button>
            </Flex>
            {/* <Text as="p">Or login with Google</Text>
          <Button as="a" href={googleUr}>
          Google Login
        </Button> */}
          </FormControl>
        </Box>
      </Flex>
    </>
  );
};
export default Login;
