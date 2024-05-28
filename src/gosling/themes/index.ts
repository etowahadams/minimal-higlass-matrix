// Individual Themes
// Based on https://github.com/gosling-lang/gosling.js/blob/58121b0d536e34c02cea9b2c046cc9efa734fe94/src/core/utils/theme.ts#L5
import { light } from './light';

export const Themes = {
    light,
};

export function isThereTheme(key: string) {
    return Object.keys(Themes).indexOf(key) !== -1;
}

export function getTheme(key: string) {
    return isThereTheme(key) ? (Themes as any)[key] : Themes['light'];
}
