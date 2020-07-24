import { FirebaseApp } from "./firebase";
let AddPersonFunc = (state) => {
  console.log("=>>>>>>>>>>", state);
  FirebaseApp.firestore()
    .collection("MissingPerson")
    .add(state)
    .then(() => {
      console.log("Add successfully");
    })
    .catch((err) => console.log(err));
};

let GetData = async () => {
  return new Promise((resolve, reject) => {
    FirebaseApp.firestore()
      .collection("MissingPerson")
      .where("approve", "==", true)
      .get()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

let Pandding = async () => {
  return new Promise((resolve, reject) => {
    FirebaseApp.firestore()
      .collection("MissingPerson")
      .where("approve", "==", false)
      .get()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
let Approveperson = async (val) => {
  return new Promise((resolve, reject) => {
    FirebaseApp.firestore()
      .collection("MissingPerson")
      .doc(val)
      .update({ approve: true })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
export { AddPersonFunc, GetData, Pandding, Approveperson };
