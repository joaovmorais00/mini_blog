import { useState, useEffect, useRef } from "react";

import { db } from "../firebase/config";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocument = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const cancelled = useRef(false);

  useEffect(() => {
    async function loadData() {
      console.log("chamou", search);
      if (cancelled.current) return;
      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;
        if (search) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search)
          );
          console.log(q);
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }
        onSnapshot(q, (querySnapshot) => {
          console.log("entrou no snap");
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
    return () => (cancelled.current = true);
  }, []);

  return { documents, loading, error };
};
