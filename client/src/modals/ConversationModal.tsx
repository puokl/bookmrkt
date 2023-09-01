import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";
import ConversationForm from "../components/ConversationForm";

export type ConversationModalProps = {
  buttonText: string;
  senderId: string;
  sellerId: string;
  senderName: string;
  sellerName: string;
  chatId: string;
  productId: string;
  productImage: string;
};

const ConversationModal: React.FC<ConversationModalProps> = ({
  buttonText,

  sellerId,

  sellerName,
  chatId,
  productId,
  productImage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    window.location.reload();
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={openModal} w="100px" h="25px" bg="gray.100">
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ConversationForm
              chatId={chatId}
              // senderId={senderId}
              sellerId={sellerId}
              // senderName={senderName}
              sellerName={sellerName}
              productId={productId}
              productImage={productImage}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationModal;
