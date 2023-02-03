import { signInAnonymously } from "firebase/auth";
import { auth } from "../Componets/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Landing } from "./Landing";
import { Quiz } from "../Componets/Quiz";
import { googleSignIn, githubSignIn } from "../Componets/Firebase";

export function QuizArea() {
  const [user] = useAuthState(auth);
  return (
    //Show Login or Quiz, depending on Auth state
    <>
      <main className="quiz-login-area">{user ? <Quiz /> : <LogIn />}</main>
    </>
  );
}

//Login section
function LogIn() {
  const [user] = useAuthState(auth);
  return (
    <>
      <section className="login-area">
        <div>
          <h2>Please log in to continue</h2>
          <button className="button1" onClick={googleSignIn}>Log in with Google</button>
          <button className="button3" onClick={githubSignIn}>Log in with Github</button>
          <button className="button2" onClick={() => signInAnonymously(auth)}>
            Log in as Guest
          </button>
          <button
            onClick={() => (window.location.href = "/")}
          >
            ← Go back
          </button>
        </div>
        <img src="/imgs/min.png"></img>
      </section>
    </>
  );
}
