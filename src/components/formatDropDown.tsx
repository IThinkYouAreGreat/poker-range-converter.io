import React, { useState } from "react";

const FormatDropdown: React.FC = () => {
  const tools = ["Piosolver", "Monker", "GTOPlus"]; // 選択肢リスト
  const [selectedTool, setSelectedTool] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTool(event.target.value);
    console.log("Selected Tool:", event.target.value);
  };

  return (
    <div>
      <label htmlFor="solver-dropdown">Select a Tool:</label>
      <select
        id="solver-dropdown"
        value={selectedTool}
        onChange={handleChange}
        style={{ marginLeft: "10px", padding: "5px" }}
      >
        <option value="" disabled>
          -- Choose a Tool --
        </option>
        {tools.map((tool) => (
          <option key={tool} value={tool}>
            {tool}
          </option>
        ))}
      </select>
      {selectedTool && <p>Currently Selected: {selectedTool}</p>}
    </div>
  );
};

export default FormatDropdown;
