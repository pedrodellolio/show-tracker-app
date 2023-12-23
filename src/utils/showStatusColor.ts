import { blue, green, grey, purple, red, yellow } from "@mui/material/colors";

export default function getShowStatusColor(status: string) {
  let color = "";
  let bgColor = "";
  switch (status) {
    case "Completed":
      color = green[700];
      bgColor = green[100];
      break;
    case "Ongoing":
      color = blue[700];
      bgColor = blue[100];
      break;
    case "Paused":
      color = yellow[700];
      bgColor = blue[100];
      break;
    case "Dropped":
      color = red[700];
      bgColor = blue[100];
      break;
    case "To Watch":
      color = purple[700];
      bgColor = purple[100];
      break;
    default:
      color = grey[700];
      bgColor = blue[100];
      break;
  }

  return { bgColor, color };
}
