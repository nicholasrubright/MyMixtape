import { createContext, useState } from "react";
import { UserContextType, UserStateType } from "./types";
import { api } from "@/api/mixtape.api";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (props: ProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<UserStateType>({
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
    setUser({
      ...user,
      isLoading: true,
    });

    const response = await api.getUserProfile(token);

    setUser({
      ...user,
      isLoading: false,
      profile: response,
    });
  };

  return (
    <UserContext.Provider value={{ user, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

interface ProviderProps {
  children: JSX.Element;
}
