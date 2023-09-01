import { Button, Flex, Spinner, Text, Image, Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productType } from "../types/productType";
import { TfiLocationPin } from "react-icons/tfi";
import { dateFromNow } from "../utils/textFormat";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [displayedProductsCount, setDisplayedProductsCount] = useState(10);

  const handleLoadMore = () => {
    setDisplayedProductsCount((prevCount) => prevCount + 10);
  };

  const { products, isLoading } = useAppSelector((state: any) => state.product);
  const { orderBy } = useAppSelector((state: any) => state.filter);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const filteredProducts = orderBy
    ? [...products].sort((a, b) => {
        if (orderBy === "price-low") {
          return a.price - b.price;
        }
        if (orderBy === "price-high") {
          return b.price - a.price;
        }
        if (orderBy === "date-recent") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        if (orderBy === "date-oldest") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        return 0;
      })
    : [...products];

  if (isLoading) return <Spinner />;

  return (
    <>
      {filteredProducts &&
        filteredProducts
          .slice(0, displayedProductsCount)
          .map((item: productType, index: number) => (
            <Flex
              key={index}
              bg="yellow.100"
              border="1px solid red"
              p={6}
              as="button"
              onClick={() => navigate(`/product/${item.productId}`)}
              direction={{ base: "column", md: "row" }} // On mobile: column, on larger screens: row
              alignItems={{ base: "center", md: "flex-start" }}
              w={{ base: "80%", md: "70%" }}
              m={{ base: 2, md: 3 }}
              ml={{ base: 10, md: 30 }}
            >
              {/* Image */}
              <Box mb={{ base: 2, md: 0 }} mr={{ base: 0, md: 4 }}>
                <Image
                  src={item.image}
                  fallbackSrc="/no_image.png"
                  boxSize="100px"
                  objectFit="cover"
                  mx="auto"
                />
              </Box>
              {/* Content */}
              <Flex direction="column" w="100%">
                {/* Location */}
                <Flex
                  justifyContent={{ base: "center", md: "space-around" }}
                  direction={{ base: "column", md: "row" }}
                  alignItems={{ base: "center", md: "flex-start" }}
                  w="100%"
                  mb={2}
                >
                  {/* Location */}
                  <Flex
                    alignItems="center"
                    mb={{ base: 2, md: 0 }}
                    mr={{ base: 0, md: 4 }}
                  >
                    <TfiLocationPin />
                    <Text ml={2} fontSize="sm">
                      {item.location}
                    </Text>
                  </Flex>
                  {/* Date */}
                  <Text>{dateFromNow(item.createdAt)}</Text>
                </Flex>
                {/* Title */}
                <Flex direction="column" mb={2}>
                  <Text as="b" fontSize="lg">
                    {item.title}
                  </Text>
                  {/* Author */}
                  <Text fontSize="xs" as="b">
                    {item.author}
                  </Text>
                </Flex>
                {/* Description */}
                <Box mb={2}>
                  <Text fontSize="sm">
                    {item.description?.slice(0, 150) ?? ""}
                    {item.description && item.description.length > 150 && "..."}
                  </Text>
                </Box>
                {/* Price and Language */}
                <Flex justifyContent="space-between" w="100%">
                  <Text as="b">{item.price} €</Text>
                  <Text>Language: {item.language}</Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
      <Flex>
        {filteredProducts &&
          filteredProducts.length > displayedProductsCount && (
            <Button onClick={handleLoadMore}>Load More</Button>
          )}
      </Flex>
    </>
  );
};
export default ProductList;
