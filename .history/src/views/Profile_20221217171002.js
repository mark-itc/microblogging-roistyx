import { useState, useEffect, useReducer, form, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../contexts/AuthContext";
import "./Profile.css";
import { TweetContext } from "../contexts/TweetContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  addDocs,
  query, 
  where, 
  updateDoc, 
  
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  listAll
} from "firebase/storage";
// import FileUploader from "react-firebase-file-uploader";
import app from "../firebase";
import { width } from "@mui/system";
import { v4 } from "uuid";

const storage = getStorage(app);

// const firestoreIntance = getFirestore(app)
// const postCollection = collection(firestoreIntance, 'posts')

const ACTIONS = {
  PIC_UPLOADER: "pic_upload",
  PIC_UPDATE: "pic-update",
};

const initialProfileState = {
  userId: "",
  userName: "",
  profilePic: "https://placekitten.com/200/287",
  uid: null
};



function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PIC_UPLOADER:
      return {
        ...state,
        [action.key]: action.value,
      }
      case ACTIONS.PIC_UPDATE:
      return {
        ...state,
      [action.key]: action.value,
      
      }
    default:
      return state;
  }
}



export function Profile() {
  const [show, setShow] = useState(false);
  const [picUpdate, setPicUpdate] = useState([]);
  const [progress, setProgress] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialProfileState);
  const { currentUser } = useAuth();
  // console.log(currentUser.uid)
  const { picUrl, setPicUrl, newCurrentUser, 
    setNewCurrentUser, posts } = useContext(TweetContext)

    useEffect(() => {
      const storageRef = ref(storage, `${currentUser.uid}/profile-pic`);
      
      const listRef = ref(storage, `/`);

// Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
        console.log("res",res)
        res.prefixes.forEach((folderRef) => {
        console.log("folderRef",folderRef)
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
      res.items.forEach((itemRef) => {
        console.log("itemRef", itemRef)
        getDownloadURL(itemRef).then((url)=> {
          console.log("",url)
          const stringy = new Array (JSON.stringify(url))

          console.log("currentUser.uid",currentUser.uid)
        console.log(url.includes("P0I81TJdUgNBcppkMALla7WOXNw2"))
      })
    });
  }).catch((error) => {
    console.log("error",error)
  });
  
     
      // console.log("fileRef",storageRef)
})
   

  useEffect(() => {
   async function func(){
    const firestoreIntance = getFirestore(app);
    const postCollection = collection(firestoreIntance, "posts");
    
    const { docs } = await getDocs(postCollection);
    
    docs.forEach(doc => {
      getTweetList(doc.id, doc.data().uid === currentUser.uid)
    }) 
   } func()
       }, [posts])
  
    
  
  async function getTweetList(id, bol) {
        if (bol) {
          const firestoreIntance = getFirestore(app);
        const docRef = doc(firestoreIntance, "posts", id);
      // console.log(" Deep picUrl", picUrl)
      const data = {
        avatar: picUrl,
      }

      updateDoc(docRef, data)
        .catch((error) => {
          console.log(error);
        })
          // console.log("true", bol)
        }
        // else {
        //   console.log("false", bol)
        // }
    }
  


  function handleSubmit(e) {
    // if(true) {
    //   getTweetList()
    //   return
    // }
    if (state.profilePic === null) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/${currentUser.uid}`);

    const uploadTask = uploadBytesResumable(storageRef, state.profilePic);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress

        setProgress(percent + "%");
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setPicUrl(url);
          console.log("url", url)
          setProgress("")
        });
      }
    );
  }
//  console.log("newCurrentUser",newCurrentUser)
  return (
    <>
      <Form.Group controlId="formFileDisabled" className="mb-3">
        <Form.Label>Upload profile picture</Form.Label>
        <Form.Control
          onChange={(e) =>
            dispatch({
              type: ACTIONS.PIC_UPLOADER,
              value: e.target.files[0],
              key: "profilePic",
              userId: currentUser.uid,
            })
          }
          type="file"
          accept="image/*"
        />
        <Button onClick={handleSubmit}>Upload</Button>
      </Form.Group>
      {currentUser ? <div><img alt="" style={{ width: "50px" }} src={``} /><p>{currentUser.uid}, {currentUser.email}</p></div> : "No user logged in" }
      
      <h3>{progress}</h3>
    </>
  );
}
