const getDesignTokens = (mode) => {
  const palette =
    mode === "light"
      ? {
          secondary: {
            main: "#000",
          },
        }
      : {
          secondary: {
            main: "#fff",
          },
        };

  return palette;
};

export default getDesignTokens;
