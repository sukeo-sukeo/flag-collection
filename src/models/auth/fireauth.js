import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const createUserObj = (userData) => {
  const user = {};
  user.uid = userData.uid;
  user.name = userData.displayName;
  user.email = userData.email;
  user.photo = userData.photoURL;
  return user
}

export const login = async () => {
  const result = await signInWithPopup(auth, provider);
  const userData = result.user;
  const user = createUserObj(userData);
  return user
}

export const logout = () => {
  signOut(auth).then((tmp) => {
    alert("logoutしました")
  }).catch((e) => {
    console.log(e.message);
  })
}

export const onAuthCheck = async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        console.log("login状態です");
        const user = createUserObj(userData)
        resolve(user)
      } else {
        // ログアウト状態
        console.log("logout状態です");
        resolve("")
      }
    });
  })
}