import { signIn, signOut, useSession } from 'next-auth/client';

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const [session] = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className={styles.signInButton}
      type="button"
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      onClick={() => signIn('github')}
      className={styles.signInButton}
      type="button"
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
