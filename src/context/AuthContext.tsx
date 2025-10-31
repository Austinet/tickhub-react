import { useReducer, createContext, useContext } from "react";
import { reducer } from "../utils/helpers";

type AuthProp = {
  children: React.ReactNode;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  token?: string;
};

type MainContextProp = {
  dispatch: React.ActionDispatch<[action: any]>;
  ticketList: {
    id: string;
    title: string;
    description: string;
    status: "open" | "in_progress" | "closed";
  }[];
  usersDB: User[] | null;
  authenticatedUser: User | null;
};

const MainContext = createContext<MainContextProp>({} as MainContextProp);

export default function AuthContext ({ children }: AuthProp) {
  const data = {
    ticketList: [],
    usersDB: [],
    authenticatedUser: null,
  };

  if (localStorage.getItem("defaultValues") === null) {
    localStorage.setItem("defaultValues", JSON.stringify(data));
  }

  const defaultValues = localStorage.getItem("defaultValues");
  const [state, dispatch] = useReducer(reducer, JSON.parse(defaultValues));

  return (
    <MainContext.Provider
      value={{
        dispatch,
        ticketList: state.ticketList,
        usersDB: state.usersDB,
        authenticatedUser: state.authenticatedUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useAuthContext = () => useContext(MainContext);
