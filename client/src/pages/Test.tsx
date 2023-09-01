import React, { useState } from "react";
import { Button, List, ListItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Search from "../components/search/Search";
import axios from "axios";

type TestProps = {};
interface Character {
  name: string;
  color: string;
}

const Test: React.FC<TestProps> = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get<Character[]>(
        `${process.env.REACT_APP_ENDPOINT}/api/character`
      );
      setCharacters(response.data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  return (
    <>
      <Text>That's the test page</Text>
      <Search />
      <Button>
        <Link to="/">homepage!</Link>
      </Button>
      <div>
        <Button colorScheme="blue" onClick={fetchCharacters}>
          Fetch Characters
        </Button>
        <List mt={4}>
          {characters.map((character, index) => (
            <ListItem key={index}>
              <Text>
                {character.name} - {character.color}
              </Text>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};
export default Test;
