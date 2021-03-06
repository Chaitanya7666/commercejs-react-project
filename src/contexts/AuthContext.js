import React, { useState, useContext, useEffect } from "react";

import { auth } from "../components/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  //   const auth = getAuth();

  function signup(auth, email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout(auth) {
    return signOut(auth);
  }

  function passwordReset(auth, email, actionCodeSettings){
    return sendPasswordResetEmail(auth, email, actionCodeSettings);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    passwordReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
