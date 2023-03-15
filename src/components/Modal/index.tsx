import styled from "styled-components";
import "./Modal.css";

const ModalContent = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
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

interface ModalProp {
  randomWord: wordApiData | null;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<ModalProp> = ({
  randomWord,
  showModal,
  setShowModal,
}) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <div className="modal" data-testid="modal">
          <ModalContent className="modal-content">
            <h1>Word: {randomWord?.word}</h1>
            <div className="modal-content-item">
              {randomWord?.meanings?.map(({ definitions }, idx) => {
                return (
                  <div key={`idx-${idx}`}>
                    {definitions.map((ele, index) => {
                      return (
                        <p key={`definition-${index}`}>
                          <b> Meaning</b>: {ele.definition}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <span
              className="close"
              onClick={handleCloseModal}
              data-testid="modal-close"
            >
              close
            </span>
          </ModalContent>
        </div>
      )}
    </>
  );
};
