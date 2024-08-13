export const getResource = (resourceName: string) => {
  switch (resourceName) {
    default:
      return {
        resourceName: resourceName,
        resourceProperties: resourceName,
      };
  }
};
