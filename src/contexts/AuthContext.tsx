'use client';

import React, { createContext, useState } from 'react';
import { IUser } from '../interfaces/User';

interface IAuthContext {
  user: IUser | undefined;
  setUser: (value: IUser | undefined) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState(undefined);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
