import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Ooooooooops!</h1>
      <p>something went wrong :'D</p>
    </div>
  );
}
