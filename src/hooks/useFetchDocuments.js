import { useState, useEffect } from "react";

import { db } from "../firebase/config";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  let cancelled = false;

  useEffect(() => {
    function loadData() {
      // console.log("chamou", search);
      if (cancelled) return;
      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q;
        if (search) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search)
          );
          // console.log(q);
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }
        onSnapshot(q, (querySnapshot) => {
          // console.log("entrou no snap");
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => (cancelled = true);
  }, []);

  return { documents, loading, error };
};
