import college from "../assets/college.jpg";
import eco from "../assets/eco.jpg";
import portfolio from "../assets/portfolio.jpg";
import doctor from "../assets/doctor.jpg";

const BASE_PROJECT_IMAGES = {
  college,
  eco,
  portfolio,
  doctor,
};

const PROJECT_IMAGE_LOOKUP = Object.entries(BASE_PROJECT_IMAGES).reduce(
  (acc, [key, value]) => {
    const variants = [
      key,
      `${key}.jpg`,
      `${key}.jpeg`,
      `${key}.png`,
      `assets/${key}.jpg`,
      `assets/${key}.jpeg`,
      `assets/${key}.png`,
      `/assets/${key}.jpg`,
      `/assets/${key}.jpeg`,
      `/assets/${key}.png`,
    ];

    variants.forEach((variant) => {
      acc[variant] = value;
      acc[variant.toLowerCase()] = value;
    });

    return acc;
  },
  {}
);

export const resolveProjectImage = (image) => {
  if (!image) {
    return BASE_PROJECT_IMAGES.college;
  }

  if (typeof image === "string" && image.startsWith("http")) {
    return image;
  }

  if (typeof image !== "string") {
    return BASE_PROJECT_IMAGES.college;
  }

  const normalized = image
    .replace(/^\.\/+/, "")
    .replace(/^src\//, "")
    .replace(/^\/+/, "")
    .toLowerCase();

  const fileName = normalized.split("/").pop();

  return (
    PROJECT_IMAGE_LOOKUP[normalized] ||
    (fileName ? PROJECT_IMAGE_LOOKUP[fileName] : undefined) ||
    BASE_PROJECT_IMAGES.college
  );
};

