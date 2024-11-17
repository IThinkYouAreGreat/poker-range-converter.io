'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import {
  convertPioToMonker, convertPioVer2ToMonker, convertPioToMonkerVer2, convertPioToGtoplus
} from "@/utils/converter";
import FormatDropdown from "@/components/formatDropDown";

const Index = () => {

  const [inputRange, setInputRange] = useState<string>("");
  const [outputRange, setOutputRange] = useState<string>("");

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputRange(event.target.value);
    };

  return (
    // <div className={styles.page}>
    <div>
      {/* <main className={styles.main}> */}
      <main>
        <div>
          <div>
          <textarea
            value={inputRange}
            onChange={handleTextareaChange}
            placeholder="PIOSolver"
            rows={5}
            cols={30}
          />
          </div>
          <button type="button" onClick={() => setOutputRange(convertPioToMonker(inputRange))}>
            Convert
          </button><FormatDropdown />
          <div>
          <textarea
            value={outputRange}
            // onChange={handleTextareaChange}
            placeholder="Output Range"
            rows={5}
            cols={30}
            readOnly
          />
          </div>
        </div>

      </main>
      <footer></footer>
    </div>
  );
}

export default Index;
