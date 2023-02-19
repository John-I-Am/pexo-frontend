/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateCard } from "../../reducers/deckReducer";
import CardToolbar from "../CardToolbar/CardToolbar";
import {
  Container, CardFront, CardBack, GuessForm,
} from "./styles";

const Card = ({ cardToStudy, showNotes }: any): ReactElement => {
  const dispatch = useAppDispatch();
  const token: any = useAppSelector((state: any) => state.user?.token);
  // this is used for styling
  const [isCorrect, setIsCorrect] = useState("");
  const [guessed, setGuessed] = useState(false);

  const [blur, setBlur] = useState(cardToStudy.type === "classic");

  const { register, handleSubmit, setValue } = useForm();

  const handleIncorrect = async () => {
    dispatch(updateCard(token, {
      ...cardToStudy,
      level: cardToStudy.level === 0
        ? 0
        : cardToStudy.level - 1,
    }, cardToStudy.id));
  };

  const handleCorrect = async () => {
    dispatch(updateCard(token, {
      ...cardToStudy,
      level: cardToStudy.level === 5
        ? 5
        : cardToStudy.level + 1,
    }, cardToStudy.id));
  };

  const handleGuess = (data: any) => {
    showNotes(true);
    if (!guessed) {
      setGuessed(true);
      if (data.guess.toLowerCase() === cardToStudy.front.toLowerCase()) {
        setIsCorrect("correct");
      } else {
        setIsCorrect("incorrect");
        setValue("guess", cardToStudy.front.toLowerCase());
      }
    } else {
      if (isCorrect === "correct") {
        setGuessed(false);
        handleCorrect();
      } else {
        setGuessed(false);
        handleIncorrect();
      }
      showNotes(false);
      setIsCorrect("");
      setValue("guess", "");
    }
  };

  const handleManualCheck = (bool: any) => {
    showNotes(true);
    if (!guessed) {
      setGuessed(true);
    } else {
      if (bool) {
        handleCorrect();
        setGuessed(false);
      } else {
        setGuessed(false);
        handleIncorrect();
      }
      setBlur(true);
      setGuessed(false);
      showNotes(false);
    }
  };

  const renderFront = (): any => {
    if (cardToStudy.type === "cloze") {
      return (
        <GuessForm guessed={guessed} isCorrect={isCorrect} onSubmit={handleSubmit(handleGuess)}>
          <input {...register("guess")} />
        </GuessForm>
      );
    }
    return (
      <div>
        {cardToStudy.front}
      </div>
    );
  };

  return (
    <Container>
      <CardFront>
        {renderFront()}
      </CardFront>

      <CardBack onClick={() => setBlur(!blur)} blur={blur}>
        {cardToStudy.back}
      </CardBack>

      <CardToolbar
        card={cardToStudy}
        handleIncorrect={handleManualCheck}
        handleCorrect={handleManualCheck}
        checked={guessed}
      />
    </Container>
  );
};

export default Card;
