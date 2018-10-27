"use strict";

let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
const title = document.querySelector("main h1");
const secondTitle = document.querySelector("main h2");
const text = document.querySelector("main p");
const projImg = document.querySelector("main img");
const projMain = document.querySelector("main");

//window.addEventListener("DOMContentLoaded", init);
function init() {
  fetch(
    "https://professionalportfolio.albertopachecommd.com/wp-json/wp/v2/galleryproject/" +
      id +
      "?_embed"
  )
    .then(e => e.json())
    .then(showSingleProject);
}

function showSingleProject(data) {
  console.log(data);
  title.textContent = data.title.rendered;
  secondTitle.textContent = data.acf.small_desc;
  console.log(data.acf.backgroundcolor);
  //   document.querySelector("body").style.backgroundColor =
  //     data.acf.backgroundColour;
  projMain.style.backgroundColor = data.acf.backgroundcolor;
  projImg.setAttribute(
    "src",
    data._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url
  );

  text.innerHTML = data.content.rendered;
}
init();
