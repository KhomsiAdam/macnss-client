import { createContext, useState } from 'react';

interface AuthContextInterface {
  token: string;
  setToken: (token: string) => void;
}
const AuthContext = createContext<AuthContextInterface>({
  token: '',
  setToken: () => {},
});

export const AuthProvider = (props: any) => {
  const [token, setToken] = useState<string>('');

  if (token === '' && localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'));
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
