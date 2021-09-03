import NextLink from "next/link";
import Image from "next/image";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image width="110" height="31" src="/images/logo.svg" alt="ig.news" />

        <nav>
          <NextLink href="/">
            <a className={styles.active} href="#">
              Home
            </a>
          </NextLink>

          <NextLink href="/posts">
            <a href="#">Posts</a>
          </NextLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
