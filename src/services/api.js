import { mockCards } from "./mockData";

export const fetchCards = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(mockCards);
    }, 500);
  });
};
