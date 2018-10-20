"use strict";
import anime from "animejs";

const projectTemplate = document.querySelector("template").content;
const projectList = document.querySelector(".gallery");

window.addEventListener("DOMContentLoaded", init);

function init() {
  animeLogo();
  fetchData();
}

function animeLogo() {
  anime({
    targets: "#logo_container .lines path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 1500,
    direction: "alternate",
    loop: false
  });
  anime({
    targets: "#logo_container .lines .cls-1",
    fill: "#3d6bc9",
    easing: "easeInOutSine",
    duration: 1000,
    delay: 1500,
    loop: false
  });
  anime({
    targets: "#logo_container .lines .cls-2",
    fill: "#3939c6",
    easing: "easeInOutSine",
    duration: 1000,
    delay: 1500,
    loop: false
  });
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
    let projectBox = clone.querySelector(".project");
    console.log(clone.querySelector(".overlay-txt h2"));
    clone.querySelector(".overlay-txt h2").textContent = project.title.rendered;
    let dowloadingImage = new Image();
    dowloadingImage.onload = function() {
      if (project._embedded["wp:featuredmedia"]) {
        //img is there
        clone.querySelector(".project-img").setAttribute("src", this.src);
        projectList.appendChild(clone);
        // anime({
        //   targets: projectBox,

        // });
      } else {
        // no img
        clone.querySelector("img").remove();
      }
    };
    dowloadingImage.src =
      project._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.medium.source_url;

    clone.querySelector(".project").id = project.slug;
    clone.querySelector(".project").style.backgroundColor =
      project.acf.backgroundcolor;
    clone.querySelector(".overlay").style.backgroundColor =
      project.acf.backgroundcolor;
    clone.querySelector("a").href = "projectpage.html?id=" + project.id;
  });
}
