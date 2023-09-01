import { Flex, Spinner, Text, Select } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setOrderBy } from "../redux//slices/filterSlice";

type SideBarProps = {};

const SideBar: React.FC<SideBarProps> = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state: any) => state.product);

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "price-low") {
      dispatch(setOrderBy("price-low"));
    } else if (selectedValue === "price-high") {
      dispatch(setOrderBy("price-high"));
    } else if (selectedValue === "date-recent") {
      dispatch(setOrderBy("date-recent"));
    } else if (selectedValue === "date-oldest") {
      dispatch(setOrderBy("date-oldest"));
    } else {
      dispatch(setOrderBy(""));
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <Flex direction="column" bg="gray.100" h="100%" p={3}>
        <Text as="em" fontSize={["sm", "md"]} mb={2}>
          There are: {products.length} books
        </Text>
        <Select onChange={handleOrderByChange} fontSize={["sm", "md"]}>
          <option value="">Sort by</option>
          <option value="price-low">Lowest price</option>
          <option value="price-high">Highest price</option>
          <option value="date-recent">Most Recent</option>
          <option value="date-oldest">Oldest</option>
        </Select>
      </Flex>
    </>
  );
};
export default SideBar;
