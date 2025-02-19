import { useContext, useState } from "react";
import { AuthContext } from "../app/contexts";
import {
  createNewSession,
  deleteSession,
  getMediaItems,
  getMediaBase64,
  getSession,
} from "../utils/pickerUtils";
import PhotoIcon from "./PhotoIcon";

type PickingSession = {
  pickerUri: string;
  id: string;
};

export default function ImagePickerButton({
  onSelectImage,
  selectedImage,
}: {
  onSelectImage: (imgData: string) => void,
  selectedImage?: string
}) {
  const [image, setImage] = useState(selectedImage || "");
  const [session, setSession] = useState<PickingSession | null>(null);
  const [disabled, setDisabled] = useState(false);

  const auth = useContext(AuthContext);

  const openPicker = () => {
    if (!auth.user) return;

    if (!session) {
      setDisabled(true);
      createNewSession(auth.user).then((pickingSession) => {
        setSession(pickingSession);
        window.open(pickingSession.pickerUri);

        const timeoutInMs = parseInt(pickingSession.pollingConfig.timeoutIn.slice(0, -1)) * 1000;
        const pollIntervalMs =
          parseInt(pickingSession.pollingConfig.pollInterval.slice(0, -1)) * 1000;
        const tries = Math.floor(timeoutInMs / pollIntervalMs);

        pollPicker(pickingSession.id, pollIntervalMs, tries);
      }).finally(() => setDisabled(false));
    } else {
      window.open(session.pickerUri);
    }
  };

  const closePicker = (sessionId: string) => {
    if (auth.user) deleteSession(auth.user, sessionId);
    setSession(null);
  };

  const pollPicker = (sessionId: string, interval: number, remainingTries: number) => {
    setTimeout(() => {
      console.log("Polling sesssion. Attempts left: %s", remainingTries);
      if (auth.user) {
        getSession(auth.user, sessionId).then((pickingSession) => {
          if (pickingSession.mediaItemsSet && auth.user) {
            console.log("Media items chosen");
            setDisabled(true);
            getMediaItems(auth.user, sessionId).then((response) => {
              // convert to base64 for thumbnail preview
              if (auth.user) {
                const baseUrl = response.mediaItems[0].mediaFile.baseUrl;
                getMediaBase64(baseUrl, auth.user).then((data) => {
                  const dataWithHeader = "data:image/jpeg;base64," + data;
                  onSelectImage(dataWithHeader);
                  setImage(dataWithHeader);
                });
              }
              closePicker(sessionId);
            }).finally(() => setDisabled(false));
          } else if (remainingTries > 0) {
            pollPicker(sessionId, interval, remainingTries - 1);
          } else {
            console.log("Session expired. Try again.");

            closePicker(sessionId);
          }
        });
      }
    }, interval);
  };

  return (
    <button
      className="flex flex-col p-4 justify-center items-center rounded-lg bg-light-gray cursor-pointer text-tan-dark/50 enabled:hover:opacity-70 enabled:active:bg-tan-1 enabled:active:text-tan-dark disabled:opacity-70 disabled:cursor-wait"
      onClick={openPicker}
      disabled={disabled}
    >
      {image && <img src={image} className="w-auto h-full outline-dashed outline-tan-dark/50 outline-2"/>}
      {!image && (
        <PhotoIcon style="size-16"/>
      )}
      {<p className="pt-4">{image && "Update Image" || "Pick Image"}</p>}
    </button>
  );
}
