import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

function UserDetail() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersRef = db.collection('users');
        const query = usersRef.where('username', '==', username);
        const snapshot = await query.get();
console.log(snapshot,'22')
        if (snapshot.empty) {
          // User not found
          console.log('User not found');
          return;
        }

        // Assume only one user document matches the username
        const userData = snapshot.docs[0].data();
        setUser(userData);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [username]);
  console.log(user.username)
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Detail</h2>
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>
      
      {/* Render additional user details */}
    </div>
  );
}

export default UserDetail;
