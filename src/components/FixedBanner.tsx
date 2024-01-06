import { Box, Typography, useTheme } from "@mui/material";
import TmdbLogo from "../assets/blue_short-tmdb.svg";

function FixedBanner() {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        backgroundColor: palette.background.paper,
        paddingBlock: 1,
        paddingInline: 2
      }}
    >
      <img src={TmdbLogo} width={90} alt="TMDb" />
      <Typography variant="caption" fontWeight={500} color={palette.text.secondary}>
        This application uses TMDB and the TMDB APIs but is not endorsed,
        certified, or otherwise approved by TMDB.
      </Typography>
    </Box>
  );
}

export default FixedBanner;
