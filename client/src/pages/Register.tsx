import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "../schema/userSchema";
import { registerUser, reset } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type CreateUserInput = TypeOf<typeof createUserSchema>;

const Register: React.FC = () => {
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

  async function onSubmit(values: CreateUserInput) {
    try {
      // console.log("values", values);
      dispatch(registerUser(values));
      navigate("/");
    } catch (e: any) {
      console.log("there is an error on the registration", e);
      setRegisterError(e.response.data);
    }

    // console.log("values", values);
  }
  console.log("errors", { errors });

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Flex m={4} minHeight="80vh" alignItems="center" justifyContent="center">
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
              />
              <Text as="p">{errors.name?.message?.toString()}</Text>
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
            <Box mb={3}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("passwordConfirmation")}
              />
              <Text as="p">
                {errors.passwordConfirmation?.message?.toString()}
              </Text>
            </Box>
            <Text as="p">{registerError}</Text>
            <Flex alignItems="center" justifyContent="center" mt={6}>
              <Button type="submit">SUBMIT</Button>
            </Flex>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
};
export default Register;
