import { grey } from "@mui/material/colors";

export const navbarContainer = {
  gridColumn: { xs: 1, md: "1 / span 2" },
  backgroundColor: grey[50]
};

export const navbarWrapperStyles = {
  justifyContent: { xs: "center", md: "space-between" },
  paddingY: "10px",
  paddingX: { xs: 2, md: "40px" },
};

export const searchBarWrapperStyles = {
  display: "flex",
  gap: "20px",
  flexDirection: "row",
};

export const iconStyles = {
  width: "48px",
  height: "48px",
  color: "black",
};
