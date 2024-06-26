import {useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/Firebase';

export default function useAuth() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      console.log('got user :', user);
      if (user) {
        setUsers(users);
      } else {
        setUsers(null);
      }
    });
    return unsub;
  }, []);

  return {users};
}
