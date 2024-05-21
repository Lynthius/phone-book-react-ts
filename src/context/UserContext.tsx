import { createContext, useState, Dispatch, SetStateAction } from "react";

type LoginContextProps = {
  // co chcemy żeby było widoczne poza kontekstem
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = createContext<LoginContextProps | null>(null);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

