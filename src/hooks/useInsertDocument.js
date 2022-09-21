import { useRef, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      console.log("chegou default");
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // const [cancelled, setCancelled] = useState(false);
  // const cancelled = useRef(false);
  let cancelled = false;

  const checkCancelBeforeDispatch = (action) => {
    console.log("antes do check", action, cancelled);

    if (!cancelled) {
      console.log("entrou cancelled");
      dispatch(action);
      console.log("no check", action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );
      console.log(insertedDocument);
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      console.log(error);
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
      dispatch({ type: "ERROR", payload: error.message });
    }

    console.log("Cancelled aqui", cancelled);
  };

  useEffect(() => {
    return () => {
      // cancelled.current = true;
      // setCancelled(true);
      cancelled = true;
    };
  }, []);

  return { insertDocument, response };
};
