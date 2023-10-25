import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import userPool from '../../../cognito-config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = userPool.getCurrentUser();

    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err) {
          alert('An unknown error occurred');

          return;
        }
        
        const idToken = session.getIdToken().getJwtToken();
        const decodedToken = jwt_decode(idToken);
        const { name, email, ['custom:position']: position, phone_number: phoneNumber } = decodedToken;
        
        setUser({ name, email, position, phoneNumber });
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};