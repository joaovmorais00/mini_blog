import { useState, useEffect } from "react";

import { db } from "../firebase/config";

import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  let cancelled = false;

  useEffect(() => {
    const loadDocument = async () => {
      // console.log("chamou loadDocument");
      if (cancelled) return;
      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data(), "docSnap");
        setDocument(docSnap.data());
        setLoading(false);
      } catch (error) {
        // console.log(error);
        setError(error);
        setLoading(false);
      }
    };
    loadDocument();
  }, [docCollection, id]);

  useEffect(() => {
    return () => (cancelled = true);
  }, []);

  return { document, loading, error };
};
