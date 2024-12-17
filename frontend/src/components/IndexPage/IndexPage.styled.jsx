import styled from "styled-components";

// Styled Components
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #121824;
  color: #ffffff;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
`;

export const AuthButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4caf50;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #45a049;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #2c3e50;
  color: #ffffff;
  background-color: #1b2631;
  width: 60%;
  transition: border 0.3s ease;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

export const KnivesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const KnifeCard = styled.div`
  background-color: #1b2631;
  padding: 1.5rem;
  border-radius: 12px;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    background-color: #2c3e50;
  }
`;

export const KnifeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

export const KnifeTitle = styled.h3`
  margin-top: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const KnifePrice = styled.p`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  font-weight: 600;
  color: #4caf50;
`;

export const KnifeDescription = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  color: #dcdcdc;
  line-height: 1.4;
  flex-grow: 1;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  font-weight: 600;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #2c3e50;
    cursor: not-allowed;
  }
`;
