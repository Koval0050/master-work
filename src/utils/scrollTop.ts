export const scrollTop = () => {
  const appElement = document.querySelector(".App");

  if (appElement) {
    appElement.scrollTo(0, 0);
  }
};
