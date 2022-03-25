import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword as FirebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as FirebaseSignInEmail,
  signOut as FirebaseSignOut,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  User,
  onIdTokenChanged,
} from "firebase/auth";
import { auth } from "config/firebaseConfig";
import { setCookie, destroyCookie } from "nookies";
import Router from "next/router";

type AuthMethodsType = {
  createUserWithEmailAndPassword(
    name: string,
    email: string,
    password: string
  ): Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  authMethods: AuthMethodsType;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const authMethods = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
  };

  async function createUserWithEmailAndPassword(
    name: string,
    email: string,
    password: string
  ) {
    try {
      const { user } = await FirebaseCreateUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await user.getIdToken();
      await updateProfile(user, { displayName: name });
      console.log(user);
      setCookie(undefined, "MyDiary-token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      setUser(user);
      Router.push("/app");
    } catch (err) {
      console.log(err);
    }
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    try {
      const { user } = await FirebaseSignInEmail(auth, email, password);
      const token = await user.getIdToken();
      console.log(user);
      setCookie(undefined, "MyDiary-token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      setUser(user);
      Router.push("/app");
    } catch (err) {
      console.log(err);
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const token = await user.getIdToken();
      console.log(user);
      setCookie(undefined, "MyDiary-token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      setUser(user);
      Router.push("/app");
    } catch (err) {
      console.log(err);
    }
  }

  async function signOut() {
    try {
      await FirebaseSignOut(auth);
      destroyCookie(undefined, "MyDiary-token");
      setUser(null);
      Router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, authMethods }}>
      {children}
    </AuthContext.Provider>
  );
}
