import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getUserByEmail = async (email) => {
  const userQuery = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(userQuery);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    return userData;
  } else {
    return null;
  }
};
