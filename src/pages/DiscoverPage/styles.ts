/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { spacing } from "../../sharedStyles";

export const Container = styled.div`
  display: flex ;
  flex-direction: column;
  gap: ${spacing.default};
  width: 100%;
  overflow: hidden ;
  padding: ${spacing.smaller};

  input {
    height: 35px;
    border-radius: ${spacing.smallest};
    border: none;
    background: white;
    box-sizing: border-box;
    padding-left: 20px;
  }
`;

export const DeckList = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: ${spacing.default};
    flex-wrap: wrap;
`;
