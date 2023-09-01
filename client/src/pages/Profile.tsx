import { Spinner, Text, Button, Input, Box } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { uploadAvatar } from "../redux/slices/imageSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateProfile } from "../redux/slices/authSlice";

type TestoProps = {};

const Profile: React.FC<TestoProps> = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { avatar } = useAppSelector((state: any) => state.image);

  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const dispatch = useAppDispatch();

  const handleSubmitAvatar = async () => {
    try {
      if (selectedFile instanceof File) {
        dispatch(uploadAvatar(selectedFile));
      } else {
        console.log("selectedFile is not a File type");
      }
    } catch (error: any) {
      console.log("handleSubmitAvatar() error", error);
    }
  };

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.files?.[0]);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };
  interface updateProfileType {
    avatar: {
      image: string;
    };
    userId: string;
  }
  const handleProfile = () => {
    const data: updateProfileType = { avatar: avatar, userId: user.user._id };
    console.log("data in handleProfile", data);
    dispatch(updateProfile(data));
    console.log("user after dispatch", user);
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <Text>That's the profile page</Text>
      <Text>Hi {user?.user.name}</Text>

      <Box
        as="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmitAvatar();
        }}
        maxWidth={250}
      >
        <Input type="file" name="file" id="file" onChange={handleAttachFile} />
        <Button type="submit">upload picture</Button>
      </Box>
      <Button onClick={() => handleProfile()}>Update profile</Button>
    </>
  );
};
export default Profile;
