import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Grid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

type SearchResults = {
  _id: string;
  title: string;
  author: string;
  image: string;
  location: string;
  price: string;
  productId: string;
};

type SearchResultsProps = {
  searchResults: SearchResults[];
  setQueryText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  setQueryText,
}) => {
  const { onClose } = useDisclosure();
  console.log("searchResults", searchResults);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement.closest(".search-results-area")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Grid gridRowGap="1rem">
      {searchResults.map(
        ({ title, image, author, location, price, productId }) => (
          <Box
            key={nanoid()}
            _hover={{
              background: "teal.500",
              color: "white",
              cursor: "pointer",
            }}
            p=".5rem 1rem"
            zIndex="1"
            as="button"
            onClick={() => {
              setQueryText("");
              onClose();
              navigate(`/product/${productId}`);
            }}
          >
            <Grid
              sx={{
                gridTemplateColumns: "50px 1fr",
                gridColumnGap: "1rem",
                height: "70px",
                overflow: "hidden",
              }}
            >
              <Box>
                <Image
                  src={image}
                  fallbackSrc="/no_image.png"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <VStack align="start">
                <Text noOfLines={1}>{title}</Text>
                <Text noOfLines={1}>
                  {author} - {price}€ - {location}
                </Text>
              </VStack>
            </Grid>
          </Box>
        )
      )}
    </Grid>
  );
};

export default SearchResults;
