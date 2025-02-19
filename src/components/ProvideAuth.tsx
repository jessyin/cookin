import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../app/contexts";
import { User } from "../models";
import {
  googleLogout,
  GoogleOAuthProvider,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import { getUserProfile, isAdmin } from "../utils/authUtils";

const adminScopes = [
  "https://www.googleapis.com/auth/photospicker.mediaitems.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

type ProvideAuthProps = {
  children?: ReactNode
}

export default function ProvideAuth({ children }: ProvideAuthProps) {
  const [user, setUser] = useState<User | null>(null);

  const signout = () => {
    googleLogout();
    setUser(null);
  };

  const onSignInSuccess = (token: TokenResponse) => {
    getUserProfile(token.access_token)
      .then((profile) => {
        if (isAdmin(profile.data)) {
          setUser({
            accessToken: token.access_token,
            name: profile.data.name,
            picture: profile.data.picture,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        googleLogout();
      });
  };

  const onSignInError = () => {
    alert("Failed to sign in :( Try again?");
  };

  const signin = useGoogleLogin({
    onSuccess: onSignInSuccess,
    onError: onSignInError,
    onNonOAuthError: onSignInError,
    scope: adminScopes.join(" "),
  });

  const auth = {
    user,
    signin,
    signout,
  };

  return (
    <GoogleOAuthProvider clientId="830313144074-gmlo0mjrteockpndirk9dmp60phd4ar2.apps.googleusercontent.com">
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}
