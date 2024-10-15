import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>Welcome to Treetherium</div>
        <div className={styles.message}>Please sign in to view data</div>
        <button className={styles.joinButton}>Join Project</button>
      </main>
      <footer className={styles.footer}>
        <a href="#" className={styles.footerLink}>
          Home
        </a>
        <a href="#" className={styles.footerLink}>
          Stats
        </a>
        <a href="#" className={styles.footerLink}>
          Profile
        </a>
        <a href="#" className={styles.footerLink}>
          More
        </a>
      </footer>
    </div>
  );
}
