import { Button, Flex, Text, Image, Spinner } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { deleteProduct, getAllUserProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
type UserProductProps = {};

const UserProduct: React.FC<UserProductProps> = () => {
  const dispatch = useAppDispatch();

  //FIXME - state: any
  const { product, isLoading } = useAppSelector((state: any) => state.product);
  const navigate = useNavigate();

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    dispatch(getAllUserProduct());
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      <Flex m={4}>Hello from UserProduct</Flex>

      {product &&
        product.map((item: any, index: number) => (
          <Flex key={index} m={4}>
            <Image
              src={item.image}
              fallbackSrc="/no_image.png"
              boxSize="100px"
              objectFit="cover"
            />
            <Flex w="50%" direction="column" m={2}>
              <Flex
                as="button"
                onClick={() => navigate(`/product/${item.productId}`)}
              >
                <Text as="b" fontSize="xl">
                  {item.title}
                </Text>
              </Flex>
              <Text as="b" fontSize="sm">
                {item.author}
              </Text>
              <Text fontSize="xs">{item.price}€</Text>
            </Flex>

            <Flex w="30%">
              <Button onClick={() => handleDelete(item.productId)} h="30px">
                Delete
              </Button>
            </Flex>
          </Flex>
        ))}
    </>
  );
};
export default UserProduct;
