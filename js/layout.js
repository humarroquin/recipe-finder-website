"strict";

async function loadLayout() {
  const headerResponse = await fetch("../components/header.html");
  const headerData = await headerResponse.text();
  document.querySelector("header").innerHTML = headerData;
}

document.addEventListener("DOMContentLoaded", loadLayout);
