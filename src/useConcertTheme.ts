import { Atmosphere } from "./data";
import { lightThemes, themes } from "./theme";
import { useAppearance } from "./state/Appearance";
export function useDaytime() {
  return useAppearance().light;
}
export function useConcertTheme(atmosphere: Atmosphere = "electric") {
  return (useDaytime() ? lightThemes : themes)[atmosphere];
}
