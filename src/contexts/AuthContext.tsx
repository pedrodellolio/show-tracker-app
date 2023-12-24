import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import useUserDetails from "../hooks/useUserDetails.ts";

interface AuthContextData {
  user: User | null;
  hasUserDetails: boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider = ({ children }: Props) => {
  const { getUserDetails } = useUserDetails();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasUserDetails, setHasUserDetails] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUserDetails(currentUser).then((hasDetails) => {
          if (!hasDetails) setHasUserDetails(false);
        });
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, hasUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
