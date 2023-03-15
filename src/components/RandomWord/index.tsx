import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 1rem;
  text-align: left;
`;
const Error = styled.h4`
  color: red;
`;
const ErrorLoading = styled.h4`
  color: green;
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
interface wordApiData {
  word: string;
  meanings: meaningDataApi[];
}

interface randomWordProp {
  randomWord: wordApiData | null;
  errorMessage: string;
}

const RandomWord: React.FC<randomWordProp> = ({ randomWord, errorMessage }) => {
  const getDataApi = () => {
    if (errorMessage) {
      return <p data-testid="error-message">{errorMessage}</p>;
    }

    if (!randomWord?.word) {
      return <ErrorLoading>Loading...</ErrorLoading>;
    }
  };

  return (
    <>
      <Container>
        <h2 data-testid="definition">
          Word: {randomWord ? randomWord.word : <Error>{getDataApi()}</Error>}
        </h2>
        {randomWord?.meanings?.map(({ definitions }, idx) => {
          if (idx === 0) {
            return (
              <div key={`idx-${idx}`}>
                {definitions.map((ele, index) => {
                  if (index === 0) {
                    return (
                      <p key={`definition-${index}`}>
                        Meaning: {ele.definition}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            );
          }
          return null;
        })}
      </Container>
    </>
  );
};

export default RandomWord;
