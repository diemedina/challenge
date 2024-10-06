const getTopCategory = (categories: string[]): string => {
  if (!categories.length) return '';
  if (categories.length === 1) return categories[0];

  let count: {[key: string]: number} = {};

  categories.forEach((category: string) => {
    if (count[category]) {
      count[category]++;
    } else {
      count[category] = 1;
    }
  });

  const top = Object.keys(count).sort((a, b) => count[b] - count[a]);

  return top[0];
}

export { getTopCategory };