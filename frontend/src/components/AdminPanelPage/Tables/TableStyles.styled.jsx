import styled from "styled-components";

export const ClientsTable = styled.section`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #121c28;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const Table = styled.table`
  width: 100%;
  background-color: #0e1624;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
  color: #ffffff;
  overflow: hidden;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #1c2530;
  }

  &:hover {
    background-color: #2d3642;
  }
`;

export const TableHeader = styled.thead`
  background-color: #1a2634;
  text-align: left;
  padding: 0.5rem;
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 1rem;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeading = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: bold;
  font-size: 1.1rem;
  color: #f0f0f0;
  border-bottom: 2px solid #2c3e50;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #f0f0f0;
  margin-bottom: 1rem;
`;