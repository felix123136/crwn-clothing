import { useState, useContext } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { UserContext } from "../../contexts/user.context";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    setCurrentUser(user);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
    } catch (e) {
      alert("Invalid email/password");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with email And password</span>
      <form onSubmit={onSubmitHandler}>
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
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
