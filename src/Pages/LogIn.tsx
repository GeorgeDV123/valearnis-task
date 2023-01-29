import { signInAnonymously } from "firebase/auth";
import { auth } from "../Componets/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Landing } from "./Landing";
import { Quiz } from "../Componets/Quiz";


export function QuizArea() {
  const [user] = useAuthState(auth);
  return <>{user ? <Quiz /> : <LogIn />}</>;
}

export function LogIn() {
  return (
    <>
      <section>
        <h1>Quiz App</h1>
        <div>
          <button>Log in with Google</button>
          <button>Log in with Phone Number</button>
          <button onClick={() => signInAnonymously(auth)}>
            Sign in as Guest
          </button>
        </div>
      </section>
    </>
  );
}
