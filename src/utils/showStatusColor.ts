import { blue, green, grey, purple, red, yellow } from "@mui/material/colors";

export default function getShowStatusColor(status: string, themeMode: string) {
  let color = "";
  let bgColor = "";
  switch (status) {
    case "Completed":
      color = themeMode == "light" ? green[900] : green[400];
      bgColor = themeMode == "light" ? green[100] : "rgba(76,175,80,0.2)";
      break;
    case "Ongoing":
      color = themeMode == "light" ? blue[900] : blue[400];
      bgColor = themeMode == "light" ? blue[100] : "rgba(33,150,243,0.2)";
      break;
    case "Paused":
      color = themeMode == "light" ? yellow[900] : yellow[400];
      bgColor = themeMode == "light" ? yellow[100] : "rgba(255,235,59,0.2)";
      break;
    case "Dropped":
      color = themeMode == "light" ? red[900] : red[400];
      bgColor = themeMode == "light" ? red[100] : "rgba(244,67,54,0.2)";
      break;
    case "To Watch":
      color = themeMode == "light" ? purple[900] : purple[400];
      bgColor = themeMode == "light" ? purple[100] : "rgba(156,39,176,0.2)";
      break;
    default:
      color = themeMode == "light" ? grey[900] : grey[400];
      bgColor = themeMode == "light" ? grey[100] : "rgba(158,158,158,0.2)";
      break;
  }

  return { bgColor, color };
}
