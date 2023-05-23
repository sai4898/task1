import React, { useEffect, useState } from 'react';
// import './Modal.css';
import {auth, db} from '../firebase'
import AddPost from './AddPost';
import Posts from './Posts';

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState('doddisaikumar45898@gmail.com');
  const [password, setPassword] = useState('111111');

  const [username, setUsername] = useState('SSSSSS');
  const [user, setUser] = useState(null);
  const [posts, setposts] = useState([]);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
    setOpen(true) // Close signup modal
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
    setOpen(false)
    // setUser(false) 
  };
  
  const opemModal = () => {
    setOpen(false)
    setIsSignupOpen(true  );
    setIsLoginOpen(false);
  }
  const closeSignupModal = () => {
    setIsSignupOpen(false);
  };


  const signUp = (event) => {
    event.preventDefault();
    auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName: username,
            });
        })
        .catch((error) => alert(error.message));

        setIsSignupOpen(false)
        // setUser(false)
    // setIsLoginOpen(false);
    // window.location.reload(false);
};

const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message));

    // setIsSignupOpen(false);
    // window.location.reload(false);
    setIsLoginOpen(false);
};


useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            setUser(authUser);
        } else {
            setUser(null);
        }
    });

    return () => {
        unsubscribe();
    };
}, [user, username]);

useEffect(() => {
    db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
            setposts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    post: doc.data(),
                }))
            );
        });
}, []);



  return (
    <div className='container'>
     <div  className='flex '>
     {/* {user ? username : ''} */}
     <img
            className=''
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXoBfrgtfmrZ0fd5LywO1aQhGZmloxhmeVaw&usqp=CAU'
            alt='insta'
            height={70}
            width={140}
            />
            {user ? (
                <button onClick={() => auth.signOut()}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4">
                Logout
                 </button> 
            ) : (
           
       <>
       <button onClick={openLoginModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4">
                          Login
                      </button><button onClick={openSignupModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4">
                              Sign Up
                          </button>
                          </>
                    )}
      </div>
      {isLoginOpen && (
        <div className="flex justify-center items-center  mt-5">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={signIn}
            >
              Sign In
            </button>
          
          </div>
        </form>
      </div>
      )}



      {isSignupOpen && (
      <div className="flex justify-center items-center  mt-5">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
       
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            UserName
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
           <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight "
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={signUp}
          >
            Sign Up
          </button>
        
        </div>
      </form>

      
    </div>
      )}
   
       
        {user && user.displayName ? (

                <>
                    {/* <h2 style={{ textAlign: ' center' }}>userid: {user.displayName}</h2> */}
                    <AddPost username={user.displayName} />
                </>
            ) : (
              <div className='flex justify-center items-center  mt-5'>
              Please {''} <b style={{ cursor: 'pointer', color: 'Blue' }}> Login</b>/<b  style={{ cursor: 'pointer', color: 'Blue' }}>Register</b> to Add New Post
               </div>
            )}
        { !open && (
            <div className="app__posts" onClick={opemModal}>
                <div className="app__postright">

                    {/* {user && user.displayName && <h2 style={{ textAlign: ' center' }}>userid: {user.displayName}</h2>} */}
                    <br />
                    {posts.map(({ id, post }) => (
                        <Posts
                            key={id}
                            postId={id}
                            user={user}
                            userName={post.userName}
                            caption={post.caption}
                            imageURL={post.imageURL}
                        />

                        ))}
                        </div>
              </div>
        )}
    </div>
    
  );
};

export default Home;
