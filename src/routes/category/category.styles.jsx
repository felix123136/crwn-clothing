import styled from "styled-components";

export const CategoryName = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
  text-transform: uppercase;
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;
