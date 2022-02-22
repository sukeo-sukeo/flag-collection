import firebase from "../../config/firebase.js"
import { doc, getFirestore, collection, addDoc, getDoc, setDoc, query, where, getDocs, updateDoc, deleteField, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

export const getData = async (uid) => {
  const data = [];
  const itemsRef = collection(db, "items");
  const docs = await getDocs(query(itemsRef, where("uid", "==", uid)));
  docs.forEach((d) => data.push(d.data()));
  console.log(data);
  return data
}

export const addData = async (data, uid) => {
  for (const d of data) {
    await addDoc(collection(db, "items"), {
      img: d.img,
      name: d.name,
      api: d.api_name,
      uid: uid,
      created: serverTimestamp()
    });
  }
}

export const checkUserInFireStore = async (uid) => {
  let user

  const usersRef = collection(db, "users");
  const docs = await getDocs(query(usersRef, where("uid", "==", uid)));
  docs.forEach(d => {
    if (d.data().uid === uid) {
      user = d.data()
    }
  });
  return user
}

export const addUserInFireStore = async (user) => {
  console.log(user);
  const docRef = await addDoc(collection(db, "items"), {tmp: ""});
  user.iid = docRef.id;

  await updateDoc(doc(db, "items", user.iid), {
    tmp: deleteField()
  });

  await addDoc(collection(db, "users"), user);

  return user
}