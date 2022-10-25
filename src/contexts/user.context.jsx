import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// The actual context itself aka the memory bank to store the global value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// We wanna wrap this component into component that inside that we wanna access this context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // equivalent to this virtual function below:
    // auth.addEventListener('onChange', callback) that returns auth.removeEventListener
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
