import { useContext } from "react";
import ColorModeContext from "../contexts/ColorModeContext";

const useColorMode = () => {
  return useContext(ColorModeContext);
};

export default useColorMode;
