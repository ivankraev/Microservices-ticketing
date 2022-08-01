export const stripe = {
  charges: {
    // with mockResolvedValue we expect to return
    // a promise becouse this is what we need
    create: jest.fn().mockResolvedValue({}),
  },
};
