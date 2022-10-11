import React, { useContext, useState } from 'react';
import {
  collection,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { chatdb } from '../firebase';
import { AuthContext } from '../context/AuthContext';
const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const handleSearch = async () => {
    const q = query(
      collection(chatdb, 'users'),
      where('displayName', '==', username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(chatdb, 'chats', combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(chatdb, 'chats', combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(chatdb, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(chatdb, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername('');
  };
  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Find a friend'
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className='userChat' onClick={handleSelect}>
          <img src={user.photoURL} alt='' />
          <div className='userChatInfo'>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
