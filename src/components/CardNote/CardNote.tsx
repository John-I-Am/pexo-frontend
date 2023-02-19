/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import { ReactElement } from "react";
import { Container } from "./styles";

const CardNote = ({ notes, visible }: any): ReactElement => {
  return (
    <Container visible={visible}>
      {notes?.map((examples?: any) => (
        <p key={Date.now() * Math.random()}>{examples}</p>
      ))}
    </Container>
  );
};

export default CardNote;
