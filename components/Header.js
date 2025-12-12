import styles from "../styles/Header.module.css";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
        <Link href="/">
        <img
            src="/logov1.svg"
            alt="Personal Calendar Logo"
            className={styles.logo}
        />
      </Link>
        </header>
    );
}