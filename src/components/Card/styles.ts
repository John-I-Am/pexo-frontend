/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";
import {
  device, fonts, fontWeights, secondaryColor, SHADOW, spacing,
} from "../../sharedStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  width: 80%;
  height: 100%;
  position: relative;


  @media ${device.mobileL} {

  }
`;

export const GuessForm = styled.form<any>`
  input {
    border: none;
    border-bottom: 2px solid grey;
    text-align: center;
    font-size: ${spacing.biggest};
    border-radius: ${spacing.smaller};

    ${(props: any) => props.isCorrect === "correct"
    && css`
      color: green;
      border-bottom: 2px solid green;
    `};

    ${(props: any) => props.isCorrect === "incorrect" && css`
      color: red;
      border-bottom: 2px solid red;
      `};

    ${(props: any) => props.isCorrect === "" && css`color: black;`}
  }
`;

export const CardFront = styled.div<any>`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-wrap: break-word;
    overflow: scroll;
    font-family: ${fonts.text};
    font-size: 3vw;
`;

export const CardBack = styled.div<any>`
  text-align: center;
  overflow: scroll;
  font-family: ${fonts.text};
  font-size: 3vw;

  ${(props: any) => props.blur && css`filter: blur(5px);`}
`;
