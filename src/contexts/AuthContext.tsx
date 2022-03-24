import { createContext, ReactNode, useState } from "react";
import { signInWithEmailAndPassword as SignInEmail, User } from "firebase/auth";
import { auth } from "config/firebaseConfig";
import { setCookie } from "nookies";
import Router from "next/router";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signInWithEmailAndPassword(email: string, password: string) {
    try {
      const { user } = await SignInEmail(auth, email, password);
      const token = await user.getIdToken();
      user.getIdTokenResult;
      console.log(user);
      setCookie(undefined, "MyDiary-token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      //TODO: Verify JWT Token
      setUser(user);

      Router.push("/app");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signInWithEmailAndPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
