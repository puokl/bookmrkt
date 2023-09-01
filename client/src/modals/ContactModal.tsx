import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import ContactForm from "../components/ContactForm";

type ContactModalProps = {
  buttonText: string;
  productId: string;
  productImage: string;
  sellerName: string;
  sellerId: string;
  title: string;
};

const ContactModal: React.FC<ContactModalProps> = ({
  buttonText,
  productId,
  productImage,
  sellerName,
  sellerId,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={openModal}>{buttonText}</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContactForm
              productId={productId}
              sellerId={sellerId}
              sellerName={sellerName}
              closeModal={closeModal}
              title={title}
              productImage={productImage}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ContactModal;
