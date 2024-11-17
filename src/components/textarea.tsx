
import { useState } from "react";

export const RangeInputArea = () => {

    const [textareaValue, setTextareaValue] = useState<string>("");

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(event.target.value);
      };

      <textarea
        value={textareaValue}
        onChange={handleTextareaChange}
        placeholder="ここにテキストを入力"
        rows={5}
        cols={30}
      />


}

