import { useReducer, createContext, useContext } from "react";
import { reducer, defaultValues } from "../utils/helpers";


// Sets the default useReducer default values
// const defaultValues = {
//   ticket: [],
//   ticketTotal: 0,
//   isticketOpen: false,
//   isModalOpen: false,
//   modalMessage: "",
//   usersDB : [],
//   authenticatedUser: {} as User,
//   isUserLoggedIn: false,
// };

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
}

type MainContextProp = {
  dispatch: React.ActionDispatch<[action: any]>;
  //  defaultValues : {
  ticket: [];
  ticketTotal: number;
  isModalOpen: boolean;
  modalMessage: string;
  usersDB:
     User[]
    | null;
  isUserLoggedIn: boolean;
  authenticatedUser: User;
  // };
};

const MainContext = createContext<MainContextProp>({} as MainContextProp);

const AuthContext = ({ children }: AuthProp) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  return (
    <MainContext.Provider
      value={{
        dispatch,
        ticket: state.ticket,
        ticketTotal: state.ticketTotal,
        isModalOpen: state.isModalOpen,
        modalMessage: state.modalMessage,
        usersDB: state.usersDB,
        authenticatedUser: state.authenticatedUser,
        isUserLoggedIn: state.isUserLoggedIn,
      }}
    >
      {/* <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes> */}
      {children}
    </MainContext.Provider>
  );
};

export const useAuthContext = () => useContext(MainContext);

export default AuthContext;
