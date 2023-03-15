import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../utils/icons/search.svg";
import { useState } from "react";

interface searchProp {
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = styled.div`
  background: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 400px;
  padding: 2%;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const InputBox = styled.input`
  background: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  border: none;
  width: 100%;
  outline: none;
`;

const Search: React.FC<searchProp> = ({ setSearchWord }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchWord(searchValue);
      setSearchValue("");
    }
  };

  return (
    <SearchBar>
      <InputBox
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search a word..."
      />
      <SearchIcon width={20} height={20} />
    </SearchBar>
  );
};

export default Search;
