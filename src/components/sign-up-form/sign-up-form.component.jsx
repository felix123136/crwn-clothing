import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetForm();
    } catch (e) {
      alert(e.code);
    }
  };

  return (
    <SignUpContainer>
      <h2>I do not have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={onChangeHandler}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={onChangeHandler}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="password"
          minLength={6}
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="confirmPassword"
          minLength={6}
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
