export const createStars = (width, height) => {
  const stars = [];
  const starCount = Math.floor((width * height) / 1000);

  for (let i = 0; i < starCount; i++) {
    stars.push({
      size: Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    });
  }

  return stars;
};
