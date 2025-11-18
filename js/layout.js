"strict";

async function loadLayout() {
  const headerResponse = await fetch("../components/header.html");
  const headerData = await headerResponse.text();
  document.querySelector("header").innerHTML = headerData;

  const footerResponse = await fetch("../components/footer.html");
  const footerData = await footerResponse.text();
  document.querySelector("footer").innerHTML = footerData;
}

document.addEventListener("DOMContentLoaded", loadLayout);
