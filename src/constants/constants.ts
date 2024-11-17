import {
    placeHolderPio, placeHolderPioVer2, placeHolderGtoplus, placeHolderMonker, placeHolderMonkerVer2
} from "./placeHolders";
type RangeFormats = 'pio' | 'pioVer2' | 'monker' | 'monkerVer2' | 'gtoplus';


const placeHolderTexts = [
    placeHolderPio,
    placeHolderPioVer2,
    placeHolderGtoplus,
    placeHolderMonker,
    placeHolderMonkerVer2,
] as const;

type PlaceHolderTexts = typeof placeHolderTexts[number];

const RANGE_FORMATS = ['pio', 'pioVer2', 'monker', 'monkerVer2', 'gtoplus']

export const RANGE_FORMAT_PLACE_HOLDERS: { [key in typeof RANGE_FORMATS[number]]: PlaceHolderTexts } = {
    pio: placeHolderPio,
    pioVer2: placeHolderPioVer2,
    gtoplus: placeHolderGtoplus,
    monker: placeHolderMonker,
    monkerVer2: placeHolderMonkerVer2,
} as const;


// 55-QQ is working in pio
