import axios from "axios";
import { productType } from "../../types/productType";

// create new product
const createProduct = async (productData: productType) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/products`,
      productData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    console.log("error", error.response.data);
  }
};

// get single product
const getSingleProduct = async (productId: any) => {
  const response = await axios.get(
    `${process.env.REACT_APP_ENDPOINT}/api/products/${productId}`,

    { withCredentials: true }
  );
  return response.data;
};

// get all products
const getAllProduct = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_ENDPOINT}/api/products`,
    { withCredentials: true }
  );
  //FIXME - fix get product controller in backend, it seems miss middleware
  return response.data;
};

// get all product from user
//FIXME - create new controller
const getAllUserProduct = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_ENDPOINT}/api/userproducts`,

    { withCredentials: true }
  );
  console.log("response", response);
  //FIXME - fix get product controller in backend, it seems miss middleware
  return response.data;
};

// delete a product
const deleteProduct = async (productId: any) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_ENDPOINT}/api/products/${productId}`,

    { withCredentials: true }
  );
  return response.data;
};

// update a single product
const updateProduct = async (productId: string, productData: productType) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_ENDPOINT}/api/products/${productId}`,
      productData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

const productService = {
  getAllProduct,
  createProduct,
  getSingleProduct,
  getAllUserProduct,
  deleteProduct,
  updateProduct,
};
export default productService;
