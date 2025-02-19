import { useContext } from "react";
import { AuthContext } from "../app/contexts";

export default function AuthButton() {
  const auth = useContext(AuthContext);

  return auth.user ? (<button className="full-btn-red" onClick={auth.signout}>Logout</button>) : (<button onClick={auth.signin} className="full-btn-blue">Login as admin</button>);
}
