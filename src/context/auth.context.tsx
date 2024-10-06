import React, { createContext, useState, useContext, useEffect } from "react";
import { GoogleCredentialResponse } from "@react-oauth/google";

interface AuthContextType {
  user: any;
  isUserLoggedIn: boolean;
  isVerifyingUserAuthentication: boolean;
  login: (response: GoogleCredentialResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isVerifyingUserAuthentication, setIsVerifyingUserAuthentication] =
    useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");
      console.log(storedUser);
      if (storedUser) {
        // Simulate backend validation (replace with actual backend call if needed)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUser(JSON.parse(storedUser));
        setIsUserLoggedIn(true);
      }
      setIsVerifyingUserAuthentication(false);
    };

    loadUser();
  }, []);

  const login = (response: GoogleCredentialResponse) => {
    console.log(response);
    setIsUserLoggedIn(true);
    localStorage.setItem("user", "usuario");
    // Uncomment and adjust this section when ready to handle the login
    // const decodedToken: any = jwtDecode(response.credential);
    // const userData = {
    //   id: decodedToken.sub,
    //   name: decodedToken.name,
    //   email: decodedToken.email,
    //   picture: decodedToken.picture,
    //   token: response.credential,
    // };
    // setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoggedIn,
        isVerifyingUserAuthentication,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
