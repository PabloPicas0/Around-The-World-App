export const conatinerStyles = {
  position: "relative",
  overflowY: { xs: "visible", md: "auto" },
  transition: "transform 250ms ease-in-out",
  width: { xs: "auto", md: "500px" },
  zIndex: 1337,
  transform: { xs: "none", md: "translateX(500px)" },
};

export const buttonWrapperStyles = {
  display: "flex",
  justifyContent: { xs: "space-between", md: "end" },
};

export const buttonStyles = {
  width: "38px",
  height: "38px",
};

export const titleStyles = {
  textAlign: "center",
};

export const progressStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: { xs: "none", md: "inline-block" },
};
