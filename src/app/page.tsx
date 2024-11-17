'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { pio2monker } from "@/utils/converter";

const Index = () => {
  return (
    <div className={styles.page}>
      {/* <main className={styles.main}> */}
      <main>
        <div>
          <div>
            <textarea name="" id=""></textarea>
          </div>
          <button type="button" onClick={pio2monker}>
            Convert
          </button>
          <div>
            <textarea name="" id=""></textarea>
          </div>
        </div>

      </main>
      <footer></footer>
    </div>
  );
}

export default Index;
