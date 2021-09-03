import Image from "next/image";
import { AcitiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image width="110" height="31" src="/images/logo.svg" alt="ig.news" />

        <nav>
          <AcitiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </AcitiveLink>

          <AcitiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </AcitiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
