import { Text, Flex, Box, Spinner, Image, Avatar } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import React, { useEffect, useState } from "react";
import {
  getAllReceivedUserChat,
  getAllSentUserChat,
} from "../redux/slices/chatSlice";
import ConversationModal from "../modals/ConversationModal";
import { chatType, conversationType } from "../types/chatType";
import moment from "moment";
import {
  dateFromNow,
  formattedDate,
  toUpperCase,
  truncateString,
} from "../utils/textFormat";

type MessagesProps = {};

const Messages: React.FC<MessagesProps> = () => {
  const [selectedChat, setSelectedChat] = useState<chatType | null>(null);
  const [selectedReceivedChat, setSelectedReceivedChat] =
    useState<chatType | null>(null);

  const handleChatClick = (chat: chatType) => {
    setSelectedChat(chat);
  };
  const handleReceivedChatClick = (chat: chatType) => {
    setSelectedReceivedChat(chat);
  };
  const dispatch = useAppDispatch();

  const { receivedChat, sentChat, isLoading } = useAppSelector(
    (state: any) => state.chat
  );

  const { user } = useAppSelector((state) => state.auth);

  const senderName = user.user.name;
  const senderId = user.user._id;

  console.log("{senderName, senderId,sellerId}", {
    senderName,
    senderId,
    // sellerId,
  });

  useEffect(() => {
    dispatch(getAllReceivedUserChat());
    dispatch(getAllSentUserChat());
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      <Text>Hi from messages</Text>
      <Flex m={2}>
        <Flex direction="column" w="50%">
          <Text as="b" fontSize="lg">
            Sent Chat
          </Text>
          {sentChat &&
            sentChat.map((item: chatType) => {
              return (
                <Flex
                  key={item._id}
                  borderWidth="1px"
                  borderRadius="md"
                  m={1}
                  p={2}
                  onClick={() => handleChatClick(item)}
                  cursor="pointer"
                  border="solid 1px red"
                  _hover={{ bg: "gray.200" }}
                >
                  <Flex alignItems="center" w="100%">
                    <Image
                      src={item.productImage}
                      boxSize="70px"
                      objectFit="cover"
                    />
                    <Flex direction="column" m={2} w="100%">
                      <Flex justifyContent="space-between">
                        <Text as="b" fontSize="md">
                          {" "}
                          {toUpperCase(item.senderName)}
                        </Text>
                        <Text>{formattedDate(item.createdAt)}</Text>
                      </Flex>
                      <Flex direction="column">
                        <Text as="b">{item.title}</Text>
                        <Text>
                          {truncateString(item.conversation[0].message)}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
        </Flex>
        <Flex w="50%">
          <Box>
            <Box>
              {selectedChat && (
                <Flex
                  borderWidth="1px"
                  borderRadius="md"
                  m={4}
                  p={4}
                  flexDirection="column"
                >
                  <Flex
                    justifyContent="space-between"
                    bg="gray.100"
                    m={1}
                    p={1}
                  >
                    <Text as="b">{toUpperCase(selectedChat.senderName)}</Text>
                    <Text fontSize="sm" as="em">
                      {selectedChat.title}
                    </Text>
                  </Flex>
                  {/* <Text>{selectedChat.conversation[0]}</Text> */}
                  <Flex direction="column">
                    {selectedChat.conversation.map(
                      (message: conversationType) => {
                        const isCurrentUser =
                          message.senderName === user.user.name;
                        const messageStyle: React.CSSProperties = {
                          marginLeft: isCurrentUser ? "100px" : "0",
                          marginRight: isCurrentUser ? "0" : "100px",
                          display: "flex",
                          flexDirection: isCurrentUser ? "row-reverse" : "row",
                        };
                        const colorStyle = {
                          backgroundColor: isCurrentUser
                            ? "#C6F6D5"
                            : "#EDF2F7",
                        };

                        return (
                          <Flex key={message._id} style={messageStyle}>
                            <Avatar size="xs" name={message?.senderName} />
                            <Box w="300px" mx={2} mb={1}>
                              <Flex
                                bg="gray.300"
                                borderRadius="md"
                                style={colorStyle}
                              >
                                <Text p={1} fontSize="sm">
                                  {message?.message}
                                </Text>
                              </Flex>
                              <Text fontSize="xs">
                                {moment(message.createdAt).fromNow()}
                              </Text>
                            </Box>
                          </Flex>
                        );
                      }
                    )}
                    <Flex justifyContent="center">
                      {selectedChat._id && (
                        <ConversationModal
                          buttonText="Reply"
                          chatId={selectedChat._id}
                          senderName={selectedChat.senderName}
                          senderId={selectedChat.senderId}
                          sellerId={selectedChat.senderId}
                          sellerName={selectedChat.sellerName}
                          productImage={selectedChat.productImage}
                          productId={selectedChat.productId}
                        />
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Box>
          </Box>
        </Flex>
      </Flex>
      {/* //SECTION -  */}
      <Flex m={2}>
        <Flex direction="column" w="50%">
          <Text as="b" fontSize="lg">
            Received Chat
          </Text>
          {receivedChat &&
            receivedChat.map((item: chatType) => {
              return (
                <Flex
                  key={item._id}
                  borderWidth="1px"
                  borderRadius="md"
                  m={1}
                  p={2}
                  onClick={() => handleReceivedChatClick(item)}
                  cursor="pointer"
                  border="solid 1px red"
                  _hover={{ bg: "gray.200" }}
                >
                  <Flex alignItems="center" w="100%">
                    <Image
                      src={item.productImage}
                      boxSize="70px"
                      objectFit="cover"
                    />
                    <Flex direction="column" m={2} w="100%">
                      <Flex justifyContent="space-between">
                        <Text as="b" fontSize="md">
                          {" "}
                          {toUpperCase(item.senderName)}
                        </Text>
                        <Text>{formattedDate(item.createdAt)}</Text>
                      </Flex>
                      <Text as="b">{item.title}</Text>
                      <Text>
                        {truncateString(item.conversation[0].message)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
        </Flex>
        <Flex w="50%">
          <Box>
            <Box>
              {selectedReceivedChat && (
                <Flex
                  borderWidth="1px"
                  borderRadius="md"
                  m={4}
                  p={4}
                  flexDirection="column"
                >
                  <Flex
                    justifyContent="space-between"
                    bg="gray.100"
                    m={1}
                    p={1}
                  >
                    <Text as="b">
                      {toUpperCase(selectedReceivedChat.senderName)}
                    </Text>
                    <Text fontSize="sm" as="em">
                      {selectedReceivedChat.title}
                    </Text>
                  </Flex>
                  {/* <Text>{selectedChat.conversation[0]}</Text> */}
                  <Flex direction="column">
                    {selectedReceivedChat.conversation.map(
                      (message: conversationType) => {
                        const isCurrentUser =
                          message.senderName === user.user.name;
                        const messageStyle: React.CSSProperties = {
                          marginLeft: isCurrentUser ? "100px" : "0",
                          marginRight: isCurrentUser ? "0" : "100px",
                          display: "flex",
                          flexDirection: isCurrentUser ? "row-reverse" : "row",
                        };
                        const colorStyle = {
                          backgroundColor: isCurrentUser
                            ? "#C6F6D5"
                            : "#EDF2F7",
                        };

                        return (
                          <Flex key={message._id} style={messageStyle}>
                            <Avatar size="xs" name={message?.senderName} />
                            <Box w="300px" mx={2} mb={1}>
                              <Flex
                                bg="gray.300"
                                borderRadius="md"
                                style={colorStyle}
                              >
                                <Text p={1} fontSize="sm">
                                  {message?.message}
                                </Text>
                              </Flex>
                              <Text fontSize="xs">
                                {dateFromNow(message.createdAt)}
                              </Text>
                            </Box>
                          </Flex>
                        );
                      }
                    )}
                    {selectedReceivedChat._id && (
                      <ConversationModal
                        buttonText="Reply"
                        chatId={selectedReceivedChat._id}
                        senderName={selectedReceivedChat.senderName}
                        senderId={selectedReceivedChat.senderId}
                        sellerId={selectedReceivedChat.senderId}
                        sellerName={selectedReceivedChat.sellerName}
                        productImage={selectedReceivedChat.productImage}
                        productId={selectedReceivedChat.productId}
                      />
                    )}
                  </Flex>
                </Flex>
              )}
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
export default Messages;
