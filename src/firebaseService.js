import * as firebase from "firebase"; // 4.3.0
require("firebase/firestore");

var firebaseConfig = {

};

// Ensure that you do not login twice.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

/**
 *
 */
export const authCheck = async () => {
  return new Promise(resolve => {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log("We are authenticated now!");
        return resolve(user);
      } else {
        console.log("We did not authenticate.");
        return resolve(null);
      }
    });
  });
};

/**
 *
 * @param {*} email
 * @param {*} password
 */
export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};
/**
 *
 */
export const logOut = () => {
  return firebase.auth().signOut();
};

/**
 *
 * @param {*} userInfo.lastName
 * @param {*} userInfo.firstName
 * @param {*} userInfo.email
 * @param {*} userInfo.password
 */
export const registerUser = userInfo => {
  console.log("in registerUser");
  return firebase
    .auth()
    .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
    .then(newUser => {
      let { email, firstName, lastName } = userInfo;

      return firebase
        .firestore()
        .collection("users")
        .doc(newUser.uid)
        .set({
          email,
          firstName,
          lastName
        });
    });
};

/**
 *
 */
export const getUserProfile = () => {
  let user = firebase.auth().currentUser;
  console.log(user);

  var userRef = firebase
    .firestore()
    .collection("users")
    .doc(user.uid);

  return userRef
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return {
          ...doc.data(),
          id: user.uid
        };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!", user.uid);
        return null;
      }
    })
    .catch(error => {
      console.log("Error getting document:", error);
    });
};

/**
 *
 * @param {*} param0
 */
export const queryObjectCollection = ({ collection }) => {
  let currentUserId = firebase.auth().currentUser.uid;
  let collectionRef = firebase.firestore().collection(collection);

  let results = [];

  return (
    collectionRef
      //.where('owner', '==', currentUserId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          results.push({
            id: doc.id,
            ...doc.data()
          });
        });
        return results;
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
        return error;
      })
  );
};

/**
 *
 * @param {*} _collection - name of collection to add object to
 * @param {*} _objectData - data to add to the collection
 */
export const addObjectToCollection = ({ collection, objectData }) => {
  let currentUserId = firebase.auth().currentUser.uid;
  let collectionRef = firebase.firestore().collection(collection);

  return collectionRef
    .add({
      owner: currentUserId,
      content: { ...objectData },
      created: new Date().getTime(),
      updated: new Date().getTime()
    })
    .then(
      async doc => {
        console.log(`addObjectToCollection ${collection} ${doc}`);

        let docData = await getByRef(doc);
        return docData;
      },
      error => {
        console.log(`ERROR: addObjectToCollection ${collection} ${error}`);
        return error;
      }
    )
    .catch(e => {
      console.log(`ERROR: addObjectToCollection ${collection} ${e}`);
      return e;
    });
};

export const getByRef = _documentRef => {
  return _documentRef
    .get()
    .then(doc => {
      if (doc.exists) {
        return {...doc.data(), id: _documentRef.id};
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    })
    .catch(error => {
      console.log("Error getting document:", error);
      return error;
    });
};

/**
 *
 * @param {*} blob
 */
export const uploadImage = blob => {
  return new Promise((resolve, reject) => {
    let currentUserId = firebase.auth().currentUser.uid;
    const ref = firebase
      .storage()
      .ref(currentUserId)
      .child(new Date().getTime() + "-" + currentUserId + ".jpeg");

    const task = ref.put(blob);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot =>
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      error => {
        console.log("error", error);
        return reject(error);
      },
      result => {
        return resolve({
          url: task.snapshot.downloadURL,
          contentType: task.snapshot.metadata.contentType,
          name: task.snapshot.metadata.name,
          size: task.snapshot.metadata.size
        });
      }
    );
  });
};
