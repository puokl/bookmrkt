import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TypeOf } from "zod";
import { createChatSchema } from "../schema/chatSchema";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { createChat } from "../redux/slices/chatSlice";
import { chatInputType, conversationType } from "../types/chatType";

type ContactFormProps = {
  productId: string;
  productImage: string;
  sellerName: string;
  sellerId: string;
  closeModal: () => void;
  title: string;
};

type CreateChatInput = TypeOf<typeof createChatSchema>;

const ContactForm: React.FC<ContactFormProps> = ({
  productId,
  sellerName,
  sellerId,
  closeModal,
  title,
  productImage,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const senderId = user.user._id;
  const senderName = user.user.name;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatInput>({
    resolver: zodResolver(createChatSchema),
  });

  const handleChat = (values: chatInputType) => {
    try {
      const conversation: conversationType = {
        ...values,
        senderId,
        senderName,
        productId,
        sellerName,
        sellerId,
        title,
        productImage,
      };

      const conversationArray: conversationType[] = [conversation];

      const chatData = {
        conversation: conversationArray,
        senderId,
        senderName,
        productId,
        sellerName,
        sellerId,
        title,
        productImage,
      };

      dispatch(createChat(chatData));

      closeModal();
    } catch (error) {
      console.log("error on handleChat()", error);
    }
  };
  return (
    <>
      <Text>Hello from ContactForm</Text>
      <FormControl as="form" onSubmit={handleSubmit(handleChat)}>
        <FormLabel>
          Message:
          <Textarea
            id="message"
            placeholder="Hello, "
            {...register("message")}
          />
          <Text as="p">{errors?.message?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Name:
          <Input
            id="senderName"
            type="text"
            defaultValue={senderName}
            {...register("senderName")}
          />
          <Text as="p">{errors?.senderName?.message?.toString()}</Text>
        </FormLabel>
        <Flex>
          <Button type="submit">Save</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </Flex>
      </FormControl>
    </>
  );
};
export default ContactForm;
