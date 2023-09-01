import {
  Box,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProductSchema } from "../schema/productSchema";
import { TypeOf } from "zod";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createProduct } from "../redux/slices/productSlice";
import { uploadProductImage } from "../redux/slices/imageSlice";
import { useNavigate } from "react-router-dom";

type ProductInput = TypeOf<typeof createProductSchema>;

const CreateProduct: React.FC = () => {
  const [productError, setProductError] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const { productImage } = useAppSelector((state: any) => state.image);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  type temporaryCreateProductType = {
    title: string;
    author: string;
    price: number;
    language: string;
    description?: string;
    year: number;
    condition: string;
    pages: number;
    image?: string;
    location: string;
  };

  const handleImageUpload = () => {
    if (typeof selectedFile !== "string")
      dispatch(uploadProductImage(selectedFile));
  };

  const handleProduct = async (values: temporaryCreateProductType) => {
    try {
      const data = { ...values, image: productImage.image };
      dispatch(createProduct(data));
      navigate("/");
    } catch (error: any) {
      setProductError(error.message);
      console.log("handleClick() error", error);
    }
  };

  return (
    <>
      <Box m={6}>
        <Flex maxWidth="400px" direction="column" alignItems="center">
          <Text as="p">{productError}</Text>

          <FormControl
            as="form"
            isRequired
            onSubmit={handleSubmit(handleProduct)}
          >
            <FormLabel>Title</FormLabel>
            <Input
              id="title"
              type="text"
              placeholder="book title"
              {...register("title")}
            />
            <Text as="p">{errors?.title?.message?.toString()}</Text>
            <FormLabel>Author</FormLabel>
            <Input
              id="author"
              type="text"
              placeholder="book author"
              {...register("author")}
            />
            <Text as="p">{errors?.author?.message?.toString()}</Text>
            <FormLabel>Price</FormLabel>
            <Input
              id="price"
              type="number"
              placeholder="book price"
              {...register("price", { valueAsNumber: true })}
            />
            <Text as="p">{errors?.price?.message}</Text>
            <FormLabel>Language</FormLabel>
            <Input
              id="language"
              type="text"
              placeholder="book language"
              {...register("language")}
            />
            <Text as="p">{errors?.language?.message?.toString()}</Text>
            <FormLabel>Description</FormLabel>
            <Input
              id="description"
              type="text"
              placeholder="description"
              {...register("description")}
            />
            <Text as="p">{errors?.description?.message?.toString()}</Text>
            <FormLabel>Pages</FormLabel>
            <Input
              id="pages"
              type="number"
              placeholder="pages"
              {...register("pages", { valueAsNumber: true })}
            />
            <Text as="p">{errors?.pages?.message?.toString()}</Text>
            <FormLabel>Year</FormLabel>
            <Input
              id="year"
              type="number"
              placeholder="year"
              {...register("year", { valueAsNumber: true })}
            />
            <Text as="p">{errors?.year?.message?.toString()}</Text>
            <FormLabel>Condition</FormLabel>
            <Input
              id="condition"
              type="text"
              placeholder="condition"
              {...register("condition")}
            />
            <Text as="p">{errors?.condition?.message?.toString()}</Text>
            <FormLabel>Location</FormLabel>
            <Input
              id="location"
              type="text"
              placeholder="location"
              {...register("location")}
            />
            <Text as="p">{errors?.location?.message?.toString()}</Text>
            <Input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? "")}
            />
            <Button onClick={handleImageUpload}>Upload Image</Button>
            <Button type="submit">Add product</Button>
          </FormControl>
        </Flex>
      </Box>
    </>
  );
};
export default CreateProduct;
