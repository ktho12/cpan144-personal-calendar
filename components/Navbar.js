import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/">home</Link>
                </li>
                <li>
                    <Link href="/calendar">calendar</Link>
                </li>
                <li>
                    <Link href="/weather">weather</Link>
                </li>
            </ul>
        </nav>
    );
}