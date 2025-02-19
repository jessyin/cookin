import axios from "axios";

export function getUserProfile(accessToken: string) {
  return axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });
}

export function isAdmin(profile?: {[key: string]: unknown}) {
  return profile?.verified_email;
}
