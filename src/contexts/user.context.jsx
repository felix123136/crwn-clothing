import { createContext, useState } from "react";

// The actual context itself aka the memory bank to store the global value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// We wanna wrap this component into component that inside that we wanna access this context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
