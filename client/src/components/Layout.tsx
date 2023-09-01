import { Box, Button, Flex, Text, Image, Avatar } from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, reset } from "../redux/slices/authSlice";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import Search from "../components/search/Search";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  async function logOut() {
    try {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    } catch (error: any) {
      console.log("error on logOut()", error);
    }
  }
  // async function getSession() {
  //   try {
  //     const data = await axios.get(
  //       `${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("getSession data", data);
  //     console.log("user", user);
  //   } catch (error: any) {
  //     console.log("error on getSession()", error);
  //   }
  // }

  return (
    <>
      <Flex w="100%" bg="cyan.700" alignItems="center" pl={2} pr={2} h="14vh">
        {/* <Flex w="70%" alignItems="center"> */}
        <Flex
          w={["100%", "70%"]}
          alignItems={["center", "initial"]}
          mb={[3, 0]}
        >
          <Box w="200px" mr={3}>
            <Link to="/">
              <Image src="/logobook.png" objectFit="cover" />
            </Link>
          </Box>
          {user && <Search />}
        </Flex>
        {user ? (
          <Box as="main" w="30%">
            <Flex justifyContent="space-around" alignItems="center">
              <Box m={[0, 3]} display={["none", "block"]}>
                <Text fontSize="xs">Your are logged in as: </Text>
                <Text fontSize="sm" as="b">
                  {user?.user?.email}
                </Text>
              </Box>

              <Box
                as="span"
                position="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                m={2}
              >
                <Avatar name={user.user.name} src={user.user.image} size="lg" />

                {isHovered && (
                  <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    width="200px"
                    bg="gray.200"
                    border="1px solid gray"
                    boxShadow="md"
                    p={1}
                    borderRadius="md"
                    zIndex={3}
                  >
                    <Flex direction="column" alignItems="center">
                      <Text
                        as="a"
                        href="/addproduct"
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                      >
                        Add a product
                      </Text>
                      <Text
                        as="a"
                        href="/user"
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                      >
                        Your products
                      </Text>
                      <Text
                        as="a"
                        href={`/messages/received/${user.user._id}`}
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                      >
                        Your Messages
                      </Text>
                      <Text
                        as="a"
                        href="/profile"
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                      >
                        Update Avatar
                      </Text>

                      <Flex
                        as="button"
                        onClick={logOut}
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                        alignItems="center"
                      >
                        {" "}
                        <TbLogout style={{ marginRight: "5px" }} />
                        <Text>Logout</Text>
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </Box>
            </Flex>
          </Box>
        ) : (
          <Flex
            justifyContent="center"
            w="30%"
            flexDirection={["column", "row"]} // Display in column on mobile, row on larger screens
            alignItems={["center", "flex-start"]}
            mt={[1, 0]}
          >
            <Button
              as="a"
              href="/login"
              mb={[1, 0]}
              mr={[0, 3]}
              fontSize={["sm", "md"]}
              size={["sm", "md"]}
              bgColor="gray.400"
            >
              Login
            </Button>
            <Button
              as="a"
              href="/register"
              fontSize={["sm", "md"]}
              size={["sm", "md"]}
              bgColor="gray.400"
            >
              Register
            </Button>
          </Flex>
        )}
      </Flex>
      <Outlet />
    </>
  );
};
export default Layout;
