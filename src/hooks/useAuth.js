import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup -> lidando com memory leak
  // const [cancelled, setCancelled] = useState(false);
  let cancelled = false;

  const auth = getAuth();

  const checkIfIsCancelled = () => {
    console.log("cancelled", cancelled);
    if (cancelled) return;
  };

  const createUser = async (data) => {
    // console.log("check if is cancelled", checkIfIsCancelled());
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { name: data.name });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error, typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setError(false);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro!";
      }
      console.log("entrou catch", systemErrorMessage);

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => (cancelled = true);
    // setCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logout, login };
};
