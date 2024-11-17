import { Combo, ParsedRange } from './../types/types';
import { formatPioRange, removeSpace } from './utils';


export const convertPioToMonker = (pioRange: string): string => {

    pioRange = formatPioRange(removeSpace(pioRange));
    const combos = pioRange.split(",").map(combo => combo.split(":"));
    console.log(1, combos)
    // return "AK:08"

    for (const combo of combos) {
        if (combo.length === 1) {
            combo.push("1");
        }
    }

    const parsedRange: ParsedRange = [];

    for (const combo of combos) {
        if (combo[0].endsWith("s") || combo[0].endsWith("o") || new Set(combo[0]).size === 1) {
            parsedRange.push([combo[0], parseFloat(combo[1])]);
        } else {
            parsedRange.push([`${combo[0]}s`, parseFloat(combo[1])]);
            parsedRange.push([`${combo[0]}o`, parseFloat(combo[1])]);
        }
    }
    console.log(2, parsedRange)

    const resultCombos = parsedRange
        .filter(([combo]) => COMBOS.includes(combo))
        .map(([combo, freq]) => {
            const c1 = combo[0];
            const c2 = combo[1];
            const frequency = Math.round(freq * 100);
            if (new Set(combo).size === 1) {
                // Pocket pairs
                return `${c1}s${c2}c@${frequency},${c1}s${c2}d@${frequency},${c1}s${c2}h@${frequency},${c1}c${c2}d@${frequency},${c1}c${c2}h@${frequency},${c1}d${c2}h@${frequency}`;
            } else if (combo.endsWith("s")) {
                // Suited
                return `${c1}s${c2}s@${frequency},${c1}c${c2}c@${frequency},${c1}d${c2}d@${frequency},${c1}h${c2}h@${frequency}`;
            } else {
                // Offsuited
                return `${c1}c${c2}d@${frequency},${c1}c${c2}h@${frequency},${c1}c${c2}s@${frequency},${c1}d${c2}c@${frequency},${c1}d${c2}h@${frequency},${c1}d${c2}s@${frequency},${c1}h${c2}c@${frequency},${c1}h${c2}d@${frequency},${c1}h${c2}s@${frequency},${c1}s${c2}c@${frequency},${c1}s${c2}d@${frequency},${c1}s${c2}h@${frequency}`;
            }
        });

        console.log(3, resultCombos)

    return resultCombos.join(",");
}

export const convertPioVer2ToMonker = (pio2Range: string): string => {
    const combos = removeSpace(pio2Range).split(",");
    if (!combos.every(combo => combo.split(":")[0].length === 4)) {
        return "";
    }

    const monkerRange = combos
        .map(combo => {
            const [hand, freqStr] = combo.split(":");
            const freq = freqStr ? parseFloat(freqStr) * 100 : 100;
            return freq ? `${hand}@${freq}` : "";
        })
        .filter(Boolean);

    return monkerRange.join(",");
}

const convertMonkerToPio = (monkerRange: string): string => {
    const combos = monkerRange.split(",").map(combo => combo.split("@"));
    return combos.map(([hand, freq]) => `${hand}:${parseFloat(freq) / 100}`).join(",");
}

export const convertPioToMonkerVer2 = (pioRange: string): string => {
    pioRange = formatPioRange(pioRange);
    const combos = pioRange.split(",");

    return combos
        .map(combo => {
            if (combo.includes(":")) {
                const [hand, freq] = combo.split(":");
                return `${hand}\n${freq};\n`;
            } else {
                return `${combo}\n1.0;\n`;
            }
        })
        .join("");
}

type RangeDict = { [key: string]: string[] };

export const convertPioToGtoplus = (pioRange: string): string => {
    const combos = pioRange.split(",");
    const rangeDict: RangeDict = {};

    for (const combo of combos) {
        if (combo.includes(":")) {
            const [hand, freq] = combo.split(":");
            if (!rangeDict[freq]) {
                rangeDict[freq] = [];
            }
            rangeDict[freq].push(hand);
        } else {
            if (!rangeDict["1"]) {
                rangeDict["1"] = [];
            }
            rangeDict["1"].push(combo);
        }
    }

    let gtoPlusRange = "";

    for (const [freq, hands] of Object.entries(rangeDict)) {
        if (parseFloat(freq) !== 1) {
            const adjustedFreq = Math.round(parseFloat(freq) * 100);
            gtoPlusRange += `[${adjustedFreq}]${hands.join(",")}[/${adjustedFreq}],`;
        } else {
            gtoPlusRange += hands.join(",");
        }
    }

    const hasFreqCombo = gtoPlusRange.includes("[");
    return hasFreqCombo ? gtoPlusRange.slice(0, -1) : gtoPlusRange;
}

export const convertGtoPlusToPio = (gtoPlusRange: string): string => {
    const cleanRange = removeSpace(gtoPlusRange);
    const pattern = /\[(.*?)\](.*?)\[\/\1\]/g;

    let pioRange = "";
    const rangeDict: RangeDict = {};

    // Remove [freq] combos and handle 100% frequency combos
    const combos100pFreq = cleanRange.replace(pattern, "").split(",");
    for (const combo of combos100pFreq) {
        if (combo) {
            pioRange += `${combo},`;
        }
    }

    // Extract combos with specific frequencies
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(cleanRange)) !== null) {
        const [_, freq, combos] = match;
        if (!rangeDict[freq]) {
            rangeDict[freq] = [];
        }
        rangeDict[freq].push(combos);
    }

    for (const [freq, combos] of Object.entries(rangeDict)) {
        const adjustedFreq = parseFloat(freq) / 100;
        for (const combo of combos) {
            if (combo.includes(",")) {
                pioRange += combo.replace(/,/g, `:${adjustedFreq},`) + `:${adjustedFreq},`;
            } else {
                pioRange += `${combo}:${adjustedFreq},`;
            }
        }
    }

    return pioRange.slice(0, -1);
}

export const convertMonkerToGtoPlus = (monkerRange: string): string => {
    const pioRange = convertMonkerToPio(monkerRange);
    return convertPioToGtoplus(pioRange);
}

// Utility functions

// Mock function for demonstration



// Utility functions}

// Mock constants for demonstration
const COMBOS = ["AA", "KK", "QQ", "AKs", "AKo", "22"]; // Add all valid combos here
