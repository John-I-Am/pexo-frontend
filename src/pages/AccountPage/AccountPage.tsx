/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Container } from "./styles";
import { Error } from "../../sharedStyles";
import { updateUser } from "../../reducers/usersReducer";

type FormValues = {
  name: string,
  surname: string,
  email: string,
}

const AccountPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: any) => state.user);

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    setError: setErrorInfo,
    formState: { errors: errorsInfo, isDirty: isDirtyInfo },
  }: any = useForm<any>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    getValues: getValuesPassword,
    setError: setErrorPassword,
    formState: { errors: errorsPassword, isDirty: isDirtyPassword },
  }: any = useForm();

  const handleUpdateUser = async (data: FormValues) => {
    const updatedUser = {
      name: data.name || currentUser.name,
      surname: data.surname || currentUser.surname,
      email: data.email || currentUser.email,
    };

    await dispatch(updateUser({
      token: currentUser.token,
      userId: currentUser.info.id,
      updatedUser,
    }));

    // if (response === "email not unique") {
    //   setErrorInfo("email", {
    //     type: "manual",
    //     message: "email unavailable",
    //   });
    // } else {
    //   showNotification({
    //     title: "Details changed",
    //     message: "Successfully changed personal info",
    //   });
    // }
  };

  const handleUpdatePassword = async (data: any): Promise<void> => {
    // eslint-disable-next-line max-len
    await dispatch(updateUser({ token: currentUser.token, userId: currentUser.info.id, updatedUser: data }));
    // if (response === "invalid token") {
    //   setErrorPassword("currentPassword", {
    //     type: "manual",
    //     message: "Wrong password",
    //   });
    // } else {
    //   showNotification({
    //     title: "Details changed",
    //     message: "Successfully changed passwords",
    //   });
    // }
  };

  return (
    <Container>
      <h1> My Account </h1>
      <section>
        <div>
          <h2>Basics</h2>
          <p>Your Contact details</p>
        </div>
        <div>
          <form onSubmit={handleSubmitInfo(handleUpdateUser)}>
            <label htmlFor="name">
              Name
              <input
                defaultValue={currentUser.info.name}
                {...registerInfo("name", {
                  pattern: {
                    value: /^[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
            </label>

            <label htmlFor="surname">
              Surname
              <input
                defaultValue={currentUser.info.surname}
                {...registerInfo("surname", {
                  pattern: {
                    value: /[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
            </label>

            <label htmlFor="email">
              Email Address
              <input
                defaultValue={currentUser.info.email}
                {...registerInfo("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
            </label>
            <span>
              <Error role="alert">{errorsInfo.email && errorsInfo.email.message}</Error>
            </span>

            {isDirtyInfo && <Button type="submit">submit</Button>}
          </form>
        </div>
      </section>

      <hr />

      <section>
        <div>
          <h2>Password</h2>
          <p>Change your password</p>
        </div>
        <div>
          <form onSubmit={handleSubmitPassword(handleUpdatePassword)}>
            <label htmlFor="currentPassword">
              password
              <input
                type="password"
                {...registerPassword("currentPassword", {
                  required: "required",
                  minLength: {
                    value: 8,
                    message: "minimum of 8 characters",
                  },
                })}
              />
            </label>

            <label htmlFor="newPassword">
              new password
              <input
                type="password"
                {...registerPassword("newPassword", {
                  required: "required",
                  minLength: {
                    value: 8,
                    message: "minimum of 8 characters",
                  },
                })}
              />
            </label>

            <label htmlFor="confirmNewPassword">
              confirm
              <input
                type="password"
                {...registerPassword("newPasswordConfirm", {
                  required: "required",
                  minLength: {
                    value: 8,
                    message: "minimum of 8 characters",
                  },
                  validate: {
                    value: (value: any) => value === getValuesPassword("newPassword") || "password does not match",
                  },
                })}
              />
            </label>
            <span>
              <Error role="alert">
                {errorsPassword.newPasswordConfirm && errorsPassword.newPasswordConfirm.message}
                {errorsPassword.currentPassword && errorsPassword.currentPassword.message}
              </Error>
            </span>

            {isDirtyPassword && <Button type="submit">submit</Button>}
          </form>
        </div>
      </section>
    </Container>
  );
};

export default AccountPage;
