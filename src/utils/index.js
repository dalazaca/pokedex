export const capitalizeFirstLetter = (str) => {
  return str.replace(/^./, (firstChar) => firstChar.toUpperCase());
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
