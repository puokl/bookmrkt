import axios from "axios";
import { LoginType, RegisterType } from "../../types/authServiceType";

// Register
const registerUser = async (userData: RegisterType) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/api/users`,
    userData,
    {
      withCredentials: true,
    }
  );

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login
const login = async (userData: LoginType) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/api/sessions`,
    userData,
    {
      withCredentials: true,
    }
  );

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout
const logout = async () => {
  try {
    await axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/sessions`, {
      withCredentials: true,
    });
    sessionStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};

// Update Profile
const updateProfile = async (avatar: { image: string }, userId: string) => {
  console.log("avatar in redux updateProfile", avatar);
  const data = { image: avatar.image };

  const response = await axios.put(
    `${process.env.REACT_APP_ENDPOINT}/api/users/${userId}`,
    data,
    {
      withCredentials: true,
    }
  );

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const authService = {
  registerUser,
  logout,
  login,
  updateProfile,
};

export default authService;
