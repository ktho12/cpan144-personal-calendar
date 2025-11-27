import React from "react";
import MainContent from "../components/MainContent";
import styles from "../styles/Home.module.css";


export default function Home() {
  return (
    <main className={styles.homeMain}>
      <div className={styles.formWrapper}>
      <MainContent />
      </div>
    </main>
  )
}
