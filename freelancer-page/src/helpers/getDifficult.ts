export const getDifficult = (difficultNumber = 0): string => {
  switch (difficultNumber) {
    case 1:
      return "Easy";

    case 2:
      return "Medium";

    case 4:
      return "Hard";

    case 3:
      return "Very hard";

    default:
      return "It hasn't difficult";
  }
};
