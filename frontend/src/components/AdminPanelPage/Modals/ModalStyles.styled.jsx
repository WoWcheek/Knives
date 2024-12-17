import styled from "styled-components";

const mobileWidth = '1072px';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #0a0f1a;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(14, 0, 85, 0.75);
  width: 80%;
  max-width: 500px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${mobileWidth}) {
    padding: 20px;
  }
`;

export const ModalFormContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    color: #4caf50;
  }
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 7px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #1a2a3e;
  color: #ffffff;
  border: 2px solid #0e1624;
  margin-left: -2px;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
    border: 2px solid #4caf50;
  }


`;

export const ModalSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #1a2a3e;
  color: #ffffff;
  border: 2px solid #0e1624;
  margin-left: -2px;
  appearance: none; /* Прибирає стандартний стиль select */

  &:focus {
    outline: none;
    border: 2px solid #4caf50;
  }
`;

export const ModalOption = styled.option`
  background-color: #0e1624;
  color: #ffffff;
  font-size: 16px;
  padding: 10px;

  &:hover {
    background-color: #1e293b; /* Трохи світліший відтінок для ховера */
  }
`;

export const ModalTitle = styled.span`
  width: 100%;
  text-align: left;
  font-size: 16px;
`;

export const ModalBlock = styled.div`
  width: 100%;
`;


export const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #4caf50;
  color: #ffffff;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
  margin-top: 10px;
`;


export const DeleteButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #a40000;
  color: #ffffff;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #da0000;
  }
  margin-top: 10px;
`;
