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
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "config/firebaseConfig";
import { setCookie, destroyCookie } from "nookies";
import Router from "next/router";
import { ToastId, useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "utils/validateFields";
import { verifyErrorCode } from "utils/verifyErrorCode";

type AuthMethodsType = {
  createUserWithEmailAndPassword(
    name: string,
    email: string,
    password: string,
    captchaToken: string | null
  ): Promise<ToastId | undefined>;
  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<ToastId | undefined>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
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
    forgotPassword,
  };

  const toast = useToast({
    duration: 4500,
    isClosable: true,
    position: "top-right",
  });

  async function createUserWithEmailAndPassword(
    name: string,
    email: string,
    password: string,
    captchaToken: string | null
  ) {
    if (validateName(name)) {
      return toast({
        title: "Error",
        description: "Please, type your name correctly",
        status: "error",
      });
    } else if (validateEmail(email)) {
      return toast({
        title: "Error",
        description: "Please, type your e-mail correctly",
        status: "error",
      });
    } else if (validatePassword(password)) {
      return toast({
        title: "Error",
        description:
          "Password must be 6-32 characters in length and must contain at least one lower case character, one upper case character and one number.",
        status: "error",
        duration: 7500,
      });
    } else if (!captchaToken) {
      return toast({
        title: "Error",
        description: "Please, check the captcha",
        status: "error",
      });
    }
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
      if (err instanceof FirebaseError) {
        toast({
          title: "Error",
          description: verifyErrorCode(err.code) || err.message,
          status: "error",
        });
      }
    }
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    if (validateEmail(email)) {
      return toast({
        title: "Error",
        description: "Please, type your e-mail correctly",
        status: "error",
      });
    } else if (validatePassword(password)) {
      return toast({
        title: "Error",
        description: "Please, type a strong password",
        status: "error",
      });
    }
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
      if (err instanceof FirebaseError) {
        toast({
          title: "Error",
          description: verifyErrorCode(err.code) || err.message,
          status: "error",
        });
      }
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

  async function forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      Router.push("/signIn");
      toast({
        title: "Success",
        description: "Please, check your e-mail.",
        status: "success",
      });
    } catch (err) {
      if (err instanceof FirebaseError) {
        toast({
          title: "Error",
          description: verifyErrorCode(err.code) || err.message,
          status: "error",
        });
      }
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
