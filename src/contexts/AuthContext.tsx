'use client';

import { IUser } from '@/interfaces/User';
import React, { createContext, useState } from 'react';

interface IAuthContext {
  user: IUser | undefined;
  setUser: (value: IUser | undefined) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

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
