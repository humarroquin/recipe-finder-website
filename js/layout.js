"strict";

// load navigation, cta and footer all pages
async function loadLayout() {
  const headerResponse = await fetch("./components/header.html");
  const headerData = await headerResponse.text();
  document.querySelector("header").innerHTML = headerData;

  const footerResponse = await fetch("./components/footer.html");
  const footerData = await footerResponse.text();
  document.querySelector("footer").innerHTML = footerData;

  const ctaResponse = await fetch("./components/cta.html");
  const ctaData = await ctaResponse.text();
  const cta = document.querySelector("#cta");
  if (cta) {
    cta.innerHTML = ctaData;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadLayout();
});
