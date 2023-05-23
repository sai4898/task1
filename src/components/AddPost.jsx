import React, { useState } from 'react';
import { storage, db } from "../firebase"

import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/storage';



function AddPost({ username }) {
    // const [image, setImage] = useState(null);
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            userName: username
                        })
                    })

            }
        )
        setCaption(' ')
        setImage('')
    }
    return (
        < div className="imagesupload">


            <h2 style={{ textAlign: 'center', margin: '15px' }}>Add New post</h2>


            <input className='file-input' type="file" onChange={handleChange} />
            <br />
            <input id="filled-basic" label="Caption here" variant="filled" onChange={event => setCaption(event.target.value)} value={caption} />
            <br />

            < progress className="progress" value={progress} max="100" />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"onClick={handleUpload}>
                ADD POST
            </button>



        </div>
    )
}

export default AddPost