export const darkModeActive = () => false;

export const ratingsColours = {
  grey: "#a6a6a6",
  red: "#ff1111",
  yellow: "#ffcb00",
  green: "#51dc00",
};
export const themeColours = {
  backgroundColour: darkModeActive() ? "#020202" : "#e7e7e7",
  textColour: darkModeActive() ? "#ffffff" : "#000000",
  themeColour: darkModeActive() ? "#647fd3" : "#ff8f5f",
};
