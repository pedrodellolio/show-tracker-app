import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addUserDetails,
  getUserDetailsByUID,
} from "../services/userDetailsApi.ts";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

interface AuthContextData {
  user: User | null;
  hasUserDetails: boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider = ({ children }: Props) => {
  const { palette } = useTheme();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasUserDetails, setHasUserDetails] = useState(true);

  const { mutateAsync } = useMutation({
    mutationFn: addUserDetails,
    onSuccess: () => {
      setHasUserDetails(false);
    },
    onError: () => {
      alert("there was an error");
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        queryClient
          .fetchQuery({
            queryKey: ["userDetails", currentUser.uid],
            queryFn: () => getUserDetailsByUID(currentUser.uid),
          })
          .then((data) => {
            if (!data) {
              mutateAsync({
                userUID: currentUser.uid,
                userName: "",
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              });
            }
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
    return (
      <Backdrop
        sx={{
          backgroundColor: palette.background.default,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <AuthContext.Provider value={{ user, hasUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
