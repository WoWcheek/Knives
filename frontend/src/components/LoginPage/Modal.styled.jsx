// Modal.styled.jsx
import styled from 'styled-components';

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
    gap: 20px;
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
