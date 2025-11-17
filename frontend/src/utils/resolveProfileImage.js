import profilePic from "../assets/image.png";

const variants = [
  "image",
  "image.png",
  "image.jpg",
  "profile",
  "profile.png",
  "profile.jpg",
  "assets/image.png",
  "assets/image.jpg",
  "/assets/image.png",
  "/assets/image.jpg",
];

const PROFILE_IMAGE_LOOKUP = variants.reduce((acc, variant) => {
  acc[variant.toLowerCase()] = profilePic;
  return acc;
}, {});

export const resolveProfileImage = (image) => {
  if (!image) {
    return profilePic;
  }

  if (typeof image === "string" && image.startsWith("http")) {
    return image;
  }

  if (typeof image !== "string") {
    return profilePic;
  }

  const normalized = image
    .replace(/^\.\/+/, "")
    .replace(/^src\//, "")
    .replace(/^\/+/, "")
    .toLowerCase();

  const fileName = normalized.split("/").pop();

  return (
    PROFILE_IMAGE_LOOKUP[normalized] ||
    (fileName ? PROFILE_IMAGE_LOOKUP[fileName] : undefined) ||
    profilePic
  );
};

