import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, database, storage } from "../../FirebaseConfigs/Firesbase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function AuthDummy() {
  const [data, setData] = useState("");
  let googleProvider = new GoogleAuthProvider();
  const collectionRef = collection(database, "users");

  const inputChangeHandler = (e) => {
    const newInput = { [e.target.value]: e.target.value };
    setData({ ...data, ...newInput });
  };
  const submitHandler = (e) => {
    // signInWithPopup(auth, googleProvider).then().catch();
    // setTimeout(() => {
    //   e.preventDefault();
      console.log(data);
    // }, 1000);
  };

  /* Create Data to Firestore database */
  const addDataHandler = () => {
    addDoc(collectionRef, {
      email: data.email,
      password: data.password,
    })
      .then(() => {
        alert("Successful");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  /* Read Data from Firestore database */
  const readDataHandler = () => {
    getDocs(collectionRef)
      .then((res) => {
        console.log(
          res.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  /* Update Data from Firestore database */
  const updateData = (id) => {
    const docToUpdate = doc(database, "users", id);
    updateDoc(docToUpdate, {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        console.log(res);
        alert("Updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  /* Delete Data from Firestore database */
  const deleteData = (id) => {
    const docToDelete = doc(database, "users", id);
    deleteDoc(docToDelete)
      .then(() => {
        alert(`Data with ${id} has been successfully deleted`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="mx-auto p-6 gird grid-cols-1 justify-center"
    >
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          value={data.email}
          type="email"
          placeholder="Enter Email"
          onChange={(e) => inputChangeHandler(e)}
          autoComplete="false"
          autoCorrect="false"
        />
      </div>
      <div>
        <label htmlFor="password">Enter Password</label>
        <input
          value={data.password}
          type="password"
          placeholder="Enter Password"
          onChange={(e) => inputChangeHandler(e)}
          autoComplete="false"
          autoCorrect="false"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
