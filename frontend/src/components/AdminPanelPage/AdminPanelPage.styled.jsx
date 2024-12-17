import styled from "styled-components";

export const Sidebar = styled.aside`
  width: 18rem;
  background-color: #121b29;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  padding: 2rem 1.5rem;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  height: auto;
  border-radius: 0 8px 8px 0;
`;

export const SidebarHeader = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #f0f0f0;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SidebarLink = styled.a`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.8rem;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #2c3e50;
    color: #ffffff;
  }

  &:active {
    background-color: #34495e;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #121824;
  color: #ffffff;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Button = styled.button`
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
`;

export const AnalyticsSection = styled.section`
  margin-bottom: 1.5rem;
`;

export const AnalyticsCard = styled.div`
  background-color: #1b2631;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  color: #ffffff;

  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    transform: translateY(-5px);
  }
`;



