import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useForm } from "react-hook-form";
import { TypeOf } from "zod";
import { addConversation } from "../redux/slices/chatSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { createConversationSchema } from "../schema/chatSchema";
import { addConversationType, conversationFormProps } from "../types/chatType";

type CreateConversationInput = TypeOf<typeof createConversationSchema>;
const ConversationForm: React.FC<conversationFormProps> = ({
  sellerId,
  sellerName,
  chatId,
  productId,
  productImage,
}) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const senderName = user.user.name;
  const senderId = user.user._id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationInput>({
    resolver: zodResolver(createConversationSchema),
  });

  const handleConversation = (values: addConversationType) => {
    try {
      console.log("values", values);
      const conversation = {
        ...values,
        senderId,
        sellerId,
        senderName,
        sellerName,
        productId,
        productImage,
      };
      const userInput = { conversation, chatId };
      dispatch(addConversation(userInput));
      window.location.reload();
    } catch (error: any) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Text>Hello from ConversationForm</Text>
      <FormControl as="form" onSubmit={handleSubmit(handleConversation)}>
        <FormLabel>
          Message:
          <Input
            id="message"
            type="text"
            placeholder="hello"
            {...register("message")}
          />
          <Text as="p">{errors?.message?.message?.toString()}</Text>
        </FormLabel>
        <Button type="submit">Send</Button>
      </FormControl>
    </>
  );
};
export default ConversationForm;
