import styled, { css } from "styled-components";
import { spacing } from "../../sharedStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.smaller};
  width: 100%;
  padding-left: 32px;
`;

export const Tags = styled.div`
  height: 24px ;
  overflow: auto;
`;

export const DeckInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: ${spacing.small};
`;

export const DeckSelector = styled.div<any>`  
  display: flex;
  gap: 10px;
  width: 100%;
  overflow: scroll;

  input {
    height: 100%;
    border-radius: ${spacing.smallest};
    border: none;
    background: white;
    box-sizing: border-box;
    padding-left: 20px;
  }

  p {
    font-size: 12px;
  }

  ${(props: any) => props.noCreate
    && css`
      button:nth-of-type(2) {
        display: none;
      }
    `};
`;
