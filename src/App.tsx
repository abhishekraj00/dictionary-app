import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { ReactComponent as DarkIcon } from "../src/utils/icons/dark.svg";
import { ReactComponent as LightIcon } from "../src/utils/icons/light.svg";
import { darkTheme, lightTheme } from "./utils/theme";
import { useEffect, useState } from "react";
import RandomWord from "./components/RandomWord";
import Search from "./components/Search/Search";
import { dictionaryWordApi } from "./services/api/wordApi";
import { getRandomWord } from "./utils/helper/helpers";
import { words } from "./utils/randomWord";
import { Modal } from "./components/Modal";

const Body = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 1rem;
  width: 600px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;
`;

const ModalButton = styled.button`
  border-radius: 1rem;
  background: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
`;

// Interface of definitions
interface definitions {
  definition: string;
  example: string;
}
//Interface of meaning data
interface meaningDataApi {
  definitions: definitions[];
}

//Interface of word data
export interface wordApiData {
  word: string;
  meanings: meaningDataApi[];
}

const App = () => {
  const [mode, setMode] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const [randomWord, setRandomWord] = useState<wordApiData | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  //random word only generate while in mounting face
  useEffect(() => {
    let finalWord = searchWord ? searchWord : getRandomWord(words);
    fetch(dictionaryWordApi + finalWord)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("oops! Word Not Found 😥");
        }
      })
      .then((data) => {
        setRandomWord(data[0]);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setRandomWord(null);
      });
  }, [searchWord, setRandomWord]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Body>
        <ThemeProvider theme={mode ? darkTheme : lightTheme}>
          <Container data-testid="container">
            <div className="themeIconContainer">
              {mode ? (
                <LightIcon
                  width={25}
                  height={25}
                  onClick={() => setMode(!mode)}
                  data-testid="light-icon"
                />
              ) : (
                <DarkIcon
                  width={25}
                  height={25}
                  onClick={() => setMode(!mode)}
                  data-testid="dark-icon"
                />
              )}
            </div>
            <Search setSearchWord={setSearchWord} />
            <RandomWord randomWord={randomWord} errorMessage={errorMessage} />
            <ModalButton className="btn btn-dark" onClick={handleOpenModal}>
              Show More
            </ModalButton>
            <Modal
              randomWord={randomWord}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </Container>
        </ThemeProvider>
      </Body>
    </>
  );
};

export default App;
