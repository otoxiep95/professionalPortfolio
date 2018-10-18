"use strict";

const projectTemplate = document.querySelector("template").content;
const projectList = document.querySelector(".gallery");

function init() {
  fetchData();
}

function fetchData() {
  const url =
    "https://professionalportfolio.albertopachecommd.com/wp-json/wp/v2/galleryproject?_embed";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsondata) {
      console.log(jsondata);
      buildGallery(jsondata);
    });
}

function buildGallery(data) {
  data.forEach(project => {
    let clone = projectTemplate.cloneNode(true);
    console.log(clone.querySelector(".overlay-txt h2"));
    clone.querySelector(".overlay-txt h2").textContent = project.title.rendered;
    if (project._embedded["wp:featuredmedia"]) {
      //img is there
      clone
        .querySelector(".project-img")
        .setAttribute(
          "src",
          project._embedded["wp:featuredmedia"][0].media_details.sizes.medium
            .source_url
        );
    } else {
      // no img
      clone.querySelector("img").remove();
    }

    clone.querySelector(".project").id = project.slug;
    clone.querySelector(".project").style.backgroundColor =
      project.acf.backgroundcolor;
    clone.querySelector(".overlay").style.backgroundColor =
      project.acf.backgroundcolor;
    projectList.appendChild(clone);
  });
}
init();
