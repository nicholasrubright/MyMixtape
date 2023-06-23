import { useReducer } from "react";
import { StateProps } from "../types";
import { UserState } from "./types";
import UserReducer from "./userReducer";
import UserContext from "./userContext";

export const UserInitialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

const UserState = (props: StateProps) => {
  const { children } = props;

  const [state, dispatch] = useReducer(UserReducer, UserInitialState);

  // actions

  return (
    <UserContext.Provider value={{ user: state }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
