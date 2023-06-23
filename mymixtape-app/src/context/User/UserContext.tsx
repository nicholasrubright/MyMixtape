import { createContext, useState } from "react";
import { UserContextType, UserStateType } from "./types";
import { api } from "@/api/mixtape.api";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (props: ProviderProps) => {
  const { children } = props;

  const [state, setState] = useState<UserStateType>({
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
  });

  const getProfile = async (token: string) => {
    setState({
      ...state,
      isLoading: true,
    });

    const response = await api.getUserProfile(token);

    setState({
      ...state,
      isLoading: false,
      profile: response,
    });
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
