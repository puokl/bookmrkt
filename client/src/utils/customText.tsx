import { Flex, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

type CustomTextProps = {
  label: string | ReactElement;
  value: string;
  labelFontSize?: string;
  valueFontSize?: string;
};

export const CustomText: React.FC<CustomTextProps> = ({
  label,
  value,
  labelFontSize = "sm",
  valueFontSize = "sm",
}) => {
  return (
    <Flex alignItems="center">
      <Text fontSize={labelFontSize} mr={2}>
        {label}:
      </Text>
      <Text fontSize={valueFontSize} as="em">
        {value}
      </Text>
    </Flex>
  );
};
