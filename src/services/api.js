import { mockCards } from "./mockData";

export const fetchCards = (page = 1, limit = 10) => {
  return new Promise((res) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;

      res({
        data: mockCards.slice(start, end),
        hasMore: end < mockCards.length,
      });
    }, 600);
  });
};
