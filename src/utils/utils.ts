const fixComboFrequencies = (pioRange: string): string => {
    const combos = pioRange.split(",");
    let result = "";

    for (const combo of combos) {
        if (combo.includes(":")) {
            const [hand, freqStr] = combo.split(":");
            const freq = parseFloat(freqStr);
            if (freq >= 1) {
                result += `${hand},`;
            } else if (freq > 0) {
                result += `${combo},`;
            }
        } else {
            result += `${combo},`;
        }
    }

    return result.slice(0, -1);
}

export const removeSpace = (input: string): string => {
    return input.replace(/\s+/g, "");
}



  export function getComboCounts(combo: string): number {
    // この関数はコンボのカウントを取得するためのロジックです。
    // 実際の実装に合わせて変更してください。
    return 1; // 仮の実装
  }

  export function formatPioRange(pioRange: string): string {
    pioRange = removeSpace(pioRange);
    const pioRangeArray = pioRange.split(',');
    const pioRangeFormat: string[] = [];
    const pio2RangeFormat: string[] = [];

    for (const combo of pioRangeArray) {
      if (combo.split(':')[0].length < 4) {
        pioRangeFormat.push(combo);
      } else {
        pio2RangeFormat.push(combo);
      }
    }

    if (pio2RangeFormat.length > 0) {
      return `${pioRangeFormat.join(',')}${pioRangeFormat.length > 0 ? ',' : ''}${convertPio2ToPio(pio2RangeFormat.join(','))}`;
    } else {
      return pioRangeFormat.join(',');
    }
  }


  export function convertPio2ToPio(pioRange: string): string {
    const pioRange2 = removeSpace(pioRange).split(",");
    const rangeDict: { [key: string]: number[] } = {};

    for (const combo of pioRange2) {
      const card1 = combo[0];
      const suit1 = combo[1];
      const card2 = combo[2];
      const suit2 = combo[3];
      let comboType = "";

      if (card1 !== card2) {
        comboType = suit1 === suit2 ? "s" : "o";
      }

      const key = card1 + card2 + comboType;
      const freq = combo.includes(":") ? parseFloat(combo.split(":")[1]) : 1;

      if (!rangeDict[key]) {
        rangeDict[key] = [];
      }
      rangeDict[key].push(freq);
    }

    return Object.entries(rangeDict)
      .map(([combo, combos]) => `${combo}:${(combos.reduce((sum, freq) => sum + freq, 0) / getComboCounts(combo)).toFixed(4)}`)
      .join(",");
  }
