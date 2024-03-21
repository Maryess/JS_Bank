const SITE_NAME = "RED Bank";

export const getTitle = (title) => {
  return title ? `${title} | ${SITE_NAME}	` : SITE_NAME;
};
