import { Button, Flex, Spinner, Text, Image, Divider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getSingleProduct } from "../redux/slices/productSlice";
import { useEffect, useState } from "react";
import { createProductSchema } from "../schema/productSchema";
import { TypeOf } from "zod";
import EditProductForm from "../components/EditProductForm";
import ContactModal from "../modals/ContactModal";
import { formattedDate } from "../utils/textFormat";
import { MdLocationPin } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { CustomText } from "../utils/customText";

export type ProductInput = TypeOf<typeof createProductSchema>;

type DisplayProductProps = {};

const DisplayProduct: React.FC<DisplayProductProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { product, isLoading } = useAppSelector((state: any) => state.product);

  useEffect(() => {
    if (typeof params.id !== "undefined") dispatch(getSingleProduct(params.id));
  }, [params.id]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (isEditing) {
    return (
      <EditProductForm
        product={product}
        handleEdit={handleEdit}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        productId={params.id}
      />
    );
  }
  if (isLoading) {
    <Spinner />;
  }
  if (product) {
    return (
      <>
        <Flex m={5} w="100%" justifyContent="center">
          <Flex flexDirection="column">
            <Flex justifyContent="center">
              <Image
                src={product.image}
                fallbackSrc="/no_image.png"
                boxSize="200px"
                objectFit="cover"
              />
            </Flex>
            <Flex mt={3}>
              <Flex flexDirection="column" w="100%">
                <Text as="b" fontSize="xl">
                  {product.title}
                </Text>
                <Text as="b" fontSize="md">
                  {product.author}
                </Text>

                <Flex alignItems="center" justifyContent="space-between" mt={2}>
                  <Text as="b">{product.price} €</Text>
                  <Flex>
                    <MdLocationPin />
                    <Text ml={1} fontSize="md">
                      {product.location}
                    </Text>
                  </Flex>
                </Flex>
                <Flex alignItems="center" m={2}>
                  <CiCalendarDate />
                  <Text ml={3} fontSize="sm">
                    {formattedDate(product.createdAt)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Text mt={4} mb={1} as="b">
              More info
            </Text>
            <Divider borderWidth="1px" borderColor="black" />
            <Text my={3} maxW={450} fontSize="sm">
              {product.description}
            </Text>
            <CustomText label="Language" value={product.language} />
            <CustomText label="Condition" value={product.condition} />
            <CustomText label="Year" value={product.year} />
            <CustomText label="Seller" value={product.username} />
            <Flex mt={4} justifyContent="space-evenly">
              {" "}
              {user.user._id === product.userId && (
                <Button onClick={handleEdit}>Edit</Button>
              )}
              <ContactModal
                buttonText="Contact Seller"
                productId={params.id || ""}
                sellerName={product.username}
                title={product.title}
                productImage={product.image}
                sellerId={product.userId}
              />
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
  return null;
};
export default DisplayProduct;
