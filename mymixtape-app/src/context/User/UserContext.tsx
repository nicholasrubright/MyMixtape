import { createContext, useReducer, useState } from "react";
import { UserContextType, UserStateType } from "./types";
import { api } from "@/api/mixtape.api";
import UserReducer from "./UserReducer";
import {
  fetchProfile,
  fetchProfileFailure,
  fetchProfileSuccess,
} from "./UserActions";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (props: ProviderProps) => {
  const { children } = props;

  const initialState: UserStateType = {
    profile: {
      id: "0",
      name: "",
      images: [
        {
          height: 0,
          width: 0,
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
        },
      ],
    },
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getProfile = async (token: string) => {
    try {
      dispatch(fetchProfile());

      const response = await api.getUserProfile(token);

      dispatch(fetchProfileSuccess(response));
    } catch (error) {
      dispatch(
        fetchProfileFailure("There was a problem fetching user profile")
      );
    }
  };

  return (
    <UserContext.Provider value={{ userState: state, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

interface ProviderProps {
  children: JSX.Element;
}
