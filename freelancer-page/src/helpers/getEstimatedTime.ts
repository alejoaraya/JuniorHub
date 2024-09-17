export const getEstimatedTime = (difficultNumber = 0): string => {
  switch (difficultNumber) {
    case 1:
      return "1 week";

    case 2:
      return "2 week";

    case 3:
      return "3 week";

    case 4:
      return "1 month";

    default:
      return "It hasn't difficult";
  }
};
