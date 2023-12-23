import { createContext } from "react";

const ColorModeContext = createContext({
  themeMode: "light",
  toggleColorMode: () => {},
});

export default ColorModeContext;
