"use client";

import styles from "./Loader.module.css";

interface LoaderProps {
  progress: number;
  isLoaded: boolean;
}

export default function Loader({ progress, isLoaded }: LoaderProps) {
  return (
    <div className={`${styles.loader} ${isLoaded ? styles.hidden : ""}`}>
      <div className={styles.center}>
        <div className={styles.brand}>Germano&apos;s</div>
        <div className={styles.track}>
          <div className={styles.bar} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.percent}>{progress}%</div>
      </div>
    </div>
  );
}
