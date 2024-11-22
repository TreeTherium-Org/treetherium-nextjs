import { db } from "@/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

export const getUserByEmail = async (email) => {
  const userQuery = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(userQuery);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    return { id: userDoc.id, ...userData };
  } else {
    return null;
  }
};

export const getUserByWalletAddress = async (address) => {
  const userQuery = query(
    collection(db, "users"),
    where("walletAddress", "==", address)
  );
  const querySnapshot = await getDocs(userQuery);
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    return { id: userDoc.id, ...userData };
  } else {
    return null;
  }
};

export const getUserById = async (documentId) => {
  const docRef = doc(collection(db, "users", documentId));
  const querySnapshot = await getDocs(docRef);
  if (!querySnapshot.empty) {
    const userData = querySnapshot.data();
    return userData;
  } else {
    return null;
  }
};
