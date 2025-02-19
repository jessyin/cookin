import axios from "axios";
import { User } from "../models";
import { Buffer } from "buffer";

const SESSION_ENDPOINT = "https://photospicker.googleapis.com/v1/sessions/";
const MEDIA_ENDPOINT = "https://photospicker.googleapis.com/v1/mediaItems";
const CLOUDINARY_ENDPOINT = "https://api.cloudinary.com/v1_1/drtml4wg7/";

const header = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export function deleteSession(user: User, sessionId: string) {
  axios
    .delete(SESSION_ENDPOINT + sessionId, header(user.accessToken))
    .then((response) => {
      console.log("deleted session id " + sessionId);
      console.log(response);
    });
}

/**
 * Create a new session to allow member to pick a photo from their google photos library.
 * Successful response will return a PickingSession: https://developers.google.com/photos/picker/reference/rest/v1/sessions#PickingSession
 * Created sessions should have a associated deleteSession().
 * @param user user that is picking a photo from their album
 */
export function createNewSession(user: User) {
  return axios
    .post(SESSION_ENDPOINT, {}, header(user.accessToken))
    .then((response) => {
      console.log("Created new session %s", response.data.toString());
      return response.data; // PickingSession
    });
}

export function getSession(user: User, sessionId: string) {
  return axios
    .get(SESSION_ENDPOINT + sessionId, header(user.accessToken))
    .then((response) => {
      console.log("Pinging session %s", response.data.toString());
      return response.data
    });
}

export function getMediaItems(user: User, sessionId: string) {
  const config = {
    params: {
      sessionId,
      pageSize: 1
    },
    ...header(user.accessToken)
  }

  return axios
    .get(MEDIA_ENDPOINT, config)
    .then((response) => {
      console.log("Retrieving media items");
      return response.data;
    });
}

/**
 * 
 * @param baseUrl Gets image data and returns base64 representation of the photo
 * @param user 
 * @returns 
 */
export function getMediaBase64(baseUrl: string, user: User) {
  return axios
    .get(baseUrl + "=w1920-h1920-d", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      responseType: "arraybuffer"
    })
    .then((response) => {
      return Buffer.from(response.data, 'binary').toString('base64');
    });
}

/**
 * Unverified upload (front-end uploading)
 * @param baseUrl 
 */
export function uploadPhoto(image: string): Promise<string> {
  return axios.post(CLOUDINARY_ENDPOINT + "auto/upload", {
    file: image,
    upload_preset: "cooking-unsigned"
  }).then((response) => {
    return response.data.secure_url;
  })
}
