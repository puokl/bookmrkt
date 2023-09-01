import { Box, Spinner, Text } from "@chakra-ui/react";
import { useAppSelector } from "../redux/hooks";

type UserProfileProps = {};

const UserProfile: React.FC<UserProfileProps> = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    <Spinner />;
  }
  return (
    <Box>
      <Text>Hello from userProfile</Text>
      <Text>{user?.user.name}</Text>
    </Box>
  );
};
export default UserProfile;
