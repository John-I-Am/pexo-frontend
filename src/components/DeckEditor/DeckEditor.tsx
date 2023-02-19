/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from "react";
import { Modal, ActionIcon, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useForm } from "react-hook-form";

import {
  deleteDeck, updateDeck,
} from "../../reducers/deckReducer";
import {
  Container, TitleInput, EditorTools,
} from "./styles";
import { Error } from "../../sharedStyles";
import CardEditor from "../CardEditor/CardEditor";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

import { ReactComponent as IconAdd } from "../../assets/add.svg";
import { ReactComponent as IconDelete } from "../../assets/delete.svg";
import { ReactComponent as IconEdit } from "../../assets/edit.svg";

type FormValues = {
  title: string;
};

const DeckEditor = (): ReactElement => {
  const dispatch = useAppDispatch();
  const activeDeck: any = useAppSelector((state: any) => state.decks.activeDeck);
  const token: string = useAppSelector((state: any) => state.user?.token);

  const [cardEditorOpened, setOpened] = useState<boolean>(false);
  const [titleEditorOpened, setOpened2] = useState<boolean>(false);

  const display = activeDeck.title === "" ? { display: "none" } : { display: "" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleChangeTitle = (data: {title: string}): void => {
    dispatch(updateDeck(token, { ...activeDeck, title: data.title } as any));
    setOpened2(false);
  };

  const handleDeleteDeck = (): void => {
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Deleted decks are unrecoverable.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => dispatch(deleteDeck(token, activeDeck as any)),
    });
  };

  return (
    <Container>
      <EditorTools style={display}>
        <div>
          <ActionIcon onClick={() => setOpened(true)}><IconAdd /></ActionIcon>
          <p>New Card</p>
        </div>
        <div>
          <ActionIcon onClick={handleDeleteDeck}><IconDelete /></ActionIcon>
          <p>Delete Deck</p>
        </div>
        <div>
          <ActionIcon onClick={() => setOpened2(true)}><IconEdit /></ActionIcon>
          <p>Edit Title</p>
        </div>
      </EditorTools>

      <Modal
        withCloseButton={false}
        opened={titleEditorOpened}
        onClose={() => setOpened2(false)}
        title="Title Editor"
      >
        <Error role="alert">{errors.title && errors.title.message}</Error>
        <form onSubmit={handleSubmit(handleChangeTitle)}>
          <TitleInput
            {...register("title", {
              required: "required",
              pattern: {
                value: /^[a-zA-Z0-9_ ]{1,20}$/i,
                message: "length exceeded / invalid characters",
              },
            })}
          />
        </form>
      </Modal>

      <Modal
        size="xl"
        withCloseButton={false}
        opened={cardEditorOpened}
        onClose={() => setOpened(false)}
      >
        <CardEditor card={undefined} />
      </Modal>
    </Container>

  );
};

export default DeckEditor;
