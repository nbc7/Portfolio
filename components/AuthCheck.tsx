import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';

export default function AuthCheck(props) {
  const { user } = useContext(UserContext);
  console.log(user);

  return user ? user.email === 'nathanborgescastro@gmail.com' ? props.children : <User /> : props.fallback || <SignInButton />;
}

function User() {
  return <p>Unauthorized access</p>;
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithRedirect(googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      {/* <img src={'/google.png'} />  */}
      Sign in with Google
    </button>
  );
}

async function Register(user) {
  console.log(user);
  // Create refs for both documents
  const userDoc = firestore.doc(`users/${user.uid}`);
  // const usernameDoc = firestore.doc(`usernames/${formValue}`);

  // Commit both docs together as a batch write
  const batch = firestore.batch();
  batch.set(userDoc, {
    // username: formValue,
    photoURL: user.photoURL,
    displayName: user.displayName,
  });
  // batch.set(usernameDoc, { uid: user.uid });

  await batch.commit();
}
