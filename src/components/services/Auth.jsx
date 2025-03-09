import { auth, app, db } from "./Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const createUser = async (
  email,
  password,
  firstName,
  lastName,
  phoneNumber
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      phoneNumber,
      email: user.email,
    });
    console.log("signup successfull... ");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
