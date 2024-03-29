import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export type AuthUser = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  createdAt: string;
};

const useAuth = () => {
  const [authUser, setAuthUser] = useState<AuthUser | undefined>();
  const [authError, setAuthError] = useState<Error | undefined>();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setAuthUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            createdAt: user.metadata.creationTime,
          } as AuthUser);
        } else {
          setAuthUser(undefined);
        }
        return () => {
          unsubscribe;
        };
      } catch (error) {
        if (error instanceof Error) {
          setAuthError(error);
          setAuthUser(undefined);
        }
        console.log(error);
      }
    });
  }, [auth]);
  return [authUser, authError];
};

export default useAuth;
